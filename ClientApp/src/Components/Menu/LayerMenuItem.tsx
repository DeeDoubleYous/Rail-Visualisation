import { FunctionComponent, ReactElement } from 'react';
import '../../Styles/Components/Menu/MenuItem.css';
import AddIcon from '@mui/icons-material/Add';

interface IMenuItem {
    className: string,
    itemTitle: string,
    primaryAction?: () => void,
    secondaryAction?: () => void,
}

export const LayerMenuItem: FunctionComponent<IMenuItem> = (props): ReactElement => {

    return (
        <div className={`menuItem ${props.className}`}>
            <div className='itemTitle' onClick={props.secondaryAction}>{props.itemTitle}</div>
            {
                props.primaryAction && <AddIcon className='primaryAction' onClick={props.primaryAction}/>
            }
        </div>
    );
}