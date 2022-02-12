import { ITextValuePair, ILocation, ILine } from './';

export interface IStep {
    distance: ITextValuePair,
    duration: ITextValuePair,
    end_location: ILocation,
    html_instructions: string,
    maneuver?: string,
    polyline: {
        points: string
    },
    start_location: ILocation,
    transit_details?: ITransitDetails,
    travel_mode: string,
    steps?: IStep[]
}

export interface ITransitDetails {
    arrival_stop: {
        location: ILocation,
        name: string
    },
    arrival_time: ITextValuePair,
    depature_stop: ITextValuePair,
    headsign: string,
    depature_time: ITextValuePair,
    line: ILine,
    num_stops:number
}