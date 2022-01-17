using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RailVisualisation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;

        public TestController(ILogger<TestController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Test> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new Test
            {
                Name = $"{index}",
                Description = $"This is {index}"
            }).ToArray();
        }
    }
}
