﻿import { FunctionComponent, ReactElement } from 'react';
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
                <div className='htmlDirections'>{props.step.step.html_instructions}</div>
                <div className='timeDirections'>{`Depature Time: ${transitDetail.departure_time.text} Arrival Time: ${transitDetail.arrival_time.text}`}</div>
                <div className='company'>{`Company: ${transitDetail.line.agencies[0].name}`}</div>
                <div className='transitDirections'>{`Vehicle headsign: ${transitDetail.headsign}`}</div>
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