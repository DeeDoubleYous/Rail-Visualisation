import { fetchLateness, getLatenessColour } from './';
import { createLine, decodePolyLine } from '../';
import { IStep, ILeg, IRoutes } from '../../Interfaces';
import { IAsyncRoutingItem } from '../../Interfaces/Layers/IAsyncRoutingItem';


const createStepLine = async (step: IStep, lateness: number): Promise<IAsyncRoutingItem> => {
    let colour = '#235689';

    if (step.travel_mode === 'TRANSIT' && step.transit_details && step.transit_details.line.vehicle.type === 'HEAVY_RAIL') {
        colour = getLatenessColour(lateness);
    }

    return {
        step: step,
        lineString: createLine(decodePolyLine(step.polyline), colour, 3)
    };
}

const createLineFromLeg = async (leg: ILeg) => {
    const lateness = await fetchLateness(leg);

    return await (await Promise.all(leg.steps.map(async (step) => await createStepLine(step, lateness)))).flat();
}

export const createTimelinessLine = async (route: IRoutes) => (await Promise.all(route.legs.map(await createLineFromLeg))).flat();