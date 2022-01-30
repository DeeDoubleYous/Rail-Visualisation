import { FunctionComponent, ReactElement } from 'react';

import { IMenu } from '../../Interfaces';
import '../../Styles/Components/Menu/Menu.css';

export const Menu: FunctionComponent<IMenu> = (props): ReactElement => {
    return (
        <div className={props.className} id='menu'>
            {
                //props.items.map(item => {
                //    return (
                //        item
                //)})
                props.children
            }
        </div>    
    )
}