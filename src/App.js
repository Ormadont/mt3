import React, { Component } from 'react';
import styles from './App.module.css';

import Signs from './Signs/Signs'

class App extends Component {
  render() {
    return (
      <div className = {styles.app}>
        <p>Один символ</p>
        <Signs 
          chars = 'A'
        />
        <p>Два символа</p>
        <Signs 
          chars = '12'
        />
        <p>Нет символов</p>
        <Signs 
        />
        
      </div>
    );
  }
}

export default App;
