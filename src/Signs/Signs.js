import React from 'react';
import styles from './Signs.module.css'

//Если аргументы не переданы, то выводит знак вопроса
//В противном случае выводится только указанные аргументы
const Signs = (props) => {
    let s = props.chars;
    if (!s) s = '?'
    return (
        <span className = {styles.main}>
            {s}
        </span>
    )
}

export default Signs;