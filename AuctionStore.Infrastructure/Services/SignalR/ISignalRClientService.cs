using AuctionStore.Infrastructure.Enums;
using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services.SignalR
{
    public interface ISignalRClientService
    {
        SignalRClientService.BindHUBMethods BindHUBCallbacks { get; set; }
        HubConnection Connection { get; }
        SignalRConnectionState ConnectionState { get; }
        string ConnectionUrl { get; set; }
        Dictionary<string, string> Headers { get; set; }
        string HubName { get; set; }
        TimeSpan Timeout { get; set; }

        event SignalRClientService.OnStateChange OnConnect;
        event SignalRClientService.onConnectionStateChange OnConnectionStateChange;
        event SignalRClientService.OnDisconnectedStateChange OnDisconected;

        Task<TResult> InvokeAsync<TResult>(string methodName, object[] args, CancellationToken ct = default);
        Task StartAsync();
        Task StopAsync();
    }
}