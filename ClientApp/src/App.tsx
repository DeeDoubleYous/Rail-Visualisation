import { FunctionComponent, ReactElement, useState } from 'react';
import { Layer } from 'maptalks';

import DWMap from './Screens/DWMap';
import StatsDashboard from './Screens/StatsDashboard';
import './Styles/App.css';

const App: FunctionComponent = (): ReactElement => {

    return (
        <div id='appContianer'>
            <StatsDashboard />
        </div>
    );
};

export default App;