using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Configuration;
using System.Net;

namespace RailVisualisation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoutingController : ControllerBase
    {
        HttpClient client;

        public RoutingController()
        {
            this.client = new HttpClient();
        }

        [HttpGet]
        public async Task<string> Get(string origin, string destination)
        {

            string data = "";

            var key = System.Configuration.ConfigurationManager.AppSettings["apiKey"];

            string directionsURL = $"{System.Configuration.ConfigurationManager.ConnectionStrings["directionsAPI"].ConnectionString}?key={key}&origin={origin}&destination={destination}&mode=transit&transit_mode=train";

            try
            {
                using(var stream = await client.GetStreamAsync(directionsURL))
                {
                    using(var reader = new StreamReader(stream))
                    {
                        data = reader.ReadToEnd();
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Data);
                return e.ToString();
            }
            return data;
        }
    }
}
