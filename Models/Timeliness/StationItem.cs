namespace RailVisualisation.Models.Timeliness
{
    public class StationItem
    {
        public string Code
        {
            get; set;
        }

        public string Station
        {
            get; set;
        }

        public StationItem(string code, string station)
        {
            this.Code = code;
            this.Station = station;
        }
    }
}
