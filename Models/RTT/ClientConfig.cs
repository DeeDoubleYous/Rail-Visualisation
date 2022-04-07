using ParkSquare.RealTimeTrains;

namespace RailVisualisation.Models.RTT
{
    public class ClientConfig : IClientConfig
    {
        public string BaseUrl
        {
            get;
        }

        public string Username
        {
            get;
        }

        public string Password
        {
            get;
        }

        public ClientConfig()
        {
            this.BaseUrl = $"{System.Configuration.ConfigurationManager.ConnectionStrings["realTimeTrains"]}";
            this.Username = $"{System.Configuration.ConfigurationManager.AppSettings["railUser"]}";
            this.Password = $"{System.Configuration.ConfigurationManager.AppSettings["railPass"]}";
        }
    }
}
