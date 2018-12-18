import React from 'react';
import styles from './Signs.module.css'

//Если аргументы не переданы, то выводит знак вопроса
//В противном случае выводится только указанные аргументы
const Signs = (props) => {
    const char1 = props.char1;
    const char2 = props.char2;
    let str = char1 + char2;
    // console.log('Первый символ - ' + props.char1);
    // console.log('Второй символ - ' + props.char2 + '\n');
    if ((!char1) && (!char2)) {
        str = '?'
    } 
    else if (!char1) {
        str = char2
    }
    else if (!char2) {
        str = char1
    }
        
    return (
        <span className = {styles.main}>
            {str}
        </span>
    )
}

export default Signs;