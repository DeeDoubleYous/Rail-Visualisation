import { IRouting } from '../../Interfaces';

export const fetchRoute = async (origin: string, destination: string, depature_time: Date): Promise<IRouting> => {
    const data = await fetch(`/routing?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&depature_time=${encodeURIComponent(depature_time.getTime())}`);
    const text = await data.json() as IRouting;

    return text;
}