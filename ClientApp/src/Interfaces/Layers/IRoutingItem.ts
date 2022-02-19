import { LineString } from "maptalks";
import { IStep } from "../Data";

export interface IRoutingItem {
    step: IStep,
    lineString?: LineString,
    subSteps?: IRoutingItem[] 
}