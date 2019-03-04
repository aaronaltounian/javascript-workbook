import React, { Component } from 'react';
import './App.css';
import Contacts from './Contacts.js';
import Header from './Header.js';

class App extends Component {
  
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Contacts />
        </div>
      </div>
    );
  }
}

export default App;
