import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main';

function renderApp() {
    ReactDOM.render(
        <Main/>,
        document.getElementById('root')
    );
}

renderApp(); // Renders App on init
