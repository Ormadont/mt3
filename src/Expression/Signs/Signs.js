import React from 'react';
import styles from './Signs.module.css'

const Signs = (props) => {
  let s = props.chars;
  if (!s) 
  {
    s =
    <input 
      autoFocus
      type="text"
      name="answer"
      maxLength={2}
      className={styles.answerInput}
      onChange={props.checkAnswer}
      value={props.userInput}
      id="" />
  } 
  let style = null;
  switch (props.chars) {
    case '*':
      style = {verticalAlign: "-15%"}
      break;
    case '=':
      style = {verticalAlign: "10%"}
      break;
    default:
      break;
  }

  // height: 110%;
  // padding-top: 0.2em;
  // max-height: 0.9em;

  return (
    <span className={styles.sign} style={style}>
      {s}
    </span>
  )
}



export default Signs;