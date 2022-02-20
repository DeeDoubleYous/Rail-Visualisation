import { FunctionComponent, ReactElement } from 'react';
import { IRoutingItem } from '../../Interfaces';
import '../../Styles/Layers/Routing/DirectionsItem.css';

interface IDirectionsItem {
    step: IRoutingItem
}


export const DirectionsItem: FunctionComponent<IDirectionsItem> = (props): ReactElement => {

    let output: ReactElement = (<></>);

    if (props.step.step.transit_details) {
        const transitDetail = props.step.step.transit_details;
        output = (
            <>
                <div className='depatureStop'>{transitDetail.departure_stop.name}</div>
                <div className='arrivalStop'>{transitDetail.arrival_stop.name}</div>
                <div className='htmlDirections'>{props.step.step.html_instructions}</div>
            </>
        );
    }

    if (props.step.step.travel_mode == 'WALKING') {
        output = (
            <>
                <div className='endLocation'>{props.step.step.html_instructions}</div>
            </>                
        )
    }

    return (
        <div className='directionItem'>
            {
                output
            }
        </div>
    );
}