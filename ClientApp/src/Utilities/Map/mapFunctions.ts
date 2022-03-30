import { Coordinate, Map, Layer, LineString } from 'maptalks';
import { IRoutingItem, IRouting } from '../../Interfaces';
import { determinZoom } from '../Routing';

export const addToMap = (line: IRoutingItem, layer: Layer): void | LineString => line.subSteps ? line.subSteps.forEach(step => addToMap(step, layer)) : line.lineString?.addTo(layer);

export const removeFromMap = (line: IRoutingItem): void | LineString => line.subSteps ? line.subSteps.forEach(removeFromMap) : line.lineString?.remove();

export const centerMap = (map: Map, route: IRouting): void => {
    const centerLng = (route.routes[0].legs[0].start_location.lng + route.routes[0].legs[0].end_location.lng) / 2;
    const centerLat = (route.routes[0].legs[0].start_location.lat + route.routes[0].legs[0].end_location.lat) / 2;

    map.setCenterAndZoom(new Coordinate([centerLng, centerLat]), determinZoom(route.routes[0].legs[0].start_location, route.routes[0].legs[0].end_location));
}