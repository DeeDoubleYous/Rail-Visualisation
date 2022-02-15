import { LineString } from 'maptalks';
import { ILocation, ILeg, IStep, IRoutes } from '../../Interfaces/Data';

/**
 * *
 * A function to use to create line for the map. Unconcerned with the adding to the map only creates the line object.
 * @param startLocation
 * @param endLocation
 * @param lineColour
 * @param lineWidth
 */
const createLine = (startLocation: ILocation, endLocation: ILocation, lineColour: string, lineWidth: number): LineString => {
    return new LineString([[startLocation.lng, startLocation.lat], [endLocation.lng, endLocation.lat]], {
        symbol: {
            lineColor: lineColour,
            lineWidth: lineWidth
        }
    });
};

const createStepLine = (step: IStep): LineString => {
    return createLine(step.start_location, step.end_location, '#235689', 3);
};

const createStepLineList = (step: IStep): LineString[] => {
    if (step.steps) {
        return step.steps.map(createStepLine);
    }
    return [createStepLine(step)];
}

const createLineFromLeg = (leg: ILeg): LineString[] => {
    return leg.steps.map(createStepLineList).flat();
};

export const createRouteLine = (route: IRoutes): LineString[] => {
    return route.legs.map(createLineFromLeg).flat();
};