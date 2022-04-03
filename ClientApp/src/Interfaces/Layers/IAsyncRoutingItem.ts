import { IStep } from "../Data";
import { LineString } from "maptalks";
import { IRoutingItem } from "./IRoutingItem";

export interface IAsyncRoutingItem{
    step: IStep,
    lineString?: LineString,
    subSteps?: Promise<IAsyncRoutingItem>[]
};

export type RoutingItems = IAsyncRoutingItem | IRoutingItem;