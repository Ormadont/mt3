import React from 'react';
import styles from './Options.module.css';

const options = props => {
    const stateOptions = props.options;  
    return (
        <div>
            <button>Настройки</button>
            {
                stateOptions.show ?
                <div>
                    <label htmlFor="missEnter">Ответ без клавиши Ввод:</label>
                    <input
                        className={styles.missEnter}
                        type="radio"
                        name="missEnter"
                        id="cb1"
                        value="miss Enter"
                        onChange={props.changeRadioButton}
                        checked={stateOptions.missEnter} />
                    <label htmlFor="missEnter">Ответ c клавишей Ввод:</label>
                    <input
                        className={styles.missEnter}
                        type="radio"
                        name="missEnter"
                        id="cb2"
                        value="do not miss Enter"
                        onChange={props.changeRadioButton}
                        checked={!stateOptions.missEnter} /> 
                </div> : null
            }
        </div>
    )

}

export default options;