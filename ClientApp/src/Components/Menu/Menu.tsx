import { FunctionComponent, ReactElement } from 'react';

import { IMenu } from '../../Interfaces';
import { MenuItem } from './';
import '../../Styles/Components/Menu/Menu.css';

export const Menu: FunctionComponent<IMenu> = (props): ReactElement => {
    return (
        <div className={props.className} id='menu'>
            {
                props.layers.map(layer => {
                    return (
                        <MenuItem className={layer.className}
                            addLayer={layer.addLayer}
                            removeLayer={layer.removeLayer}
                            itemTitle={layer.itemTitle}
                            key={layer.className}
                        />
                )})
            }
        </div>    
    )
}