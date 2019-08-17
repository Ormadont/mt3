import React from 'react';
import styles from './MobMainFactors.module.css';
import MobileSigns from '../Expression/mobileSigns/MobileSigns'

const mobMainFactors = props => {
    const factors = props.mainFactors.map((factor,index) => {
        const rnd = Math.floor(Math.random()*100); 
        return (
            <span key={`${index}-${rnd}`} className={styles.factor}>
                <MobileSigns 
                    chars={factor}
                    changeMainFactor={props.changeMainFactor}                 
                />
            </span>)});
    return (
        <div className={styles.panel}>
            <h4 className={styles.header}>Новый основной множитель:</h4>
            <div className={styles.factors}>
                {factors}
            </div>
        </div>)}

export default mobMainFactors;