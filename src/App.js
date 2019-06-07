import React, { Component } from 'react';
import styles from './App.module.css';

import AllExpressions from './AllExpressions/AllExpressions';
import PointedExpression from './PointedExpression/PointedExpression';
import AddExression from './AddExression/AddExression';
import {getExprs} from './stuff/modules';

class App extends Component {
  state = {
    scores: 0,
    expCurNum: 0,
    expressions: getExprs(3, 1, 10),
    tempFactor1: 0, tempFactor2: 0,
    showedAllExpressions: false,
  }
  
  showHideExpressions_handleClick = () => {
    const doesShow = this.state.showedAllExpressions;
    this.setState({showedAllExpressions: !doesShow});
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
    return (
      <div className = {styles.app}>
        <h1>Таблица умножения</h1>
        <button onClick={this.showHideAnswer_handleClick} >Показать/скрыть ответ</button>
        <PointedExpression
          expressions={this.state.expressions}
          i={this.state.expCurNum}/>
        <button onClick={this.startAgain_handleClick}>Начать с начала</button>
        <br/>
        <AllExpressions
          showedAll={this.state.showedAllExpressions}
          expressions={this.state.expressions}
          showHide={this.showHideExpressions_handleClick} />
        <AddExression
          factor1={this.state.tempFactor1}
          factor2={this.state.tempFactor2}
          addExp={this.addExpression_handleSubmit.bind(this)}
          changeFactor={this.changeTempFactorX_handleChange.bind(this)}
          />
        <button onClick={this.delCurExpression_handleClick}>Удалить текущее выражение</button>
      </div>
    );
  }

  delCurExpression_handleClick = () => {
    if (this.state.expressions.length > 1) {
      const expressions = [...this.state.expressions];
      // const delEx = 
      expressions.splice(this.state.expCurNum,1);
      this.setState({expressions:expressions});
      // console.log(`del: ${delEx[0].key}`)
      this.setState({expCurNum: Math.floor(Math.random()*(this.state.expressions.length-1))});
    } else {
      alert('Осталось только одно выражение');
    }

  }
  
  // измениние состояния - в текущем выражении убрать скрытый элемент, 
  // сохранив информацию о нём
  showHideAnswer_handleClick = () => {
    const index = this.state.expCurNum;
    const expressions = [...this.state.expressions];
    if (expressions[index].hidedPart !== 'nothing') {
      expressions[index].showedPart = expressions[index].hidedPart;
      expressions[index].hidedPart = 'nothing';
    } else  {
      expressions[index].hidedPart = expressions[index].showedPart;
      expressions[index].showedPart = "";
    }
    this.setState({expressions: expressions});
  }

  startAgain_handleClick = () => {
    const expressions = [...this.state.expressions];
    const index = this.state.expCurNum;
    if (expressions[index].showedPart !== '') {
      expressions[index].hidedPart = expressions[index].showedPart;
      expressions[index].showedPart = '';
    }
      this.setState({expressions: expressions});
      this.setState({expCurNum: Math.floor(Math.random()*this.state.expressions.length)});
  }
}

export default App;
