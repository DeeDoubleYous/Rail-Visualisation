import { FunctionComponent, ReactElement } from 'react';

import { IRoutingItem } from '../../Interfaces';
import { DirectionsItem } from './DirectionsItem';

export interface IDirectionsList {
    route: IRoutingItem[],
    clickIn: (subSteps: IRoutingItem[]) => void,
    clickOut: () => void,
    inChildList: boolean
};

export const DirectionsList: FunctionComponent<IDirectionsList> = (props): ReactElement => {
    return (
        <div className='directionsList'>
            {
                props.inChildList && <button onClick={props.clickOut}>Click Out</button>
            }
            {
                props.route.map(line => <DirectionsItem step={line} key={line.step.polyline.points} clickIn={props.clickIn} clickOut={props.clickOut} />)
            }
        </div>
    );
};