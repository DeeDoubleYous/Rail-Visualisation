import { FunctionComponent, ReactElement } from 'react';
import { IMenuItem } from '../../Interfaces';
import '../../Styles/Components/Menu/MenuItem.css';
import AddIcon from '@mui/icons-material/Add';

export const LayerMenuItem: FunctionComponent<IMenuItem> = (props): ReactElement => {

    return (
        <div className={`menuItem ${props.className}`}>
            <div className='itemTitle' onClick={props.secondaryAction}>{props.itemTitle}</div>
            {
                props.primaryAction && <AddIcon className='addLayer' onClick={props.primaryAction}/>
            }
        </div>
    );
}