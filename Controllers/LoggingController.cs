using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

using RailVisualisation.Models.Logging;

namespace RailVisualisation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoggingController : ControllerBase
    {
        HttpClient client;

        private string? statsUrl;

        private string? statsKey;

        public LoggingController(HttpClient client)
        {
            this.client = client;

            var statsKey = System.Configuration.ConfigurationManager.AppSettings["statKey"];
            var statsUrl = System.Configuration.ConfigurationManager.ConnectionStrings["loggingAPI"].ConnectionString;
            if (statsKey != null && statsUrl != null)
            {
                this.statsKey = statsKey;
                this.statsUrl = statsUrl;
            }
        }

        /***
         * Method for talking to the provided stats server to create a log of a layer being added.
         */
        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] LoggingCreateRequest values)
        {
            try
            {
                if(this.statsKey != null)
                {
                    LoggingOutputRequest log = new LoggingOutputRequest(values.LayerId, values.TimeStamp, statsKey);

                    using( var awaiter =  await this.client.PostAsJsonAsync<LoggingOutputRequest>(statsUrl, log))
                    {
                        return awaiter;
                    }
                } 
                
            } catch(Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            var message = new HttpResponseMessage();
            message.StatusCode = HttpStatusCode.InternalServerError;
            return message;
        }

        /***
         * Get the full break down for the overview of the 
         */
        [HttpGet]
        public async Task<string> GetLayerTotals()
        {
            try
            {
                using (var stream = await client.GetStreamAsync($"{statsUrl}?key={statsKey}"))
                {
                    using (var results = new StreamReader(stream))
                    {
                        return results.ReadToEnd();
                    }
                }
            }catch(Exception e)
            {
                Console.WriteLine(e);
            }

            return "Internal server error";
        }

        [HttpGet]
        [Route("total")]
        public async Task<string> GetTotal()
        {
            try
            {
                using(var stream = await client.GetStreamAsync($"{statsUrl}/total?key={statsKey}"))
                {
                    using(var results = new StreamReader(stream))
                    {
                        return results.ReadToEnd();
                    }
                }
            }catch(Exception e)
            {
                Console.WriteLine(e);
            }

            return "Internal Server Error";
        }
    }
}