import React from 'react';
import styles from './MobileSigns.module.css';

const mobileSigns = props => {
  let signs = props.chars;
  let style = {};
  let onClickFunc = () => props.checkMobAnswer(props.chars);
  if (props.chars === undefined) {
    signs = '?';
    style = {color: "white"};
    onClickFunc = null;
  } else {
    style = props.chars>9 ? {
      paddingLeft: 0
    } : {};
  }
  return (
    <span
      style={style}
      className={styles[props.position]}
      onClick={onClickFunc}
    >{signs}</span> 
  )
}

export default mobileSigns;

