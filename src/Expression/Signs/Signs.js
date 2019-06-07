import React from 'react';
import styles from './Signs.module.css'

const Signs = (props) => {
  let s = props.chars;
  if (!s) 
  {
    s =
    // '?'
    <input
      type="number" min="1" max="99"
      name="answer"
      className={styles.answerInput}
      onChange={props.checkAnswer}
      value={props.userInput}
      id="" />
  }  else {
    // console.log('*******');
  }
  return (
    <span className={styles.main}>
      {s}
    </span>
  )
}



export default Signs;