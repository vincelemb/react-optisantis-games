import React from 'react';
import ReactDom from 'react-dom';
import './styles/index.scss';

import Main from './Main';

import { TimerProvider } from '@optisantis/outil-global/context/TimerContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LevelProvider } from './contexts/LevelContext';

function App() {
    return (
        <TimerProvider>
            <LevelProvider>
                <ThemeProvider>
                    <Main />
                </ThemeProvider>
            </LevelProvider>
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
