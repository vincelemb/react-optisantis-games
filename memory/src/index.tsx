import React from 'react';
import ReactDom from 'react-dom';
import Main from './Main';
import { TimerProvider } from './context/TimerContext';

function App() {
    return (
        <TimerProvider>
            <Main />
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

render()