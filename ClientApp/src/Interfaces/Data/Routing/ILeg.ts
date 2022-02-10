import { ITextValuePair, ILocation } from './';

export interface ILeg {
    arrival_time: ITravelTimes,
    departure_time: ITravelTimes,
    distance: ITextValuePair,
    duration: ITextValuePair,
    end_address: string,
    end_location: ILocation,
    start_address: string,
    start_location: ILocation
}

export interface ITravelTimes {
    text: string,
    time_zone: string,
    value: number
}