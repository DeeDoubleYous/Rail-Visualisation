import { FunctionComponent, ReactElement } from 'react';
import { Menu } from '../../Components';
import { Layer } from 'maptalks';

export interface IRoutingComponent{
    className: string,
    layer: Layer,
    fetchData: () => void
}

export const RoutingComponent: FunctionComponent<IRoutingComponent> = (props): ReactElement => {
    props.fetchData();
    return (
        <div>
            <Menu className='routingMenu'>
                <p> I belong to {props.className}</p>
            </Menu>
        </div>
    );
};