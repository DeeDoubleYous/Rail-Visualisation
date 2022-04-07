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

        public TimelinessController(HttpClient client, IRealTimeTrainsClient rttClient)
        {
            this.client = client;
            this.rttClient = rttClient;
        }


        [HttpGet]
        public async Task<int> Get(string start, string startPostcode, string end, string endPostcode, DateTime travelTime)
        {
            try
            { 

                var lookUp = new TimelinessModel(client, rttClient);
                var lateness = await lookUp.GetServiceLateness(start, startPostcode, end, endPostcode, travelTime);

                return lateness;

            }catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return -1;
        }
    }
}