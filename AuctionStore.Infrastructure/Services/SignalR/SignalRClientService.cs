using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.Enums;
using Microsoft.AspNetCore.SignalR.Client;

namespace AuctionStore.Infrastructure.Services.SignalR
{
    public class SignalRClientService : ISignalRClientService
    {
        private SignalRConnectionState connectionState;

        private HubConnection hubConnection;

        public SignalRConnectionState ConnectionState
        {
            get => connectionState;
            private set
            {
                if (value == connectionState)
                    return;

                this.connectionState = value;

                OnConnectionStateChange?.Invoke(value);
            }
        }

        public Dictionary<string, string> Headers { get; set; }

        public string ConnectionUrl { get; set; }

        public string HubName { get; set; }

        public HubConnection Connection => this.hubConnection;

        public TimeSpan Timeout { get; set; }

        public SignalRClientService()
        {
            this.Headers = new Dictionary<string, string>();
        }

        public event OnStateChange OnConnect;

        public event OnDisconnectedStateChange OnDisconected;

        public event onConnectionStateChange OnConnectionStateChange;

        public BindHUBMethods BindHUBCallbacks { get; set; }


        public delegate void onConnectionStateChange(SignalRConnectionState state);

        public delegate void OnStateChange();

        public delegate void OnDisconnectedStateChange(Exception ex);

        public delegate void BindHUBMethods(HubConnection hubConnection);


        private void BuildHUBConnection()
        {
            if (this.hubConnection != null && this.hubConnection.State == HubConnectionState.Connected) return;

            this.DisposeHubConnection();

            var connectionBuilder = new HubConnectionBuilder();
            var connectionString = $"{this.ConnectionUrl}/{this.HubName}";

            if (this.Headers.Count > 0)
            {
                connectionBuilder.WithUrl(connectionString, conn =>
                {
                    foreach (var header in this.Headers)
                    {
                        conn.Headers.Add(header);
                    }

                    conn.CloseTimeout = this.Timeout;

                });
            }

            else
            {
                connectionBuilder.WithUrl(connectionString);
            }

        }

        private void BindHUBEvents()
        {
            this.hubConnection.Closed += HubConnection_Closed;
            this.hubConnection.Reconnected += HubConnection_Reconnected;
            this.hubConnection.Reconnecting += HubConnection_Reconnecting;
        }

        private void UnbindHUBEvents()
        {
            this.hubConnection.Closed -= HubConnection_Closed;
            this.hubConnection.Reconnected -= HubConnection_Reconnected;
            this.hubConnection.Reconnecting -= HubConnection_Reconnecting;
        }

        private Task HubConnection_Reconnecting(Exception arg)
        {
            this.ConnectionState = SignalRConnectionState.Reconnecting;
            return Task.CompletedTask;
        }

        private Task HubConnection_Reconnected(string arg)
        {
            this.ConnectionState = SignalRConnectionState.Reconnected;
            return Task.CompletedTask;
        }

        private Task HubConnection_Closed(Exception arg)
        {
            this.ConnectionState = SignalRConnectionState.Disconnected;
            return Task.CompletedTask;
        }

        public async Task StartAsync()
        {
            this.ValidateConfiguration();
            this.BuildHUBConnection();
            this.BindHUBEvents();

            await this.hubConnection.StartAsync();
            this.ConnectionState = SignalRConnectionState.Connected;
            this.OnConnect?.Invoke();
        }

        public async Task StopAsync()
        {
            if (hubConnection == null && this.hubConnection.State == HubConnectionState.Disconnected) return;

            await this.hubConnection.StopAsync();
            this.DisposeHubConnection();
        }

        public async Task<TResult> InvokeAsync<TResult>(string methodName, object[] args, CancellationToken ct = default)
        {
            if (this.hubConnection == null)
            {
                throw new SignalRClientException("Connection is not established");
            }
            return await this.hubConnection.InvokeAsync<TResult>(methodName, args, ct);
        }

        private void ValidateConfiguration()
        {
            this.CheckConnection();
            if (!ValidateUrlAdress(this.ConnectionUrl))
            {
                throw new SignalRClientException("The URL Adress in invalid");
            }

            if (string.IsNullOrEmpty(this.HubName))
            {
                throw new SignalRClientException($"The property {nameof(this.HubName)} cannot be empty");
            }
        }

        private void CheckConnection()
        {
            if (this.hubConnection == null) return;

            switch (this.ConnectionState)
            {
                case SignalRConnectionState.Connected:
                    throw new SignalRClientException("Already connected to the hub");
                case SignalRConnectionState.Connecting:
                    throw new SignalRClientException("Connecting to the hub is in progress.");
                case SignalRConnectionState.Reconnecting:
                    throw new SignalRClientException("Trying to reconnect.");
            }
        }

        private bool ValidateUrlAdress(string urlAddress) =>
            Uri.TryCreate(urlAddress, UriKind.Absolute, out var uriResult)
            && uriResult.Scheme == Uri.UriSchemeHttps;

        private void DisposeHubConnection()
        {
            if (this.hubConnection == null) return;

            this.UnbindHUBEvents();

            try
            {
                this.hubConnection.StopAsync().GetAwaiter();
            }
            catch (Exception)
            {

            }

            this.hubConnection = null;
        }
    }
}
