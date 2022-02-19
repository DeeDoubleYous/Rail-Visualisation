import { FunctionComponent, ReactElement } from 'react';
import { IRoutingItem } from '../../Interfaces';

interface IDirectionsItem {
    step: IRoutingItem
}


export const DirectionsItem: FunctionComponent<IDirectionsItem> = (props): ReactElement => {
    return (
        <div>
            {props.step.step.html_instructions}
        </div>
    );
}