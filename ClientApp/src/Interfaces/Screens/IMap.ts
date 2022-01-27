import { Layer } from 'maptalks';

export interface IMap {
    layers: Layer[],
    className?: string
}