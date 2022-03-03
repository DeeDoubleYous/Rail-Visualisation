using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;

using System.Configuration;
using System.Net;

namespace RailVisualisation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoutingController : ControllerBase
    {
        HttpClient client;

        public RoutingController(HttpClient client)
        {
            this.client = client;
        }

        [HttpGet]
        public async Task<string> Get(string origin, string destination, Int64 depature_time)
        {
            var key = System.Configuration.ConfigurationManager.AppSettings["apiKey"];

            string directionsURL = $"{System.Configuration.ConfigurationManager.ConnectionStrings["directionsAPI"].ConnectionString}?key={key}&origin={origin}&destination={destination}&depature_time={depature_time}&mode=transit";

            try
            {
                using(var stream = await client.GetStreamAsync(directionsURL))
                {
                    using(var reader = new StreamReader(stream))
                    {
                        return reader.ReadToEnd();
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Data);
                return e.ToString();
            }
        }
    }
}
