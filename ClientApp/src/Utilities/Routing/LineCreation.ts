import { LineString } from 'maptalks';
import { decode } from '@googlemaps/polyline-codec';
import { IRoutingItem } from '../../Interfaces';
import { ILeg, IStep, IRoutes, IPolyLine } from '../../Interfaces/Data';


const decodePolyLine = (line: IPolyLine) => {
    const points = decode(line.points);
    return points.map(([lat, lng]) => [lng, lat]);
}

/**
 * *
 * A function to use to create line for the map. Unconcerned with the adding to the map only creates the line object.
 * @param startLocation
 * @param endLocation
 * @param lineColour
 * @param lineWidth
 */
const createLine = (points: number[][], lineColour: string, lineWidth: number): LineString => new LineString(
    points,
    {
        symbol: {
            lineColor: lineColour,
            lineWidth: lineWidth
        }
    }
);


const createStepLine = (step: IStep): IRoutingItem => {
    let colour = '#235689';

    if (step.travel_mode == 'TRANSIT' && step.transit_details) {
        colour = step.transit_details.line.color === '#000000' ? '#FFF' : step.transit_details.line.color;
    }

    return {
        step: step,
        lineString: createLine(decodePolyLine(step.polyline), colour, 3)
    }
};

const createStepLineList = (step: IStep): IRoutingItem[] => step.steps ? [{ step: step, subSteps: step.steps.map(createStepLine) }] : [createStepLine(step)];

const createLineFromLeg = (leg: ILeg): IRoutingItem[] => leg.steps.map(createStepLineList).flat();

export const createRouteLine = (route: IRoutes): IRoutingItem[] => route.legs.map(createLineFromLeg).flat();