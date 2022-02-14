import { FunctionComponent, ReactElement } from 'react';

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


    return (
        <Menu className='layerMenu'>
            <LayerMenuItem className='Routing' itemTitle='routing' primaryAction={() => {
                const routing = new Routing('routing', `${generateDateTimeId()}`);
                props.addLayer(routing);
            }} />
            <LayerMenuItem className='Stations' itemTitle='stations' primaryAction={() => {
                const stations = new Stations('stations', `${generateDateTimeId()}`);
                props.addLayer(stations);
            }}/>
        </Menu>
    );
}