import { FunctionComponent, ReactElement } from 'react';
import { ILayer } from '../../Interfaces';
import { LayerMenuItem, Menu } from '../Menu';
import '../../Styles/Components/DWSMapComponents/ActiveMenu.css';


export interface IActiveMenu {
    activeLayers: ILayer[],
    removeLayer: (layer: ILayer) => void,
    changeSelectedLayer: (layer: ILayer) => void,
}

export const ActiveMenu: FunctionComponent<IActiveMenu> = (props): ReactElement => {
    return (
        <Menu className='activeMenu'>
            <div className='activeTitle'>Active Layers</div>
            <div className='activeLayers'>
                {
                    props.activeLayers.map(layer => {
                        return (
                            <LayerMenuItem key={layer.id} className={`activeMenuItem ${layer.className} ${ layer.getSelected() ? 'selected' : '' }`} itemTitle={layer.getLayerTitle()}
                                primaryAction={() => {
                                    props.removeLayer(layer);
                                }}
                                secondaryAction={() => {
                                    props.changeSelectedLayer(layer);
                                }}
                            />   
                        );
                    })
                }
            </div>
        </Menu>
   );
};