using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace AuctionStore.Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly HttpClient httpClient;
        private readonly Dotpay dotpayInfo;

        public PaymentService(HttpClient httpClient, IOptions<Dotpay> dotpayData)
        {
            this.httpClient = httpClient;
            this.dotpayInfo = dotpayData.Value;
        }

        public async Task<string> Pay(DotpayRequest request)
        {
            request.Url = dotpayInfo.Url; // url do statusow 
            request.Urlc = dotpayInfo.Urlc; // url powrotne 

            var serializeContent = JsonConvert.SerializeObject(request);
            var Content = new StringContent(serializeContent);
            Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await httpClient.PostAsync("", Content);

            var responseBody = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            DotPayResponse dotpayResponse = JsonConvert.DeserializeObject<DotPayResponse>(responseBody);

            string chk = GenerateChk(dotpayResponse.Token);
            string paymentUrl = $"{dotpayResponse.Payment_url}&chk={chk}";


            return paymentUrl;
        }
        //wyliczanie sumy kontrolnej
        private string GenerateChk(string Token)
        {
            string result = $"{dotpayInfo.Pin}{Token}";
            using (SHA256 hasher = SHA256.Create())
            {
                byte[] arr = hasher.ComputeHash(Encoding.UTF8.GetBytes(result));
                var builder = new StringBuilder();
                for (int i = 0; i < arr.Length; i++)
                {
                    builder.Append(arr[i].ToString("x2"));

                }

                return builder.ToString();
            }
        }

    }
}
