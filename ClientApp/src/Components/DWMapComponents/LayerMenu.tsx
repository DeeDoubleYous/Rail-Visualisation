import { FunctionComponent, ReactElement } from 'react';

import { Menu, LayerMenuItem } from '../../Components';
import { ILayer } from '../../Interfaces';
import { Routing } from '../../Layers/Routing';
import { Stations } from '../../Layers/Stations';

export interface ILayerMenu {
    addLayer: (layer: ILayer) => void
}

export const LayerMenu: FunctionComponent<ILayerMenu> = (props): ReactElement => {
    return (
        <Menu className='layerMenu'>
            <LayerMenuItem className='Routing' itemTitle='routing' primaryAction={() => {
                const routing = new Routing('routing', 'route');
                props.addLayer(routing);
            }} />
            <LayerMenuItem className='Stations' itemTitle='stations' primaryAction={() => {
                const stations = new Stations('stations', 'station');
                props.addLayer(stations);
            }}/>
        </Menu>
    );
}