import { log } from './log';
import { createDateString } from '../';

export const logLayerUsage = async (layerId: number, timeStamp: Date): Promise<boolean> => {
    return await log({ layerId: layerId, timeStamp: createDateString(timeStamp) });
}