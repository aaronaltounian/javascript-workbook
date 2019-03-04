import React, { Component } from 'react';
import './App.js';

let Header = (props) => {
    let reload = () => {
        window.location.reload();
    }
    return (
        <div className="header">
            <h1>Super Cool Contacts!</h1>
            <button onClick={reload}>Import New Contacts</button>
        </div>
    )
}

export default Header;