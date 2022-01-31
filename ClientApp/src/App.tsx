import { FunctionComponent, ReactElement, useState } from 'react';
import { Layer } from 'maptalks';

import DWMap from './Screens/DWMap';
import { LayerMenuItem } from './Components';
import { ILayerMenuItem } from './Interfaces';
import { Routing } from './Layers/Routing';
import './Styles/App.css';

const App: FunctionComponent = (): ReactElement => {

    const routing = new Routing('route', '1');

    const exampleLayers: ReactElement<ILayerMenuItem>[] = [];

    for (let i = 0; i < 20; i++) {
        exampleLayers.push(
            <LayerMenuItem key={`${i}`} className={`${i}`} itemTitle={`I am ${i}`}/>
         );
    }

    return (
        <div id='appContianer'>
            <DWMap className='map' />
        </div>
    );
};

export default App;