import React, { Component } from 'react';
import './App.css';

import Signs from './Signs/Signs'

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Один символ</p>
        <Signs 
          char1 = 'A'
        />
        <p>Два символа</p>
        <Signs 
          char1 = '1'
          char2 = '2'
        />
        <p>Нет символов</p>
        <Signs 
        />
        
      </div>
    );
  }
}

export default App;
