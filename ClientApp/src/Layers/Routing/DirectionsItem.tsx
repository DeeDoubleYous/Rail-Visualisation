import { FunctionComponent, ReactElement } from 'react';
import { IRoutingItem } from '../../Interfaces';
import '../../Styles/Layers/Routing/DirectionsItem.css';

interface IDirectionsItem {
    step: IRoutingItem
}


export const DirectionsItem: FunctionComponent<IDirectionsItem> = (props): ReactElement => {
    return (
        <div className='directionItem'>
            <div className='startLocation'>{props.step.step.transit_details?.arrival_stop.name}</div>
            {props.step.step.html_instructions}
        </div>
    );
}