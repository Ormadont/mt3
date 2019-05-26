import React, { Component } from 'react';
import styles from './App.module.css';

// import Signs from './2 BaseBlock/Expression/Signs/Signs' 
import Expression from './Expression/Expression' 

class App extends Component {
  state = {
    scores: 0,
    expCurNum: Math.floor(Math.random()*4),
    expressions: [
      {factor1: 1, factor2: 2, hidedPart: 'factor1', showedPart: ''},
      {factor1: 2, factor2: 3, hidedPart: 'factor2', showedPart: ''},
      {factor1: 3, factor2: 4, hidedPart: 'result', showedPart: ''},
      {factor1: 13, factor2: 14, hidedPart: 'factor2', showedPart: ''},
    ],
    showAllExpressions: false,
  }
  showHideExpressions = () => {
    const doesShow = this.state.showAllExpressions;
    this.setState({showAllExpressions: !doesShow});
  }

  render() {
    let expNum = this.state.expCurNum;
    let expressions = null;
    if (this.state.showAllExpressions) {
      expressions = this.state.expressions.map( expression => 
        <Expression
          factor1={expression.factor1}
          factor2={expression.factor2}
          hidedPart={expression.hidedPart}
        />
      )
    }

    return (
      <div className = {styles.app}>
        <h1>Таблица умножения</h1>
        <button onClick={this.showAnswer_handleClick} >Показать ответ</button>
        <Expression 
          factor1 = {this.state.expressions[expNum].factor1}
          factor2 = {this.state.expressions[expNum].factor2}
          hidedPart = {this.state.expressions[expNum].hidedPart}
        />
        <button onClick={this.startAgain_handleClick}>Начать с начала</button>
        <div>
          <button onClick={this.showHideExpressions}>Показать все выражения</button>
          {expressions}
        </div>
      </div>
    );
  }
  
  // измениние состояния - в текущем выражении убрать скрытый элемент, 
  // сохранив информацию о нём
  showAnswer_handleClick = () => {
    const expNum = this.state.expCurNum;
    const expressions = [...this.state.expressions];
    if (expressions[expNum].hidedPart !== 'nothing') {
      expressions[expNum].showedPart = expressions[expNum].hidedPart;
      expressions[expNum].hidedPart = 'nothing';
      this.setState({expressions: expressions});
    }
  }

  startAgain_handleClick = () => {
    const expNum = this.state.expCurNum;
    const expressions = [...this.state.expressions];
    if (expressions[expNum].showedPart !== '') {
      expressions[expNum].hidedPart = expressions[expNum].showedPart;
      expressions[expNum].showedPart = '';
      this.setState({expressions: expressions});
      this.setState({expCurNum: Math.floor(Math.random()*4)});
    }
  }
}

export default App;
