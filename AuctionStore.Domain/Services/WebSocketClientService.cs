using AuctionStore.Domain.Repositories;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Exceptions;
using AuctionStore.Infrastructure.Services.Auth;
using AuctionStore.Infrastructure.Services.SignalR;
using AuctionStore.Infrastructure.SignalRModels;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Threading.Tasks;
using System.Timers;

namespace AuctionStore.Domain.Services
{
    public class WebSocketClientService : IWebSocketClientService
    {
        private class SignalROptions
        {
            public string HUBUrlAddress { get; set; }
            public string HubName { get; set; }
            public int Timeout { get; set; }
            public uint ReconnectAfterSec { get; set; }
        }
        private readonly ISignalRClientService signalRClient;

        private readonly IConfiguration configuration;

        private readonly ILogger logger;

        private readonly IAuthService authService;

        private readonly ISignalRMessageRepository messageQueue;

        private Timer reconnectTimer;

        public uint TryReconnectAfterSecond { get; private set; }

        private bool reconnecting;
        private const string UserName = "AuctionStoreApi";

        public WebSocketClientService(ISignalRClientService signalRClient,
            IConfiguration configuration, ILogger logger,
            IAuthService authService, ISignalRMessageRepository messageQueue,
            Timer reconnectTimer, uint tryReconnectAfterSecond)
        {
            this.signalRClient = signalRClient;
            this.configuration = configuration;
            this.logger = logger;
            this.authService = authService;
            this.messageQueue = messageQueue;
            this.reconnectTimer = reconnectTimer;
            TryReconnectAfterSecond = tryReconnectAfterSecond;
        }

        public async Task StartConnection()
        {
            try
            {
                this.Initialize();
                await this.signalRClient.StartAsync();
            }
            catch (SignalRClientException ex)
            {
                this.logger.LogError(ex.Message);
            }
            catch (Exception ex)
            {
                if (ex.InnerException is SocketException socketEx)
                {
                    this.SocketExceptionHandler(socketEx);
                }

                this.logger.LogTrace("Error trying connect to socket", ex);
            }
        }

        public async Task StopConnection()
        {
            try
            {
                this.signalRClient.OnConnectionStateChange -= OnConnectionStateChange;
                this.signalRClient.OnDisconected -= OnDisconected;
                this.signalRClient.OnConnect -= OnConnected;
                await this.signalRClient.StopAsync();
            }
            catch (Exception ex)
            {
                this.logger.LogTrace($"Error occured while stopping connection with singalr hub. exMessag: {ex.Message}");
            }
        }

        private void SocketExceptionHandler(SocketException ex)
        {
            switch (ex.ErrorCode)
            {
                case (int)SocketError.ConnectionRefused:
                case (int)SocketError.NotConnected:
                    this.logger.LogTrace($"Error connecting to the hub. The SingalR server is down. {ex.Message}");
                    this.StartReconnect();
                    break;
                case (int)SocketError.NetworkUnreachable:
                    this.logger.LogTrace($"internet connection error. exMessage: {ex.Message}");
                    this.StartReconnect();
                    break;
                case (int)SocketError.HostUnreachable:
                case (int)SocketError.HostNotFound:
                    this.logger.LogTrace($"The hostname is invalid. exMessage: {ex.Message}");
                    this.StartReconnect();
                    break;
                case (int)SocketError.ConnectionAborted:
                    this.logger.LogCritical($"Signalr client configuration error The connection was aborted");
                    return;
            }
        }

        private async Task<ResultModel> SendMessage(MessageModel model, System.Threading.CancellationToken ct)
        {
            try
            {
                this.logger.LogDebug($"Send notyfication to {model.To}");
                var result = await this.signalRClient.InvokeAsync<ResultModel>(nameof(SendMessage), new object[] { model }, ct);
                this.logger.LogDebug($"Notification has been sent. Response data", result);
                this.messageQueue.DeleteMessage();

                return result;
            }
            catch (Exception ex)
            {
                this.logger.LogTrace($"Error sending notification {ex.Message}");
                return null;
            }
        }
        private void Initialize()
        {
            this.LoadConfiguration();

            if (!this.reconnecting)
                this.InitializeReconnectTimer();

            this.signalRClient.OnConnectionStateChange += OnConnectionStateChange;
            this.signalRClient.OnDisconected += OnDisconected;
            this.signalRClient.OnConnect += OnConnected;

            var jwtToken = this.GetJwtToken();

            if (jwtToken == null)
            {
                throw new DomainException((int)DictErrorCodes.ErrorWhileCreatingJWTToken, DictErrorCodes.ErrorWhileCreatingJWTToken.GetDescription());
            }
            this.signalRClient.Headers.Clear();
            this.signalRClient.Headers.Add("Authorization", jwtToken);
        }

        private void LoadConfiguration()
        {
            var signalROptions = new SignalROptions();
            this.configuration.GetSection("SignalRClient").Bind(signalROptions);

            if (signalROptions == null)
                throw new SignalRClientException("Error Load main configuration");

            if (string.IsNullOrEmpty(signalROptions.HUBUrlAddress))
                throw new SignalRClientException("Missing HUBUrlAddress field in the SignalRClient section.");

            if (string.IsNullOrEmpty(signalROptions.HubName))
                throw new SignalRClientException("Missing HubName field in the SignalRClient section.");

            this.signalRClient.ConnectionUrl = signalROptions.HUBUrlAddress;
            this.signalRClient.HubName = signalROptions.HubName;
            if (signalROptions.Timeout > 0)
                this.signalRClient.Timeout = new TimeSpan(signalROptions.Timeout);

            if (signalROptions.ReconnectAfterSec > 0)
                this.TryReconnectAfterSecond = signalROptions.ReconnectAfterSec;
        }

        private void InitializeReconnectTimer()
        {
            this.reconnectTimer = new Timer()
            {
                Enabled = false,
                AutoReset = false,
                Interval = this.TryReconnectAfterSecond * 1000
            };
            this.reconnectTimer.Elapsed += ReconnectTimer_Elapsed;
        }

        private void OnConnected()
        {
            if (this.messageQueue.NumberOfMessages() == 0)
                return;

            for (int i = 0; i < this.messageQueue.NumberOfMessages(); i++)
            {
                var message = this.messageQueue.GetMessage();
                this.SendMessage(message, System.Threading.CancellationToken.None).Wait();
            }
        }

        private void OnDisconected(Exception ex)
        {
            this.logger.LogTrace($"Disconnected from the signalr hub. exMessage: {ex?.Message}");
            this.StartReconnect();
        }

        private void OnConnectionStateChange(SignalRConnectionState state)
        {
            this.logger.LogInformation($"SignalR Connection state changed to {state}");
        }

        private string GetJwtToken()
        {
            var roles = new List<string>() { "Admin", "User" };
            var userId = Guid.NewGuid().ToString();
            var token = this.authService.GenerateUserToken(userId, UserName, UserName, roles, null);

            if (token != null)
            {
                this.logger.LogDebug("Authorization token created.", new
                {
                    CloudAPIRoles = roles,
                    UserName,
                    userId,
                    AuthToken = token.AccessToken
                });
                return token.AccessToken;
            }

            return null;
        }

        private void ReconnectTimer_Elapsed(object sender, ElapsedEventArgs e)
        {
            this.logger.LogInformation("ReconnectTimer_Invoke");
            switch (this.signalRClient.ConnectionState)
            {
                case SignalRConnectionState.Connected:
                case SignalRConnectionState.Connecting:
                case SignalRConnectionState.Reconnecting:
                    return;
            }

            this.StopConnection().Wait();
            this.StartConnection().Wait();
            this.reconnecting = false;

            this.logger.LogInformation("ReconnectingTimer finished");
        }

        private void StartReconnect()
        {
            this.reconnectTimer.Enabled = true;
            this.reconnecting = true;
        }

        //@TODO
        private class ResultModel
        {

        }
    }
}
