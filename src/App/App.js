import React, { Component } from 'react';
import styles from './App.module.css';

import BackgroundScene from '../backgroundScene/backgroundScene';
import ResultOfChecking from '../ResultOfChecking/ResultOfChecking';
import Options from '../Options/Options';
import Expression from '../Expression/Expression';
import AllExpressions from '../AllExpressions/AllExpressions';
import AddExression from '../AddExression/AddExression';
import Timer from '../Timer/Timer';
import { getExprs as getExpressions, getFactors, isMobile, mixUp } from '../stuff/modules';
import MobMainFactors from '../MobMainFactors/MobMainFactors';
import MobileSigns from '../Expression/mobileSigns/MobileSigns';

class App extends Component {
  mainFactors = []; // основные множители
  constructor(props) {
    super(props);
    this.state = {
      mainFactor: -1,
      expressions: [],
      expCurNum: 0,
      rndAnswers: [],
      userInput: '',
      tempFactor1: 0, tempFactor2: 0,
      receivedRightAnswer: false,
      seconds: 10, // время в режиме проверки знаний
      checkKnowledgeIsEnd: false,
      rightAnswerCount: 0, // количество верных ответов
      errorsCount: 0,
      isShowMMFPanel: false,
      options: {
        show: false,
        isMobileMode: true,
        showedAllExpressions: false,
        missEnter: false,
        checkKnowledge: false, // режим проверки знаний
        showAddFunc: false,
        leftLimit: 1,
        rightLimit: 9,
        // другие внешние виды
      }
    }
    this.mainFactors = getFactors(9, 1);
    this.state.mainFactor = this.mainFactors.splice(0, 1)[0]; // текущий основной множитель
    this.state.expressions = getExpressions(this.state.mainFactor, this.state.options.leftLimit, this.state.options.rightLimit); // выражения
    this.state.options.isMobileMode = isMobile.any() === null ? false : true;
    this.state.rndAnswers = this.get6Answers(this.state.expCurNum, this.state.mainFactor, this.state.expressions);
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
    this.getSetNewMainFactor(newMainFactor);
    
  }

  // expNum - номер выражения, для которого идёт расчёт ответов
  // mainFactor - значение основного множетиля текущего или нового
  get6Answers = (expNum, mainFactor, expressions) => {
    let rightAnswer = -1;
    let answers = [];
    const curExpr = expressions[expNum];

    switch(curExpr.hidedPart) {
      case 'result':
        rightAnswer = curExpr.factor1 * curExpr.factor2;
        answers = getFactors(6,1).map(x=>x*mainFactor);
        break;
      case 'factor1':
        rightAnswer = curExpr.factor1;
        answers = getFactors(6,1);
        break;
      case 'factor2':
        rightAnswer = curExpr.factor2;
        answers = getFactors(6,1);
        break;
      default:
        rightAnswer = -1;
        break;
    }
    // сформировать случайные ответы на основе главного множителя
    
        // Если набор ответов не содержит правильного ответа, 
    // то убрать один ответ, добавить правильный и перемешать.
    if (!answers.find(el=>el===rightAnswer)) { 
      answers.shift();
      answers.push(rightAnswer);
    }
    answers = mixUp(answers);
    return answers;
  }

  getSetNewMainFactor = newMainFactor => {
    const expressions = this.getExps(newMainFactor);
    if ((0 < newMainFactor) && (newMainFactor < 10)) {
      this.setState({
        userInput: '',
        receivedRightAnswer: false,
        mainFactor: newMainFactor,
        expressions: expressions,
      });
    }
    if (this.state.isShowMMFPanel) this.setState({isShowMMFPanel: false});
    if (this.state.options.isMobileMode) {
      // getAnswers();
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
    if (this.state.options.isMobileMode) {
      this.answers = this.getRndAnswers();
    } 
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
    if (this.state.options.isMobileMode) {
      this.answers = this.get6Answers();
    } 
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

  checkMobAnswer_handleClick = answer => {
    const rightAnswer = this.getRightAnswer();
    if (this.state.options.checkKnowledge) {
      console.log('right?', (answer === rightAnswer));
      if (answer === rightAnswer) {
        this.delCurExpression_handleClick();
        this.setState(prevState => ({
          seconds: prevState.seconds + 5,
          userInput: '',
          rightAnswerCount: prevState.rightAnswerCount + 1,
        }));
      } else {
        this.delCurExpression_handleClick();
        this.setState(prevState => ({
          errorsCount: prevState.errorsCount + 1,
          userInput: '',
        }));
      }
    } else {
      if (rightAnswer === answer) {
        this.setState({ receivedRightAnswer: true });
        this.showHideAnswer_handleClick();
        setTimeout(() => {
          this.delCurExpression_handleClick();
          this.setState({ receivedRightAnswer: false });
        }, 3000);
      }
    }
  }

  changeMainFactor_handleClick_mobile = selectedMainFactor => {
    this.getSetNewMainFactor(selectedMainFactor);
  }

  showHide_MobileMainFactorPanel_handleClick = () => {
    this.setState( prevState => ({
      isShowMMFPanel: !prevState.isShowMMFPanel,
    }))
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    // if (this.answers.length === 0) {
    //   this.answers = this.getRndAnswers();
    // }
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
    const mainFactor =
      <>
        <label style={{marginRight: "0.2rem"}}>Основной множитель</label>
        {this.state.isShowMMFPanel ?
            <MobMainFactors 
              mainFactors={this.mainFactors}
              changeMainFactor={this.changeMainFactor_handleClick_mobile}
            /> : null}
        {this.state.options.isMobileMode ?
          <MobileSigns
            chars={this.state.mainFactor}
            showMMFPane={() => this.setState({ isShowMMFPanel: true })}
          /> :
          <input
            value={this.state.mainFactor}
            onChange={this.changeMainFactor_handleChange}
            type="number"
          ></input>}
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
          {options}
          {mainFactor}
        </header>
        {/* board */}
        <section className={styles.center}>
            <Expression
              answers={this.state.rndAnswers}
              expressions={this.state.expressions}
              expCurNum={this.state.expCurNum}
              mainFactor={this.state.mainFactor}
              userInput={this.state.userInput}
              receivedRightAnswer={this.state.receivedRightAnswer}
              checkAnswer={this.checkAnswer_handleKeyUp_input}
              changeAnswer={this.changeAnswer_handleChange}
              checkKnowledgeIsEnd={this.state.checkKnowledgeIsEnd}
              checkKnowledge={this.state.options.checkKnowledge}
              seconds={this.state.seconds}
              isMobileMode={this.state.options.isMobileMode}
              checkMobAnswer={this.checkMobAnswer_handleClick}
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
    let expNextNum = -1;
    if (this.state.expressions.length > 1) {
      const expressions = [...this.state.expressions];
      expressions.splice(this.state.expCurNum, 1);
      expNextNum = Math.floor(Math.random() * expressions.length);
      this.setState({
        expressions: expressions,
        expCurNum: expNextNum,
        rndAnswers: this.get6Answers(expNextNum, this.state.mainFactor, expressions)
      });
    } else if (this.mainFactors.length > 0 && !this.state.options.checkKnowledge) {
      const mainFactor = this.mainFactors.splice(0, 1)[0];
      const expressions = this.getExps(mainFactor);
      expNextNum = Math.floor(Math.random() * expressions.length);
      this.setState({
        mainFactor: mainFactor,
        expressions: expressions,
        expCurNum: expNextNum,
        rndAnswers: this.get6Answers(expNextNum, mainFactor, expressions)
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
      rndAnswers: this.get6Answers(nextExpNum, this.state.mainFactor, expressions)
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
  checkAnswer_handleKeyUp_input = event => {
    const rightAnswer = this.getRightAnswer();
    if (this.state.options.checkKnowledge) { // режим проверки знаний
      if (event.key === "Enter"
        && parseInt(this.state.userInput) === parseInt(rightAnswer)  // получен верный ответ
        && !this.state.checkKnowledgeIsEnd) {
        this.delCurExpression_handleClick();
        this.setState(prevState => ({
          seconds: prevState.seconds + 5,
          userInput: '',
          rightAnswerCount: prevState.rightAnswerCount + 1,
        }));
        //  console.log('Режим проверки: ответ верный ', event.target.value);
      } else if (event.key === "Enter" && !this.state.checkKnowledgeIsEnd) {
        // ответ неправильный и нажата клавиша ввод
        this.delCurExpression_handleClick();
        this.setState(prevState => ({
          errorsCount: prevState.errorsCount + 1,
          userInput: '',
        }));
        // ? уменьшить очки

        // ? сохранить ошибку для работы над ошибками
      }
    } else if (parseInt(event.target.value) === parseInt(rightAnswer)) { // правильный ответ получен
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

    // отметить факт получения верного ответа
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
    if (this.state.options.isMobileMode) {
      this.answers = this.getRndAnswers();
    } 
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
    if (this.state.options.isMobileMode) {
      this.setState({
        rndAnswers: this.get6Answers(this.state.expCurNum, this.state.mainFactor, this.state.expressions),
      });
    } 
  }
}


export default App;
