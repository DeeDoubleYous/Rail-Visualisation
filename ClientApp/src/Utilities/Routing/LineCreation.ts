import { LineString } from 'maptalks';
import { ILocation, ILeg, IStep, IRoutes } from '../../Interfaces/Data';

export const rFold = <a, b>(func: (acc: b, item: a) => b, acc: b, [head, ...tail]: a[]): b => tail.length == 0 ? func(acc, head) : func(rFold(func, acc, tail), head); 

/**
 * *
 * A function to use to create line for the map. Unconcerned with the adding to the map only creates the line object.
 * @param startLocation
 * @param endLocation
 * @param lineColour
 * @param lineWidth
 */
export const createLine = (startLocation: ILocation, endLocation: ILocation, lineColour: string, lineWidth: number): LineString => {
    return new LineString([[startLocation.lng, startLocation.lat], [endLocation.lng, endLocation.lat]], {
        symbol: {
            lineColor: lineColour,
            lineWidth: lineWidth
        }
    });
};

export const createStepLine = (step: IStep): LineString => {
    return createLine(step.start_location, step.end_location, '#235689', 3);
};

export const createLineFromLeg = (leg: ILeg): LineString[] => {
    return leg.steps.map(createStepLine);
};

export const createRouteLine = (route: IRoutes): LineString[] => {
    return rFold((acc: LineString[], item: ILeg) => acc.concat(createLineFromLeg(item)), [], route.legs);
};