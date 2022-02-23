import { ClassicFactory, ClassType, FunctionComponent, ReactElement } from 'react';

import { Menu, LayerMenuItem } from '../';
import { ILayer } from '../../Interfaces';
import { Routing } from '../../Layers/Routing';
import { Stations } from '../../Layers/Stations';

export interface ILayerMenu {
    addLayer: (layer: ILayer) => void
}

export const LayerMenu: FunctionComponent<ILayerMenu> = (props): ReactElement => {
    const generateDateTimeId = (): string => {
        const date = new Date(Date.now());
        return `${date.getDay()}${date.getMonth()}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
    };

    const layers = [
        {
            title: 'Routing',
            layer: Routing
        },
        {
            title: 'Stations',
            layer: Stations
        }];

    return (
        <Menu className='layerMenu'>
            {
                layers.map(layer => <LayerMenuItem key={layer.title} className={layer.title} itemTitle={layer.title} primaryAction={() => {
                    const newLayer = new layer.layer(layer.title, generateDateTimeId());
                    props.addLayer(newLayer);
                }}/>)
            }
        </Menu>
    );
}