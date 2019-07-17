import React, {useRef, useEffect} from 'react';
import styles from './Signs.module.css'

const Signs = (props) => {
  let s = props.chars;
  const inputRef = useRef(null);
  
  useEffect(
    () => {
      if (s.type ==='input' && !props.checkKnowledgeIsEnd)  {
        inputRef.current.focus()
      }
    }
  );

  if (s==="") {
    s =
    <input 
      ref={inputRef}
      autoFocus
      type="text"
      name="answer"
      maxLength={2}
      className={styles.answerInput}
      onKeyUp={props.checkAnswer}
      onChange={props.changeAnswer}
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

return (
    <span className={styles.sign} style={style}>
      {s}
    </span>
  )
}



export default Signs;