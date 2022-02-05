namespace RailVisualisation.Models.Routing
{
    public class GeocodedWayPoints
    {
        string? Geocoder_status 
        {
            get; set; 
        }

        string? Place_id 
        { 
            get; set; 
        }

        string[]? Types
        {
            get; set;
        }

        public GeocodedWayPoints(string geocoder_status, string place_id, string[] types)
        {
            this.Geocoder_status = geocoder_status;
            this.Place_id = place_id;
            this.Types = types;
        }
    }
}
