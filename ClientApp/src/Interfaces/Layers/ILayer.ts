import { Layer } from 'maptalks';

export interface ILayer {
    className: string,
    addLayer: (layer: Layer) => void,
    removeLayer: (layer: Layer) => void
}