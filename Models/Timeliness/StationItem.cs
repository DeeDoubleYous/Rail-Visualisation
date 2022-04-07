namespace RailVisualisation.Models.Timeliness
{
    public class StationItem
    {
        public string Code
        {
            get; set;
        }

        public string Name
        {
            get; set;
        }

        public string Postcode
        {
            get; set;
        }

        public StationItem(string code, string name, string postcode)
        {
            this.Code = code;
            this.Name = name;
            this.Postcode = postcode;
        }
    }
}
