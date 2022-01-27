import { FunctionComponent, ReactElement } from 'react';
import { IMenuItem } from '../../Interfaces';

export const MenuItem: FunctionComponent<IMenuItem> = (props): ReactElement => {
    return (
        <div className={`menuItem ${props.className}`}>
            <div className='itemTitle'>{props.itemTitle}</div>
            <button onClick={() => console.log(`Click num ${props.className}`)}>I am a button</button>
        </div>
    );
}