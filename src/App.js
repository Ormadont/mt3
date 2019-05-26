import React, { Component } from 'react';
import styles from './App.module.css';

// import Signs from './2 BaseBlock/Expression/Signs/Signs' 
import Expression from './Expression/Expression' 

class App extends Component {
  state = {
    scores: 0,
    expCurNum: Math.floor(Math.random()*4),
    expressions: [
      {factor1: 1, factor2: 2, hidedPart: 'factor1', showedPart: '', key:'1'},
      {factor1: 2, factor2: 3, hidedPart: 'factor2', showedPart: '', key:'2'},
      {factor1: 3, factor2: 4, hidedPart: 'result', showedPart: '', key:'3'},
      {factor1: 13, factor2: 14, hidedPart: 'factor2', showedPart: '', key:'4'},
    ],
    tempFactor1: 0, tempFactor2: 0,
    showAllExpressions: false,
  }
  showHideExpressions_handleClick = () => {
    const doesShow = this.state.showAllExpressions;
    this.setState({showAllExpressions: !doesShow});
  }
  changeTempFactorX_handleChange = event => {
    (event.target.name === 'factor1') ? this.setState({tempFactor1: event.target.value}) : this.setState({tempFactor2: event.target.value}) 
  }
  addExpression_handleSubmit = event => {
    const expressions = [...this.state.expressions];
    let rndHidedPart = '';
    switch (Math.floor(Math.random()*3)) {
      case 0:
        rndHidedPart = 'factor1';
        break;
      case 1:
        rndHidedPart = 'factor2';
        break;
      default:
          rndHidedPart = 'result';
        break;
    }
    const key = `addedManually${expressions.length.toString()}`;
    const expression = {
      factor1: parseInt(this.state.tempFactor1), 
      factor2: parseInt(this.state.tempFactor2), 
      hidedPart: rndHidedPart,
      showedPart: '',
      key: key,
    }
    expressions.push(expression);
    event.preventDefault(); //не дать выполнить действие по умолчанию - обновить страницу
    if ((expression.factor1 === 0) || (expression.factor2 === 0))
      alert("Множитель не должен быть равен 0")
    else if (isNaN(expression.factor1) || isNaN(expression.factor1))
      alert("Множитель должен быть числом")
    else
      this.setState({ expressions: expressions });
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
          key={expression.key}
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
          key = {this.state.expressions[expNum].key}
        />
        <button onClick={this.startAgain_handleClick}>Начать с начала</button>
        
        <div> 
          <button onClick={this.showHideExpressions_handleClick}>Показать все выражения</button>
          {expressions}
        </div>
        
        <form autoComplete="off" onSubmit={this.addExpression_handleSubmit.bind(this)}>
          <span>Первый множитель</span>
          <input 
            name = "factor1"
            value={this.state.tempFactor1} 
            onChange={this.changeTempFactorX_handleChange.bind(this)}/>
          <span>Второй множитель</span>
          <input 
            name = "factor2"
            value={this.state.tempFactor2} 
            onChange={this.changeTempFactorX_handleChange.bind(this)}/>
          <input 
            type="submit" 
            value="Добавить выражение"
          />
        </form>
     
        <button onClick={this.delCurExpression_handleClick}>Удалить текущее выражение</button>
      
      </div>
    );
  }

  delCurExpression_handleClick = () => {
    if (this.state.expressions.length > 1) {
      const expressions = [...this.state.expressions];
      const delEx = expressions.splice(this.state.expCurNum,1);
      this.setState({expressions:expressions});
      // console.log(`del: ${delEx[0].key}`)
      this.setState({expCurNum: Math.floor(Math.random()*(this.state.expressions.length-1))});
    } else {
      alert('Осталось только одно выражение');
    }

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
    const expressions = [...this.state.expressions];
    const expNum = this.state.expCurNum;
    if (expressions[expNum].showedPart !== '') {
      expressions[expNum].hidedPart = expressions[expNum].showedPart;
      expressions[expNum].showedPart = '';
      this.setState({expressions: expressions});
      this.setState({expCurNum: Math.floor(Math.random()*this.state.expressions.length)});
    }
  }
}

export default App;
