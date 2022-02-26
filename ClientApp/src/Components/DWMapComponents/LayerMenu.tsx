import { ClassicFactory, ClassType, FunctionComponent, ReactElement } from 'react';

import { Menu, LayerMenuItem } from '../';
import { ILayer } from '../../Interfaces';
import { Routing } from '../../Layers/Routing';
import { Stations } from '../../Layers/Stations';
import { createDateString } from '../../Utilities';
import '../../Styles/Components/DWSMapComponents/LayerMenu.css';

export interface ILayerMenu {
    addLayer: (layer: ILayer) => void
}

export const LayerMenu: FunctionComponent<ILayerMenu> = (props): ReactElement => {

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
        <Menu id='layerMenu'>
            {
                layers.map(layer => <LayerMenuItem key={layer.title} className={layer.title} itemTitle={layer.title} primaryAction={() => {
                    const newLayer = new layer.layer(layer.title, createDateString(new Date(Date.now())));
                    props.addLayer(newLayer);
                }}/>)
            }
        </Menu>
    );
}