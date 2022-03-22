import {FunctionComponent, ReactElement} from 'react';
import '../../Styles/Components/App/NavBar.css';

interface INavBar {
    className: string,
    screens: {
        screen: ReactElement,
        screenName: string
    }[],
    setScreen: (screen: ReactElement) => void
}

export const NavBar: FunctionComponent<INavBar> = (props): ReactElement => {
    return (
        <nav className={`navBar ${props.className}`}>
            {
                props.screens.map(screen =>
                    <button key={screen.screenName} className='screenButton' onClick={() => props.setScreen(screen.screen)}>{screen.screenName}</button>
                )
            }
        </nav>
    );
}