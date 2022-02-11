import { ILeg, ILocation } from './'; 

export interface IRoutes {
    bounds: IBounds,
    copyrights: string,
    legs: ILeg[],
    overview_polyline: {
        points: string
    },
    summary: string,
    warnings: string[]
}

export interface IBounds {
    north?: ILocation,
    south?: ILocation,
    east?: ILocation,
    west?: ILocation,
    northeast?: ILocation,
    southeast?: ILocation,
    southwest?: ILocation,
    northwest?: ILocation
}