import { rgbToHex } from "@mui/system";
import { IStep } from "../../Interfaces";
import { createDateString } from "../DataTools";

export const fetchLateness = async (step: IStep, departure: Date): Promise<number> => {

    const data = await fetch(`/timeliness?start=${step.transit_details?.departure_stop.name}&end=${step.transit_details?.departure_stop.name}&travelTime=${createDateString(departure)}`);

    return (await data.json()) as number;
}

export const getLatenessColour = (lateness: number): string => {
    if(lateness === 0) return '#00FF00';

    if(lateness <= 4) return '#EAFF00';

    if(lateness <= 10) return '#FF7B00';
    
    return '#FF0000';
}