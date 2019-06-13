import React from 'react';
import styles from './Options.module.css';

const options = props => {
    return (
        <form>
            <label htmlFor="missEnter">Ответ без клавиши Ввод:</label>
            <input 
                className={styles.missEnter} 
                type="radio" 
                name="missEnter" 
                id="cb1" 
                value="miss Enter"
                onChange={props.changeRadioButton}
                checked={props.missEnter}  /> 
            <br />
            <label htmlFor="missEnter">Ответ c клавишей Ввод:</label>
            <input 
                className={styles.missEnter} 
                type="radio" 
                name="missEnter" 
                id="cb2" 
                value="do not miss Enter"
                onChange={props.changeRadioButton}
               checked={!props.missEnter}/>
        </form>
    )

}

export default options;