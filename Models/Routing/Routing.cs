namespace RailVisualisation.Models.Routing
{
    public class Routing
    {
        GeocodedWayPoints[] Geocoded_waypoints
        {
            get; set;
        }
        string[] Routes
        {
            get; set;
        }

        string Status
        {
            get; set;
        }

        public Routing(GeocodedWayPoints[] geocodedWayPoints, string[] routes, string status)
        {
            this.Geocoded_waypoints = geocodedWayPoints;
            this.Routes = routes;
            this.Status = status;
        }
    }
}
