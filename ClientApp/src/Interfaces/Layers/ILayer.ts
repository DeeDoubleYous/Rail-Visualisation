import { Layer } from 'maptalks';
import { ReactElement } from 'react';

export interface ILayer {
    mapLayer: Layer,
    className: string,
    id: string,
    layerTitle: string,
    removeLayer: () => void,
    drawComponents: () => ReactElement,
    getMapLayer: () => Layer,
    getLayerTitle: () => string
}