import { ClassicFactory, ClassType, FunctionComponent, ReactElement } from 'react';

import { Menu, LayerMenuItem } from '../';
import { ILayer } from '../../Interfaces';
import { Routing } from '../../Layers/Routing';
import { Stations } from '../../Layers/Stations';
import { createDateString } from '../../Utilities';
import '../../Styles/Components/DWSMapComponents/LayerMenu.css';

export interface ILayerMenu {
    addLayer: (layer: ILayer, layerId: number) => void
}

export const LayerMenu: FunctionComponent<ILayerMenu> = (props): ReactElement => {

    const layers = [
        {
            layerId: 1,
            title: 'Routing',
            layer: Routing
        },
        ];

    return (
        <Menu id='layerMenu'>
            {
                layers.map(layer => <LayerMenuItem key={layer.title} className={layer.title} itemTitle={layer.title} primaryAction={() => {
                    const newLayer = new layer.layer(layer.title, createDateString(new Date(Date.now())));
                    props.addLayer(newLayer, layer.layerId);
                }}/>)
            }
        </Menu>
    );
}