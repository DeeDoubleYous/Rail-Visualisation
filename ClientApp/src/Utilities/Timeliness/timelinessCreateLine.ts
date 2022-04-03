import { LineString } from 'maptalks';

import { fetchLateness, getLatenessColour } from './';
import { createLine, decodePolyLine } from '../';
import { IStep, ILeg, IRoutes } from '../../Interfaces';
import { IAsyncRoutingItem } from '../../Interfaces/Layers/IAsyncRoutingItem';


const createStepLine = async (step: IStep): Promise<IAsyncRoutingItem> => {
    let colour = '#235689';

    if (step.travel_mode === 'TRANSIT' && step.transit_details) {
        colour = getLatenessColour(await fetchLateness(step));
    }

    return {
        step: step,
        lineString: createLine(decodePolyLine(step.polyline), colour, 3)
    };
}

const createSepLineList = async (step: IStep): Promise<IAsyncRoutingItem[]> => step.steps ? await [{ step: step, subSteps: await step.steps.map((subStep) => createStepLine(subStep)) }] : [await createStepLine(step)];

const createLineFromLeg = async (leg: ILeg) => {
    return await (await Promise.all(leg.steps.map(async (step) => await createSepLineList(step)))).flat();
}

export const createTimelinessLine = async (route: IRoutes) => (await Promise.all(route.legs.map(await createLineFromLeg))).flat();