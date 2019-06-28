import React from 'react';
import styles from './ResultOfChecking.module.css';

const resultOfChecking = props => {
  if (props.doesShow) {
    let grade = ''; // как посчитать оценку?
    const allExprsCount = props.rightAnswerCount + props.errorsCount;
    switch (props.rightAnswerCount) {
      case 9:
        grade = 'Отлично!!!';
        break;
      case 8:
        grade = 'Хорошо!';
        break;
      case 7:
        grade = 'Удовлетворительно.';
        break;
      case 6:
        grade = 'Плохо.';
        break;
      default:
        grade = 'Ужасно!';
        break;
    }
    return (
        <div className={styles.backRes}>
          <h3 className={styles.headerRes}>Результаты</h3>
          <div className={styles.infoRes}>
            <p>Выражений: {allExprsCount}</p>
            <p>Ошибок: {props.errorsCount}</p>
            <p>{grade}</p>
          </div>
          <footer className={styles.footerRes}>
            <button className={styles.btnRes} onClick={props.nextCheck}> Ещё раз</button>
            <input 
              className={styles.inputRes}
              type="number" 
              value={props.curMainFactor}
              onChange={props.changeMainFactor}
            />
            <button className={styles.btnRes} onClick={props.endCheck}> Вернуться </button>
          </footer>
        </div>
    )
  }    
  else {
    return null;
  }
}

export default resultOfChecking;