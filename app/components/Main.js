import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Dashboard from './Dashboard';

export const Main = React.createClass({
    render: function() {
        return (
            <Router>
                <div>
                    <ul>
                        <li></li>
                        <li>Messages</li>
                    </ul>

                    <Route pattern="/" component={Dashboard}/>
                </div>
            </Router>
        );
    }
});

export default Main;
