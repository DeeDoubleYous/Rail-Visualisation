import { FunctionComponent, ReactElement } from 'react';

import { Menu, LayerMenuItem } from '../../Components';
import { IMapLayerMenu } from '../../Interfaces';
import { Routing } from '../../Layers/Routing';
import { Stations } from '../../Layers/Stations';

export const LayerMenu: FunctionComponent<IMapLayerMenu> = (props): ReactElement => {
    return (
        <Menu className='layerMenu'>
            <LayerMenuItem className='Routing' itemTitle='routing' primaryAction={() => {
                const routing = new Routing('test', 'test');
                props.addLayer(routing);
            }} />
            <LayerMenuItem className='Stations' itemTitle='stations' primaryAction={() => {
                const stations = new Stations('test', 'test');
                props.addLayer(stations);
            }}/>
        </Menu>
    );
}