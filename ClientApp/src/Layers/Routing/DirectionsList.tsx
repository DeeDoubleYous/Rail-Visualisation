import { FunctionComponent, ReactElement } from 'react';

import { IRoutingItem } from '../../Interfaces';
import { DirectionsItem } from './DirectionsItem';

export interface IDirectionsList {
    route: IRoutingItem[]
};

export const DirectionsList: FunctionComponent<IDirectionsList> = (props): ReactElement => {

    return (
        <div className='directionsList'>
            {
                props.route.map(line => <DirectionsItem step={line} key={line.step.polyline.points} />)
            }
        </div>
    );
};