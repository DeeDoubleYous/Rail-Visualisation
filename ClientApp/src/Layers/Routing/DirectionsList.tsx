import { FunctionComponent, ReactElement } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { IRoutingItem } from '../../Interfaces';
import { DirectionsItem } from './DirectionsItem';
import '../../Styles/Layers/Routing/DirectionsList.css';

export interface IDirectionsList {
    route: IRoutingItem[],
    clickIn: (subSteps: IRoutingItem[]) => void,
    clickOut: () => void,
    inChildList: boolean
};

export const DirectionsList: FunctionComponent<IDirectionsList> = (props): ReactElement => {
    let unique = 0;
    return (
        <div className='directionsList'>
            {
                props.inChildList && <ArrowBackIosIcon onClick={props.clickOut} />
            }
            {
                props.route.map(line => <DirectionsItem step={line} key={`${unique++}`} clickIn={props.clickIn} clickOut={props.clickOut} />)
            }
        </div>
    );
};