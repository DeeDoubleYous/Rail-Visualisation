using ParkSquare.RealTimeTrains;

namespace RailVisualisation.Models.Timeliness
{
    public class TimelinessModel
    {
        readonly HttpClient client;
        readonly IRealTimeTrainsClient rttClient;


        readonly string statsUri;
        readonly string statsKey;

        public TimelinessModel(HttpClient client, IRealTimeTrainsClient rttClient)
        {
            this.client = client;
            this.rttClient = rttClient;

            this.statsUri = $"{System.Configuration.ConfigurationManager.ConnectionStrings["loggingAPI"]}/code";
            this.statsKey = $"{System.Configuration.ConfigurationManager.AppSettings["statKey"]}";
        }

        public async Task<StationItem> GetStationCode(string stationName)
        {
            try
            {
                var response = await client.GetFromJsonAsync<StationItem[]>($"{this.statsUri}?key={statsKey}&station={stationName}");
                return response[0];
            }catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return null;
        }

        public string GetServiceId(StationItem start, StationItem end, DateFilter travelTimeAsFilter, DateTime travelTime)
        {
            var services = rttClient.GetDepartures(start.Code, end.Code);

            var filteredService = services.Services.Where((serv) => serv.LocationDetail.Origin[0].WorkingTime.AsDateTime.Hour == travelTime.Hour && serv.LocationDetail.Origin[0].WorkingTime.AsDateTime.Minute == travelTime.Minute);

            if(filteredService.FirstOrDefault() != null)
            {
                return filteredService.First().ServiceUid;
            }

            return null;
        }

        public ServiceResponse GetService(string serviceCode, DateFilter travelTime)
        {
            return this.rttClient.GetService(serviceCode, travelTime);
        }

        public async Task<int> GetServiceLateness(string start, string end, DateTime travelTime)
        {
            var travelTimeAsFilter = new DateFilter(travelTime.Year, travelTime.Month, travelTime.Day);

            var serviceId = this.GetServiceId(await this.GetStationCode(start), await this.GetStationCode(end), travelTimeAsFilter, travelTime);

            var service = this.GetService(serviceId, travelTimeAsFilter);

            if(service.Locations.FirstOrDefault() != null)
            {
                var serviceFirst = service.Locations.First();

                return serviceFirst.RealtimePassLateness;
            }

            return -1;
        }
    }
}