import { FunctionComponent, ReactElement, useState, useEffect } from 'react';

import DWMap from './Screens/DWMap';
import StatsDashboard from './Screens/StatsDashboard';
import { NavBar } from './Components';
import './Styles/App.css';

const App: FunctionComponent = (): ReactElement => {

    const [activeScreen, setActiveScreen] = useState<ReactElement>();
    const screens = [{
        screen: <DWMap />,
        screenName: 'Map'
    }, {
        screen: <StatsDashboard />,
        screenName: 'Stats'
     }];

    useEffect(() => {
        setActiveScreen(screens[0].screen);
    }, []);

    return (
        <div id='appContianer'>
            <NavBar className='nav' screens={screens} setScreen={setActiveScreen} />
            {
                activeScreen
            }
        </div>
    );  
};

export default App;