import { FunctionComponent, ReactElement } from 'react';
import { Menu } from '../../Components';

export interface IRoutingComponent{
    className: string
}

export const RoutingComponent: FunctionComponent<IRoutingComponent> = (props): ReactElement => {
    return (
        <div>
            <Menu className='routingMenu'>
                <p> I belong to {props.className}</p>
            </Menu>
        </div>
    );
};