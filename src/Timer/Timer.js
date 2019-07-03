import React from 'react';
import styles from './Timer.module.css'

const timer = props => {
    return <div className = {styles.timer}>
        { props.checkKnowledge ? props.timer : null }
    </div>
}

export default timer;