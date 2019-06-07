import React from 'react';
import styles from './AddExression.module.css';

const addExression = props => {
    return (
        <form autoComplete="off" onSubmit={props.addExp}>
            <span>Первый множитель</span>
            <input
                className={styles.factorInput}
                type="number" min="1" max="9"
                name="factor1"
                value={props.factor1}
                onChange={props.changeFactor} /><br />
            <span>Второй множитель</span>
            <input
                className={styles.factorInput}
                type="number" min="1" max="9"
                name="factor2"
                value={props.factor2}
                onChange={props.changeFactor} /><br />
            <input
                type="submit"
                value="Добавить выражение"
            />
        </form>
    )
}

export default addExression;