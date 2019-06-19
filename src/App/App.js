import React, { Component } from 'react';
import styles from './App.module.css';

import Options from '../Options/Options';
import Expression from '../Expression/Expression';
import AllExpressions from '../AllExpressions/AllExpressions';
// import AddExression from '../AddExression/AddExression';
import {getExprs, getFactors} from '../stuff/modules';

class App extends Component {
  mainFactors = [];
  constructor(props) {
    super(props);
    this.state = {
      mainFactor: -1,
      expressions: [], // получить и установить выражения
      expCurNum: 0,
      userInput: '',
      tempFactor1: 0, tempFactor2: 0,
      showedAllExpressions: false,
      receivedRightAnswer: false,
      scores: 0,
      options: {
        show: false,
        missEnter: false,
        // режим с ограничением на время ?
        // скрыите только произведения (result) - простой режим ?
        // другие внешние виды
      }
    }
    this.mainFactors = getFactors(9,1);
    this.state.mainFactor = this.mainFactors.splice(0,1)[0]; // текущий основной множитель
    this.state.expressions = getExprs(this.state.mainFactor, 1, 9); // выражения
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

  changeMainFactor_handleChange = event => {
    const newMainFactor = event.target.value;
    if ((0 < newMainFactor) && (newMainFactor < 10)) {
      this.setState({
        userInput:'',
        receivedRightAnswer: false,
        mainFactor: newMainFactor,
        expressions: getExprs(newMainFactor, 1, 9)
      });
     }
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
        onKeyDown={this.rightAnswerHandler_enterPress} // верный ответ принимается по нажатию клавиши
        tabIndex="0"
      >
        {/* header */}
        <header className={styles.center}>
          <label>Основной множитель</label>
          <input value={this.state.mainFactor} onChange={this.changeMainFactor_handleChange} type="number"></input>
          <Options 
            // missEnter={this.state.options.missEnter}
            options={this.state.options}
            // showOptions={this.state.options.show}
            changeRadioButton = {this.missEnterOptionsHandler_radioButton}
          />
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
          <button onClick={this.delCurExpression_handleClick}>Удалить текущее выражение</button>
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
      expressions.splice(this.state.expCurNum,1);
      this.setState({expressions:expressions});
      this.setState({expCurNum: Math.floor(Math.random()*(this.state.expressions.length-1))});
    } else if (this.mainFactors.length>0) {
      const mainFactor = this.mainFactors.splice(0,1)[0];
      const expressions = getExprs(mainFactor, 1, 9);
      this.setState({
        mainFactor: mainFactor,
        expressions: expressions,
        expCurNum: Math.floor(Math.random()*(expressions.length-1)),
      });
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
    if (parseInt(event.target.value) === parseInt(rightAnswer)) {
      // ответ верный: 
      // сбросить текущее значение ввод
      this.setState({userInput: ''})
      
      // показать ответ, 
      // убрать поле ввода, 
      this.showHideAnswer_handleClick();
      
      // отметить факт верного выражения
      this.setState({receivedRightAnswer: true})
      
      // удалить данное выражение, но не сразу! // условие - включено в настройках?
      if (this.state.options.missEnter) {
        setTimeout(() => {
          this.delCurExpression_handleClick();
          this.setState({ receivedRightAnswer: false })
        }, 3000);
      }
      this.focusAppDiv();
    } else {     
      // верный ответ не получен, продолжаем ввод
      this.setState({userInput: event.target.value})
    }
  }

  rightAnswerHandler_enterPress = event => {
    if ((event.key === "Enter") && (this.state.receivedRightAnswer) && (!this.state.options.missEnter)) { // добавить условие - включено в настройках?
      this.delCurExpression_handleClick();
      this.setState({ receivedRightAnswer: false })
    }
  }

  missEnterOptionsHandler_radioButton = e => {
    let options = {...this.state.options};
    (e.target.value === "miss Enter") ? options.missEnter = true : options.missEnter = false;
    this.setState({options: options});
  }

}

export default App;
