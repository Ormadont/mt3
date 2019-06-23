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
                        <div className={styles.option}>
                            <span>
                                <input
                                    className={styles.missEnter}
                                    type="radio"
                                    name="missEnter"
                                    id="cb1"
                                    value="miss Enter"
                                    onChange={props.changeRadioButton}
                                    checked={stateOptions.missEnter} />
                                <label htmlFor="missEnter">ответ c паузой</label>
                            </span>
                            <span>
                                <input
                                    className={styles.missEnter}
                                    type="radio"
                                    name="missEnter"
                                    id="cb2"
                                    value="do not miss Enter"
                                    onChange={props.changeRadioButton}
                                    checked={!stateOptions.missEnter} />
                                <label htmlFor="missEnter">ответ c клавишей Ввод</label>
                            </span>
                        </div>
                        <div className={styles.option}>
                            <button className={styles.optBtn} onClick={props.showAddFunc}>Показать/скрыть дополнительный функционал</button>
                        </div>
                        <button className={styles.closeBtn} onClick={props.showHide}>Закрыть</button>
                    </section> : null
            }
        </>
    )

}

export default options;