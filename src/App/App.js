import React, { Component } from 'react';
import styles from './App.module.css';

import BackgroundScene from '../backgroundScene/backgroundScene';
import ResultOfChecking from '../ResultOfChecking/ResultOfChecking';
import Options from '../Options/Options';
import Expression from '../Expression/Expression';
import AllExpressions from '../AllExpressions/AllExpressions';
import AddExression from '../AddExression/AddExression';
import Timer from '../Timer/Timer';
import { getExprs as getExpressions, getFactors } from '../stuff/modules';

class App extends Component {
  mainFactors = []; // основные множители
  constructor(props) {
    super(props);
    this.state = {
      mainFactor: -1,
      expressions: [],
      expCurNum: 0,
      userInput: '',
      tempFactor1: 0, tempFactor2: 0,

      receivedRightAnswer: false,
      seconds: 10, // время в режиме проверки знанний
      checkKnowledgeIsEnd: false,
      rightAnswerCount: 0,
      errorsCount: 0,
      options: {
        show: false,
        showedAllExpressions: false,
        missEnter: false,
        checkKnowledge: false, // режим проверки знаний
        showAddFunc: false,
        leftLimit: 1,
        rightLimit: 9,
        // скрытие только произведения (result) - простой режим ?
        // другие внешние виды
      }
    }
    this.mainFactors = getFactors(9, 1);
    this.state.mainFactor = this.mainFactors.splice(0, 1)[0]; // текущий основной множитель
    this.state.expressions = getExpressions(this.state.mainFactor, this.state.options.leftLimit, this.state.options.rightLimit); // выражения
  }

  // Получить новые выражения
  getExps = mainFactor => getExpressions(mainFactor, this.state.options.leftLimit, this.state.options.rightLimit);

  showHideAddFunc_handleClick = () => this.toggleOption("showAddFunc");
  showHideExpressions_handleClick = () => this.toggleOption("showedAllExpressions");
  showHideOptions_handleClick = () => this.toggleOption("show");

  changeMainFactor_handleChange = event => {
    let newMainFactor;
    if (event === undefined) {
      newMainFactor = Math.floor(Math.random() * 9) + 1;
    } else {
      newMainFactor = event.target.value;
    }
    const expressions = this.getExps(newMainFactor);
    if ((0 < newMainFactor) && (newMainFactor < 10)) {
      this.setState({
        userInput: '',
        receivedRightAnswer: false,
        mainFactor: newMainFactor,
        expressions: expressions,
      });
    }
  }

  changeTempFactorX_handleChange = event => {
    (event.target.name === 'factor1') ? this.setState({ tempFactor1: event.target.value }) : this.setState({ tempFactor2: event.target.value })
  }

  addExpression_handleSubmit = event => {
    const expressions = [...this.state.expressions];
    let rndHidedPart = '';
    switch (Math.floor(Math.random() * 3)) {
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

  nextCheck_handleClick_ResBtn = () => {
    this.setState({
      checkKnowledgeIsEnd: false,
      seconds: 10,
      errorsCount: 0,
      rightAnswerCount: 0,
    });
  }

  // вернуться к обычному режиму
  endCheck_handleClick_ResBtn = () => {
    this.setState({
      checkKnowledgeIsEnd: false,
      seconds: 10,
      errorsCount: 0,
      rightAnswerCount: 0,
    });
    this.setState(prevState => ({
      options: { ...prevState.options, checkKnowledge: false }
    }));
  }

  tick() {
    if (!this.state.checkKnowledgeIsEnd) {
      if (this.state.options.checkKnowledge && this.state.seconds > 0 && !this.state.options.show) {
        this.setState(
          prevState => ({ seconds: prevState.seconds - 1 })
        )
      } else if (this.state.seconds === 0) {
        this.setState({
          checkKnowledgeIsEnd: true,
        });
        this.changeMainFactor_handleChange(); // получить новый основной множитель
        // ?! показать статистику
        // alert('проверка окончена');       
      }
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const timer = <span>{this.state.seconds}</span>
    const options =
      <>
        <button className={styles.btn} onClick={this.showHideOptions_handleClick}>Настройки</button>
        {this.state.options.show ?
          <BackgroundScene>
            <Options
              options={this.state.options}
              missEnter_handler={this.missEnter_handleChange_optRBtn}
              checkKnowledge_handler={this.checkKnowledge_handleChange_optRBtn}
              showAddFunc={this.showHideAddFunc_handleClick}
            />
            <button className={styles.closeBtn} onClick={this.showHideOptions_handleClick}>Закрыть</button>
          </BackgroundScene> : null}
      </>
    let addFucn = this.state.options.showAddFunc ? (
      <>
        <button onClick={this.nextEpression_handleClick}>Другое выражение</button>
        <AddExression
          factor1={this.state.tempFactor1}
          factor2={this.state.tempFactor2}
          addExp={this.addExpression_handleSubmit.bind(this)}
          changeFactor={this.changeTempFactorX_handleChange.bind(this)}
        />
        <button onClick={this.delCurExpression_handleClick}>Удалить текущее выражение</button>
        <button onClick={this.showHideAnswer_handleClick} >Показать/скрыть ответ</button>
        <AllExpressions
          showedAll={this.state.options.showedAllExpressions}
          expressions={this.state.expressions}
          showHide={this.showHideExpressions_handleClick} />
      </>
    ) : null;
    const resultsOfChecking =
      <>
        {this.state.checkKnowledgeIsEnd ?
          <BackgroundScene>
            <ResultOfChecking
              errorsCount={this.state.errorsCount}
              rightAnswerCount={this.state.rightAnswerCount}

              curMainFactor={this.state.mainFactor}
              changeMainFactor={this.changeMainFactor_handleChange}
              nextCheck={this.nextCheck_handleClick_ResBtn}
              endCheck={this.endCheck_handleClick_ResBtn}
            /> 
          </BackgroundScene>
        : null}
      </>
    const sessionStatus =
      <>
        <div className={styles.sessionStatus}>
          <span>Выражений: {this.state.expressions.length}</span>
          <span>Основных множителей: {this.mainFactors.length + 1}</span>
        </div>
      </>
    return (
        <div className={styles.app} //AppDiv !
          ref={appRef => { this.appRef = appRef }}
          onKeyDown={this.nextExpr_handleKeyDown_AppDiv} // верный ответ принимается по нажатию клавиши
          tabIndex="0"
        >
        {resultsOfChecking}
        {/* header */}
        <header className={styles.center}>
          <Timer
            checkKnowledge={this.state.options.checkKnowledge}
            timer={timer}
          />
          <label>Основной множитель</label>
          <input value={this.state.mainFactor} onChange={this.changeMainFactor_handleChange} type="number"></input>
          {options}
        </header>

        {/* board */}
        <section className={styles.center}>
          <Expression
            expressions={this.state.expressions}
            expCurNum={this.state.expCurNum}
            userInput={this.state.userInput}
            receivedRightAnswer={this.state.receivedRightAnswer}
            checkAnswer={this.checkAnswer_handleKeyUp}
            changeAnswer={this.changeAnswer_handleChange}
            checkKnowledgeIsEnd={this.state.checkKnowledgeIsEnd}
            checkKnowledge={this.state.options.checkKnowledge}
            seconds={this.state.seconds}
          />
        </section>

        {/* footer */}
        <footer>
          {sessionStatus}
          {/* дополнительный функционал */}
          {addFucn}
        </footer>
        {/* journal */}
      </div>
    );
  }

  delCurExpression_handleClick = () => {
    if (this.state.expressions.length > 1) {
      const expressions = [...this.state.expressions];
      expressions.splice(this.state.expCurNum, 1);
      const expNextNum = Math.floor(Math.random() * expressions.length);
      this.setState({
        expressions: expressions,
        expCurNum: expNextNum,
      });
    } else if (this.mainFactors.length > 0 && !this.state.options.checkKnowledge) {
      const mainFactor = this.mainFactors.splice(0, 1)[0];
      const expressions = this.getExps(mainFactor);
      const expNextNum = Math.floor(Math.random() * expressions.length);
      this.setState({
        mainFactor: mainFactor,
        expressions: expressions,
        expCurNum: expNextNum,
      });
    } else if (this.state.options.checkKnowledge) {
      this.setState({ checkKnowledgeIsEnd: true })
      this.changeMainFactor_handleChange(); // получить новый основной множитель
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
    } else {
      expressions[index].hidedPart = expressions[index].showedPart;
      expressions[index].showedPart = "";
    }
    this.setState({ expressions: expressions });
  }

  nextEpression_handleClick = () => {
    const expressions = [...this.state.expressions];
    const index = this.state.expCurNum;
    if (expressions[index].showedPart !== '') {
      expressions[index].hidedPart = expressions[index].showedPart;
      expressions[index].showedPart = '';
    }
    const nextExpNum = Math.floor(Math.random() * (expressions.length));
    this.setState({
      userInput: '',
      expressions: expressions,
      expCurNum: nextExpNum,
    });
  }

  // изменение ответа
  changeAnswer_handleChange = event => this.setState({ userInput: event.target.value });

  getRightAnswer() {
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
        rightAnswer = expression.factor1 * expression.factor2;
        break;
      default:
        break;
    }
    return rightAnswer;
  }

  // проверка ответа
  checkAnswer_handleKeyUp = event => {
    let rightAnswer = this.getRightAnswer();
    if (this.state.options.checkKnowledge) { // режим проверки знаний
      if (event.key === "Enter"
        && parseInt(this.state.userInput) === parseInt(rightAnswer)
        && !this.state.checkKnowledgeIsEnd) {
        this.delCurExpression_handleClick();
        this.setState({
          userInput: '',
        });
        this.setState(prevState => ({
          seconds: prevState.seconds + 5
        }));
        this.setState(prevState => ({
          rightAnswerCount: prevState.rightAnswerCount + 1
        }));

        //  console.log('Режим проверки: ответ верный ', event.target.value);
      } else if (event.key === "Enter" && !this.state.checkKnowledgeIsEnd) {
        // ответ неправильный и нажата клавиша ввод
        this.delCurExpression_handleClick();
        this.setState({
          userInput: '',
        });
        this.setState(prevState => ({
          errorsCount: prevState.errorsCount + 1
        }));
        // ? уменьшить очки

        // ? сохранить ошибку для работы над ошибками
      }
    } else if (parseInt(event.target.value) === parseInt(rightAnswer)) { // правильный ответ?
      this.showNextEpr();
    }
  }

  showNextEpr() {
    // ответ верный: 
    // сбросить текущее значение ввод
    this.setState({ userInput: '' })

    // показать ответ, 
    // убрать поле ввода, 
    this.showHideAnswer_handleClick();

    // отметить факт верного выражения
    this.setState({ receivedRightAnswer: true })

    // удалить данное выражение, но не сразу!
    if (this.state.options.missEnter) {
      setTimeout(() => {
        this.delCurExpression_handleClick();
        this.setState({ receivedRightAnswer: false });
      }, 3000);
    }
    this.appRef.focus();
  }

  // для режима без паузы
  nextExpr_handleKeyDown_AppDiv = event => {
    if ((event.key === "Enter") && (this.state.receivedRightAnswer) && (!this.state.options.missEnter) && !this.state.options.checkKnowledge) {
      this.delCurExpression_handleClick();
      this.setState({ receivedRightAnswer: false })
    }
  }

  missEnter_handleChange_optRBtn = e => {
    const choice = e.target.value;
    this.setState(prevState => ({
      options: { ...prevState.options, missEnter: choice === "miss Enter" }
    }));
  }

  checkKnowledge_handleChange_optRBtn = e => {
    const choice = e.target.value;
    this.setState(prevState => ({
      options: { ...prevState.options, checkKnowledge: choice === "start checking" }
    }))
    this.changeMainFactor_handleChange();
    this.setState({
      seconds: 10,
      errorsCount: 0,
      rightAnswerCount: 0,
    })
  }

  toggleOption = prop => {
    this.setState(prevState => {
      const options = prevState.options;
      options[prop] = !options[prop];
      return {
        options: options,
      }
    });
  }
}


export default App;
