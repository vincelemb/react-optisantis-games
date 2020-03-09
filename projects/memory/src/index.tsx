import React from 'react';
import ReactDom from 'react-dom';

import { TimerProvider } from '@optisantis/outil-global/context/TimerContext';
import { GameProvider } from './contexts/GameContext';
import { RecordsProvider } from './contexts/RecordsContext';

import './styles/index.scss';
import Main from './Main';

function App() {
    return (
        <TimerProvider>
            <RecordsProvider>
                <GameProvider>
                    <Main />
                </GameProvider>
            </RecordsProvider>
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
