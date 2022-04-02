import { IStep } from "../../Interfaces";
import { createDateString } from "../DataTools";

export const fetchLateness = async (step: IStep, departure: string) => { 
    if (!step.transit_details?.departure_time) {
        return -1;
    }
    const [hour, mins] = step.transit_details.departure_time.text.split(':');

    const depatureDate = new Date(Date.now());

    depatureDate.setHours(parseInt(hour));
    depatureDate.setMinutes(parseInt(mins));

    const data = await fetch(`/timeliness?start=${step.transit_details?.departure_stop.name}&end=${step.transit_details?.departure_stop.name}&travelTime=${createDateString(depatureDate)}`);

    return (await data.json()) as number;
}

export const getLatenessColour = (lateness: number): string => {
    if (lateness === -1) return '#FFF';

    if(lateness === 0) return '#00FF00';

    if(lateness <= 4) return '#EAFF00';

    if(lateness <= 10) return '#FF7B00';
    
    return '#FF0000';
}