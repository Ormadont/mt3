import React from 'react';
import styles from './Options.module.css';

const options = props => {
  const stateOptions = props.options;

  return (
    <>
      <button className={styles.btn} onClick={props.showHide}>Настройки</button>
      {
        stateOptions.show ?
          <section className={styles.back}>
            <div className={styles.header}>
              <h4>Настройки</h4>
            </div>
            <div id="missEnter" className={styles.option}>
              <p>Режим ввода с клавиатуры</p>
              <span>
                <input
                  className={styles.radioBtn}
                  type="radio"
                  name="missEnter"
                  id="missEnterOn"
                  value="miss Enter"
                  onChange={props.missEnter_handler}
                  checked={stateOptions.missEnter} />
                <label htmlFor="missEnterOn">ответ c паузой</label>
              </span>
              <span>
                <input
                  className={styles.radioBtn}
                  type="radio"
                  name="missEnter"
                  id="doNotMissEnter"
                  value="do not miss Enter"
                  onChange={props.missEnter_handler}
                  checked={!stateOptions.missEnter} />
                <label htmlFor="doNotMissEnter">ответ c клавишей Ввод</label>
              </span>
            </div>
            <div id="checkKnowledge" className={styles.option}>
              <p>Режим проверки знаний</p>
              <div>
                <input
                  className={styles.radioBtn}
                  type="radio"
                  name="checkKnowledge"
                  id="checkOn"
                  value="start checking"
                  checked={stateOptions.checkKnowledge}
                  onChange={props.checkKnowledge_handler}
                />
                <label htmlFor="checkOn">включить</label>
              </div>
              <div>
                <input
                  className={styles.radioBtn}
                  type="radio"
                  name="checkKnowledge"
                  id="checkOff"
                  value="finish checking"
                  checked={!stateOptions.checkKnowledge}
                  onChange={props.checkKnowledge_handler}
                />
                <label htmlFor="checkOff">выключить</label>
              </div>

            </div>
            <div id="showAddFunc" className={styles.option}>
              <button className={styles.optBtn} onClick={props.showAddFunc}>Показать/скрыть дополнительный функционал</button>
            </div>
            <button className={styles.closeBtn} onClick={props.showHide}>Закрыть</button>
          </section> : null
      }
    </>
  )

}

export default options;