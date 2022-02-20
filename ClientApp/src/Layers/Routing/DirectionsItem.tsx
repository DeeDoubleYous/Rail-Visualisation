import { FunctionComponent, ReactElement } from 'react';
import { IRoutingItem } from '../../Interfaces';
import '../../Styles/Layers/Routing/DirectionsItem.css';

interface IDirectionsItem {
    step: IRoutingItem
}


export const DirectionsItem: FunctionComponent<IDirectionsItem> = (props): ReactElement => {

    let output: ReactElement = (<></>);

    const createDateString = (dateVal: number | string) => {
        const date = new Date(dateVal);
        return `${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
    }

    if (props.step.step.transit_details) {
        const transitDetail = props.step.step.transit_details;
        output = (
            <>
                <div className='htmlDirections'>{props.step.step.html_instructions}</div>
                <div className='timeDirections'>{`Depature Time: ${transitDetail.departure_time.text} Arrival Time: ${transitDetail.arrival_time.text}`}</div>
                <div className='company'>{transitDetail.line.agencies[0].name}</div>
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