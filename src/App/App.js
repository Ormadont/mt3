import React, { Component } from 'react';
import styles from './App.module.css';

import Expression from '../Expression/Expression';
import AllExpressions from '../AllExpressions/AllExpressions';
// import AddExression from '../AddExression/AddExression';
import {getExprs} from '../stuff/modules';

class App extends Component {
  
  initMainFactor =  Math.floor(Math.random()*8)+1;
  state = {
    mainFactor: this.initMainFactor,
    expressions: getExprs(this.initMainFactor, 1, 9), // получить и установить выражения
    expCurNum: 0,
    userInput: '',
    tempFactor1: 0, tempFactor2: 0,
    showedAllExpressions: false,
    receivedRightAnswer: false,
    scores: 0,
  }             

  appDiv = null;
  setAppDiv = element => this.appDiv = element;
  focusAppDiv = () => {
    if (this.appDiv) this.appDiv.focus()
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
      <div className = {styles.app}
        ref = {this.setAppDiv}
        onKeyDown={this.rightAnswerHandler} // верный ответ принимается по нажатию клавиши
        tabIndex="0"
      >
        {/* header */}
        <header className={styles.center}>
          <p>Умножение на {this.state.mainFactor}</p>
        </header>
        
        {/* board */}
        <section className = {styles.center}>
          <Expression
            expressions={this.state.expressions}
            expCurNum={this.state.expCurNum}
            userInput={this.state.userInput}
            receivedRightAnswer={this.state.receivedRightAnswer}
            checkAnswer={this.checkAnswer_handleChange} 
          />
        </section>

        {/* footer */}
        <footer>
          <button onClick={this.nextEpression_handleClick}>Другое выражение</button>
          {/* <AddExression
            factor1={this.state.tempFactor1}
            factor2={this.state.tempFactor2}
            addExp={this.addExpression_handleSubmit.bind(this)}
            changeFactor={this.changeTempFactorX_handleChange.bind(this)}
          /> */}
          {/* <button onClick={this.delCurExpression_handleClick}>Удалить текущее выражение</button> */}
          <button onClick={this.showHideAnswer_handleClick} >Показать/скрыть ответ</button>
          <AllExpressions
            showedAll={this.state.showedAllExpressions}
            expressions={this.state.expressions}
            showHide={this.showHideExpressions_handleClick} />
        </footer>

        
        {/* journal */}
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
      alert('Это последнее');
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

  nextEpression_handleClick = () => {
    const expressions = [...this.state.expressions];
    const index = this.state.expCurNum;
    if (expressions[index].showedPart !== '') {
      expressions[index].hidedPart = expressions[index].showedPart;
      expressions[index].showedPart = '';
    }
      this.setState({userInput:''});
      this.setState({expressions: expressions});
      this.setState({expCurNum: Math.floor(Math.random()*this.state.expressions.length)});
  }
  
  checkAnswer_handleChange = event => {
    
    // if (event.keyCode === 13) { // нажата клавиша Enter
    //     alert('Требуется проверка ответа?')
    // }
    let rightAnswer = 0;
    const expressions = [...this.state.expressions];
    const index = this.state.expCurNum;
    const expression = expressions[index];
    switch (expression.hidedPart) {
      case 'factor1':
        rightAnswer = expression.factor1;
        break;
      case 'factor2':
        rightAnswer = expression.factor2;
        break;
      case 'result':
        rightAnswer = expression.factor1*expression.factor2;
        break;
      default:
        break;
    }
    // правильный ответ?
    if (parseInt(event.target.value) === rightAnswer) {
      // ответ верный: 
      // сбросить текущее значение ввод
      this.setState({userInput: ''})
      
      // показать ответ, 
      // убрать поле ввода, 
      this.showHideAnswer_handleClick();
      
      // отметить факт верного выражения
      this.setState({receivedRightAnswer: true})
      
      // // удалить данное выражение, но не сразу! // условие - включено в настройках?
      // setTimeout(() => {
      //   this.delCurExpression_handleClick();
      //   this.setState({receivedRightAnswer: false})
      // }, 3000);

      this.focusAppDiv();

    } else {
      
      // верный ответ не получен, продолжаем ввод
      this.setState({userInput: event.target.value})
    }
    // console.log(event.target.value);
    
  }

  rightAnswerHandler = event => {
    if ((event.key === "Enter") && (this.state.receivedRightAnswer)) { // добавить условие - включено в настройках?
      this.delCurExpression_handleClick();
      this.setState({ receivedRightAnswer: false })
    }
  }

}

export default App;
