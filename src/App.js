import React, { Component } from 'react';
import styles from './App.module.css';

// import Signs from './2 BaseBlock/Expression/Signs/Signs' 
import Expression from './Expression/Expression' 

class App extends Component {
  state = {
    scores: 0,
    expCurNum: Math.floor(Math.random()*3),
    expressions: [
      {factor1: 1, factor2: 2, hidedPart: 'factor1'},
      {factor1: 2, factor2: 3, hidedPart: 'factor2'},
      {factor1: 3, factor2: 4, hidedPart: 'result'},
    ]
  }
  showAnswer_handleClick = () => {
    const expNum = this.state.expCurNum;
    const expressions = [...this.state.expressions];
    expressions[expNum].hidedPart = 'nothing';
    this.setState({expressions: expressions});
  }
  render() {
    let expNum = this.state.expCurNum;
    return (
      <div className = {styles.app}>
        <h1>Таблица умножения</h1>
        <button onClick={this.showAnswer_handleClick} >Показать ответ</button>
        <Expression 
          factor1 = {this.state.expressions[expNum].factor1}
          factor2 = {this.state.expressions[expNum].factor2}
          hidedPart = {this.state.expressions[expNum].hidedPart}
        />
      </div>
    );
  }
}

export default App;
