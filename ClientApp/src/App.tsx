import { FunctionComponent, ReactElement, useState } from 'react';
import { Layer } from 'maptalks';

import DWMap from './Screens/DWMap';
import { Menu, LayerMenuItem } from './Components';
import { ILayerMenuItem } from './Interfaces';
import './Styles/App.css';

const App: FunctionComponent = (): ReactElement => {

    const [layers, setLayers] = useState<Layer[]>([]);

    const addLayer = (layer: Layer): void => {
        setLayers(layers.concat(layer));
    };

    const removeLayer = (layer: Layer): void => {
        setLayers(layers.filter(item => item !== layer));
    }

    const exampleLayers: ReactElement<ILayerMenuItem>[] = [];

    for (let i = 0; i < 20; i++) {
        exampleLayers.push(
            <LayerMenuItem key={`${i}`} className={`${i}`} addLayer={addLayer} removeLayer={removeLayer} itemTitle={`I am ${i}`} />
         );
    }

    return (
        <div id='appContianer'>
            <DWMap className='map' layers={layers} />
            <Menu className='menu' items={exampleLayers}/>
        </div>
    );
};

export default App;