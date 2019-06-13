import React from 'react';
import styles from './Signs.module.css'

const Signs = (props) => {
  let s = props.chars;
  if (!s) 
  {
    s =
    // '?'
    <input 
      autoFocus
      type="text"
      name="answer"
      className={styles.answerInput}
      onChange={props.checkAnswer}
      value={props.userInput}
      id="" />
  }  else {
    // console.log('*******');
  }
  return (
    <span className={styles.sign}>
      {s}
    </span>
  )
}



export default Signs;