import { Coordinate, Map, Layer, LineString } from 'maptalks';
import { IRouting, RoutingItems } from '../../Interfaces';
import { determinZoom } from './determinZoom';

export const addToMap = (line: RoutingItems, layer: Layer): void | LineString => line.subSteps ? line.subSteps.forEach(async (step) => addToMap(await step, layer)) : line.lineString?.addTo(layer);

export const removeFromMap = (line: RoutingItems): void | LineString => line.subSteps ? line.subSteps.forEach(async (subStep) => removeFromMap(await subStep)) : line.lineString?.remove();

export const centerMap = (map: Map, route: IRouting): void => {
    const centerLng = (route.routes[0].legs[0].start_location.lng + route.routes[0].legs[0].end_location.lng) / 2;
    const centerLat = (route.routes[0].legs[0].start_location.lat + route.routes[0].legs[0].end_location.lat) / 2;

    map.setCenterAndZoom(new Coordinate([centerLng, centerLat]), determinZoom(route.routes[0].legs[0].start_location, route.routes[0].legs[0].end_location));
}