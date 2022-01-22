import { FunctionComponent, ReactElement } from 'react';
import DWMap from './Screens/DWMap';
import './Styles/App.css';

const App: FunctionComponent = (): ReactElement => {
    return (
        <div id='appContianer'>
            <DWMap className='map' />
        </div>
    );
};

export default App;