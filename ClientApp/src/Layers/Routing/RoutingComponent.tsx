import { FunctionComponent, ReactElement } from 'react';
import { Menu } from '../../Components';
import { VectorLayer, LineString } from 'maptalks';

export interface IRoutingComponent{
    className: string,
    layer: VectorLayer,
    fetchData: () => Promise<void>
}

export const RoutingComponent: FunctionComponent<IRoutingComponent> = (props): ReactElement => {

    const line = new LineString([[-0.1189532, 50.8464825], [-0.141252, 50.828999]], {
        symbol: {
            lineColor: '#003f2e',
            lineWidth: 4
        }
    });

    line.addTo(props.layer);
    //props.fetchData();
    return (
        <div>
            <Menu className='routingMenu'>
                <p> I belong to {props.className}</p>
            </Menu>
        </div>
    );
};