import { FunctionComponent, ReactElement } from 'react';
import { Menu } from '../../Components';

export const RoutingComponent: FunctionComponent = (): ReactElement => {
    return (
        <div>
            <Menu className='routingMenu'>
                <p> I am some text</p>
            </Menu>
        </div>
    );
};