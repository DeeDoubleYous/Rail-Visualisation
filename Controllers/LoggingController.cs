using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RailVisualisation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoggingController : ControllerBase
    {
        HttpClient client;
        public LoggingController(HttpClient client)
        {
            this.client = client;
        }
    }
}
