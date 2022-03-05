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

        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] LoggingCreateRequest values)
        {
            try
            {
                if(this.statsKey != null)
                {
                    LoggingOutputRequest log = new LoggingOutputRequest(values.LayerId, values.TimeStamp, statsKey);

                    return await this.client.PostAsJsonAsync<LoggingOutputRequest>(statsUrl, log);
                } 
                
            } catch(Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            var message = new HttpResponseMessage();
            message.StatusCode = HttpStatusCode.InternalServerError;
            return message;
        }
    }
}