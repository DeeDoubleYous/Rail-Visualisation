import { Layer } from 'maptalks';
import { ReactElement } from 'react';

export interface ILayer {
    mapLayer: Layer,
    className:string,
    id: string,
    selected: boolean,
    layerTitle: string,
    removeLayer: () => void,
    drawComponents: () => ReactElement,
    getMapLayer: () => Layer,
    getSelected: () => boolean,
    setSelected: (selected: boolean) => void,
    getLayerTitle: () => string
}