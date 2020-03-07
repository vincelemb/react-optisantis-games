import React from 'react';
import ReactDom from 'react-dom';
import './styles/index.scss';

import Main from './Main';

import { TimerProvider } from '@optisantis/outil-global/context/TimerContext';
import { GameProvider } from './contexts/GameContext';

function App() {
    return (
        <TimerProvider>
            <GameProvider>
                <Main />
            </GameProvider>
        </TimerProvider>
    );
}

const render = () => {
    ReactDom.render(<App />, document.getElementById('root'));
};

if (module.hot) {
    module.hot.accept('./Main', () => {
        render();
    });
}

render();
