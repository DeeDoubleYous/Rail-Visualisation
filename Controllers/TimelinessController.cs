using Microsoft.AspNetCore.Mvc;

using System.Net;
using System.Net.Http.Headers;
using ParkSquare.RealTimeTrains;


using RailVisualisation.Models.Timeliness;


namespace RailVisualisation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TimelinessController : ControllerBase
    {
        readonly HttpClient client;
        readonly IRealTimeTrainsClient rttClient;

        readonly string railUri;
        readonly string railUser;
        readonly string railPass;

        public TimelinessController(HttpClient client, IRealTimeTrainsClient rttClient)
        {
            this.client = client;
            this.rttClient = rttClient;

            this.railUri = $"{System.Configuration.ConfigurationManager.ConnectionStrings["nationalRail"]}";
            this.railUser = $"{System.Configuration.ConfigurationManager.AppSettings["railUser"]}";
            this.railPass = $"{System.Configuration.ConfigurationManager.AppSettings["railPass"]}";
        }


        [HttpGet]
        public async Task<int> Get(string start, string end, DateTime travelTime)
        {
            try
            {
                var lookUp = new TimelinessModel(client, rttClient);
                var lateness = await lookUp.GetServiceLateness(start, end, travelTime);

                return lateness;

            }catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return -1;
        }
    }
}