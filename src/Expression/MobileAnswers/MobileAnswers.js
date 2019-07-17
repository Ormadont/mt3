import React from 'react';
import MobileSigns from '../mobileSigns/MobileSigns';
import {getFactors, mixUp} from '../../stuff/modules';
import styles from './MobileAnswers.module.css';

const mobileAnswers = props =>{
  const variantsCount = 6; // количество вариантов ответа
  const rightAnswer=props.rightAnswer;
  const mainFactor=props.mainFactor;
  const answers = getFactors(variantsCount,1).map(x=>x*mainFactor);
  // Если набор ответов не содержит правильного ответа, 
  // то убрать один ответ, добавить правильный и перемешать.
  if (!answers.find(el=>el===rightAnswer)) { 
    answers.shift();
    answers.push(rightAnswer);
    answers = mixUp(answers);
  }
  return (
    <div className={styles.answers}>
      {answers.map(el=><MobileSigns chars={el}/>)}
    </div>
  )
}

export default mobileAnswers;

