using AuctionStore.Infrastructure.Services.Payment;
using AuctionStore.Infrastructure.Services.Payment.DotpayDtos;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RestSharp;
using RestSharp.Authenticators;
using System;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private DotpayOptions dotpayOptions;
        private DotpayAuthOptions dotpayAuthOptions;
        private RestClient restClient;

        public PaymentService(IOptions<DotpayOptions> dotpayOptions, IOptions<DotpayAuthOptions> authOptions)
        {
            this.dotpayOptions = dotpayOptions.Value;
            this.dotpayAuthOptions = authOptions.Value;

            this.restClient = new RestClient(new Uri($"https://ssl.dotpay.pl/test_seller/api/v1/accounts/{this.dotpayOptions.Id}/payment_links/"));
        }

        public async Task<string> GeneratePaymentLink(DotpayRequest request, CancellationToken cancellationToken)
        {
            request.Url = dotpayOptions.Url;
            request.Urlc = dotpayOptions.Urlc;

            restClient.Authenticator = new HttpBasicAuthenticator(dotpayAuthOptions.Username, dotpayAuthOptions.Password);

            var restRequest = new RestRequest("", Method.POST);
            var body = JsonConvert.SerializeObject(request);
            restRequest.AddParameter("application/json; charset=utf-8", body, ParameterType.RequestBody);

            try
            {
                var response = await restClient.ExecuteAsync(restRequest, cancellationToken);

                if(response.StatusCode != HttpStatusCode.OK && response.StatusCode != HttpStatusCode.Created )
                {
                    return "";
                }
                var dotpayResponse = JsonConvert.DeserializeObject<DotpayResponse>(response.Content);

                string chk = GenerateChk(dotpayResponse.Token);
                string paymentUrl = $"{dotpayResponse.Payment_url}&chk={chk}";


                return paymentUrl;

            }
            catch (Exception)
            {

                throw;
            }
        }

        private string GenerateChk(string Token)
        {
            string result = $"{dotpayOptions.Pin}{Token}";
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
