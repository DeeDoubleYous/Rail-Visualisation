import { IStep } from "../../Interfaces";
import { createDateString } from "../DataTools";

export const fetchLateness = async (step: IStep) => { 
    if (!step.transit_details?.departure_time) {
        return -1;
    }
    const [hour, mins] = step.transit_details.departure_time.text.split(':');
    // const splitTime = step.transit_details.departure_time.text.split(':');

    // const hour = splitTime[0];
    // const mins = splitTime[1];
    
    const depatureDate = new Date(Date.now());

    depatureDate.setHours(parseInt(hour));
    depatureDate.setMinutes(parseInt(mins));

    const data = await fetch(`/timeliness?start=${step.transit_details?.departure_stop.name}&end=${step.transit_details?.arrival_stop.name}&travelTime=${createDateString(depatureDate)}`);

    return (await data.json()) as number;
}

export const getLatenessColour = (lateness: number): string => {
    if (lateness === -1) return '#FFF';

    if(lateness === 0) return '#00FF00';

    if(lateness <= 4) return '#EAFF00';

    if(lateness <= 10) return '#FF7B00';
    
    return '#FF0000';
}