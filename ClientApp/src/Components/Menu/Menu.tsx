import { FunctionComponent, ReactElement } from 'react';

import { IMenu } from '../../Interfaces';
import '../../Styles/Components/Menu/Menu.css';

export const Menu: FunctionComponent<IMenu> = (props): ReactElement => {
    return (
        <div id={props.id} className='menu' >
            {
                props.children
            }
        </div>    
    )
}