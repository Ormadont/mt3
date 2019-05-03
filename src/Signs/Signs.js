import React from 'react';
import styles from './Signs.module.css'

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