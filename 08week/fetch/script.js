'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Cool</h1>
            </div>
        )
    }
}

ReactDOM.render( <App />, document.getElementById('fetch') );

fetch('https://api.github.com/users')
    .then(response => response.json())
    .then(data => console.log(data));