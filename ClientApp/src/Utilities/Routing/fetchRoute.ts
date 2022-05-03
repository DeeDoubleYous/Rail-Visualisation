import { IRouting } from '../../Interfaces';

export const fetchRoute = async (origin: string, destination: string, departure_time: string): Promise<IRouting> => {
    const correctTime = Math.floor(new Date(departure_time).getTime() / 1000);
    const data = await fetch(`/routing?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&departure_time=${correctTime}`);
    const text = await data.json() as IRouting;

    return text;
}