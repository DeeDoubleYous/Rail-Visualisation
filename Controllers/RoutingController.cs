using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RailVisualisation.Models.Routing;

namespace RailVisualisation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoutingController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "pee";
        }
    }
}
