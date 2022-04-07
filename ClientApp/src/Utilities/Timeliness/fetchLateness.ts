import { ILeg } from "../../Interfaces";
import { createDateString } from "../DataTools";

const stripStation = (station: string) => station.split('Station')[0].trim();

export const getPostCode = (address: string): string => {
    let postCode = '';
    const matchArray = address.split(',').map(item => item.match(/([A-Za-z]{1,2}\d{1,2})(\s?(\d?\w{2}))?/)).filter(e => e)[0];

    if (matchArray) {
        postCode = matchArray[0];
    }

    return postCode;
};

const genTime = (time: string) => {
    const [hour, min] = time.split(':');

    if (min.match('am')) {
        return [parseInt(hour), parseInt(min.substring(0, 2))];
    }

    return [24 - parseInt(hour), parseInt(min.substring(0, 2))];

}

export const fetchLateness = async (leg: ILeg) => {
    if(!leg.steps[1].transit_details){
        console.log('bee');
        return -1;
    }

    const [hour, mins] = genTime(leg.steps[1].transit_details?.departure_time.text);
    
    const depatureDate = new Date(Date.now());

    depatureDate.setHours(hour);
    depatureDate.setMinutes(mins);

    const data = await fetch(`/timeliness?start=${stripStation(leg.steps[1].transit_details?.departure_stop.name)}&startPostcode=${getPostCode(leg.start_address)}&end=${stripStation(leg.steps[1].transit_details?.arrival_stop.name)}&endPostcode=${getPostCode(leg.end_address)}&travelTime=${createDateString(depatureDate)}`);

    return await data.json() as number;
}

export const getLatenessColour = (lateness: number): string => {
    if (lateness === -1) return '#FFF';

    if(lateness === 0) return '#00FF00';

    if(lateness <= 4) return '#EAFF00';

    if(lateness <= 10) return '#FF7B00';
    
    return '#FF0000';
}