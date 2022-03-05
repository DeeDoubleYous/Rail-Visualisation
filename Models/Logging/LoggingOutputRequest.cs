namespace RailVisualisation.Models.Logging
{
    public class LoggingOutputRequest
    {

        public int LayerId
        {
            get; set;
        }

        public DateTime TimeStamp
        {
            get; set;
        }

        public string Key
        {
            get; set;
        }

        public LoggingOutputRequest(int layerId, DateTime timeStamp, string key)
        {
            this.LayerId = layerId;
            this.TimeStamp = timeStamp;
            this.Key = key;
        }
    }
}
