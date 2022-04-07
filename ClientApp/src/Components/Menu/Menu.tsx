import { FunctionComponent, ReactElement } from 'react';

import '../../Styles/Components/Menu/Menu.css';

interface IMenu {
    id: string,
    className?: string
}

export const Menu: FunctionComponent<IMenu> = (props): ReactElement => {
    return (
        <div id={props.id} className={ `menu${props.className ? ` ${props.className}` : ''}` } >
            {
                props.children
            }
        </div>
    )
}