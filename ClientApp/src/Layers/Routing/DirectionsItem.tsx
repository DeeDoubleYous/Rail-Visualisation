import { FunctionComponent, ReactElement } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { IRoutingItem } from '../../Interfaces';
import { stripHTML } from '../../Utilities';
import '../../Styles/Layers/Routing/DirectionsItem.css';

interface IDirectionsItem {
    step: IRoutingItem,
    clickIn: (subStep: IRoutingItem[]) => void,
    clickOut: () => void
}

export const DirectionsItem: FunctionComponent<IDirectionsItem> = (props): ReactElement => {

    let output: ReactElement = (<></>);

    if (props.step.step.transit_details) {
        const transitDetail = props.step.step.transit_details;
        output = (
            <div className='directionItem'>
                <div className='htmlDirections'>{props.step.step.html_instructions}</div>
                <div className='timeDirections'>{`Depature Time: ${transitDetail.departure_time.text} Arrival Time: ${transitDetail.arrival_time.text}`}</div>
                <div className='company'>{`Company: ${transitDetail.line.agencies[0].name}`}</div>
                <div className='transitDirections'>{`Vehicle headsign: ${transitDetail.headsign}`}</div>
            </div>
        );
    }

    if (props.step.step.travel_mode == 'WALKING' && props.step.step.html_instructions) {
        let clickIn = (<></>);

        if (props.step.subSteps && props.step.subSteps[0].step.html_instructions && props.clickIn) {
            clickIn = (<ArrowForwardIosIcon onClick={() => {
                if (props.clickIn && props.step.subSteps) {
                    props.clickIn(props.step.subSteps);
                }
            }}/>);
        }

        output = (
            <div className='directionItem'>
                <div className='endLocation'>{stripHTML(props.step.step.html_instructions)}</div>
                {
                    clickIn
                }
            </div>
        );
    }
    return output;
}