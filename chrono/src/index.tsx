import React from 'react';
import ReactDom from 'react-dom';
import Main from './Main';
import { TimerProvider } from './context/TimerContext';
import { CountdownProvider } from '../../context/CountdownContext';

function App() {
    return (
        <CountdownProvider>
            <TimerProvider>
                <Main />
            </TimerProvider>
        </CountdownProvider>
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
