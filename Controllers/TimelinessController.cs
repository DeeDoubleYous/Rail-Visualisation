using Microsoft.AspNetCore.Mvc;

using System.Net;
using System.Net.Http.Headers;

using RailVisualisation.Models.Timeliness;

namespace RailVisualisation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TimelinessController : ControllerBase
    {
        HttpClient client;

        string railUri;

        public TimelinessController(HttpClient client)
        {
            this.client = client;

            this.railUri = $"{System.Configuration.ConfigurationManager.ConnectionStrings["nationalRail"]}";   
        }


        [HttpGet]
        public async Task Get()
        {
            var handler = new TokenHandling(client, this.railUri);

            var token = await handler.GetToken();


        }
        

    }
}