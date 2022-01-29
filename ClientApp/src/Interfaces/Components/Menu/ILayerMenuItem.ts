import { IMenuItem } from "./IMenuItem";

export interface ILayerMenuItem extends IMenuItem {
    addLayer: () => void;
}