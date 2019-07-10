import React from 'react';
import styles from './backgroundScene.module.css';

const backgroundScene = props => {
    return (
        <div className={styles.back}>
            {props.children}
        </div>
    )
}

export default backgroundScene;