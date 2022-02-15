import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Menu } from '../../Components';
import { VectorLayer, LineString } from 'maptalks';
import { IRouting, IStep } from '../../Interfaces';
import { createRouteLine } from '../../Utilities';

export interface IRoutingComponent{
    className: string,
    layer: VectorLayer,
    fetchData: () => Promise<IRouting>
}

export const RoutingComponent: FunctionComponent<IRoutingComponent> = (props): ReactElement => {

    const [route, setRoute] = useState<IRouting>();

    useEffect(() => {
        props.fetchData().then(setRoute);
    }, []);

    useEffect(() => {
        if(route) createRouteLine(route.routes[0]).map(line => line.addTo(props.layer));
    }, [route]);
    
    return (
        <Menu className='routingMenu'>
            <p> I belong to {props.className}</p>
        </Menu>
    );
};