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
      </div>
    );
  }
}

export default App;
