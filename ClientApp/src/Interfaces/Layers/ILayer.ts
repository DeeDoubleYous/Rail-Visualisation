import { Layer } from 'maptalks';
import { ReactElement } from 'react';

export interface ILayer {
    mapLayer: Layer,
    removeLayer: () => void,
    drawComponents: () => ReactElement,
    getMapLayer: () => Layer
}