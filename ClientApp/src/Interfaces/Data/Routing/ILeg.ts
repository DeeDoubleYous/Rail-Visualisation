import { ITextValuePair, ILocation, IStep } from './';

export interface ILeg {
    arrival_time: ITravelTimes,
    departure_time: ITravelTimes,
    distance: ITextValuePair,
    duration: ITextValuePair,
    end_address: string,
    end_location: ILocation,
    start_address: string,
    start_location: ILocation,
    steps: IStep[],
    trafic_speed_entry: [],
    via_waypoint: []
}

export interface ITravelTimes {
    text: string,
    time_zone: string,
    value: number
}