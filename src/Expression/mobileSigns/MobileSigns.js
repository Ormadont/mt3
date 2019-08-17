import React from 'react';
import styles from './MobileSigns.module.css';

const mobileSigns = props => {
  let signs = props.chars;
  let style = {};
  // changeMainFactor
  let onClickFunc = props.checkMobAnswer 
    ? () => props.checkMobAnswer(props.chars)
    : props.changeMainFactor 
      ? () => props.changeMainFactor(props.chars)
      : props.showMMFPane;
  if (props.chars === undefined) {
    signs = '?';
    style = {color: "white"};
    onClickFunc = null;
  } else {
    style = props.chars>9 ? {
      paddingLeft: 0,
    } : {};
  }
  const position = props.position === undefined ? 'default' : props.position; 
  return (
    <span
      style={style}
      className={styles[position]}
      onClick={onClickFunc}
    >{signs}</span> 
  )
}

export default mobileSigns;

