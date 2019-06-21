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
                            <h3>Настройки</h3>
                        </div>
                        {/* <div className={styles.option}>
                            <p>Настройка 1</p>
                            <input defaultValue="1"/>
                        </div> */}
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
                        <button className={styles.closeBtn} onClick={props.showHide}>Закрыть</button>
                    </section> : null
            }
        </>
    )

}

export default options;