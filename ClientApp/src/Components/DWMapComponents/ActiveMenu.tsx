import { FunctionComponent, ReactElement } from 'react';
import { ILayer } from '../../Interfaces';
import { LayerMenuItem, Menu } from '../Menu';

export interface IActiveMenu {
    activeLayers: ILayer[],
    removeLayer: (layer: ILayer) => void,
}

export const ActiveMenu: FunctionComponent<IActiveMenu> = (props): ReactElement => {
    return (
        <Menu className='activeMenu'>
            <div className='activeTitle'>Active Layers</div>
            <div className='activeLayers'>
                {
                    props.activeLayers.map(layer => {
                        return (
                            <LayerMenuItem className={layer.className} itemTitle={layer.getLayerTitle()} primaryAction={() => {
                                props.removeLayer(layer);
                            }} />   
                        );
                    })
                }
            </div>
        </Menu>
   );
};