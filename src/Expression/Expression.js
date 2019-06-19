import React from 'react';
import Signs from './Signs/Signs';
import styles from './Expression.module.css';

const expression = props => {
    const exps = [...props.expressions];
    const i = props.expCurNum;
    // console.log(`Expression.js props=`, props);
    let factor1 = <Signs chars={exps[i].factor1} />;
    let factor2 = <Signs chars={exps[i].factor2} />
    let result = <Signs chars={exps[i].factor1 * exps[i].factor2} />

    switch (exps[i].hidedPart) {
        case 'factor1':
            factor1 =
                <Signs chars=''
                    checkAnswer={props.checkAnswer}
                    userInput={props.userInput}/>
            break;
        case 'factor2':
            factor2 =
                <Signs chars=''
                    checkAnswer={props.checkAnswer}
                    userInput={props.userInput}/>
            break;
        case 'result':
            result =
                <Signs chars=''
                    checkAnswer={props.checkAnswer}
                    userInput={props.userInput} />
            break;
        default:

            break;
    }
    let style = props.receivedRightAnswer ? styles.rightExpression : null;
    return (
        <div className={style}>
            {factor1}
            <Signs chars='*' />
            {factor2}
            <Signs chars='=' />
            {result}
        </div>
    )
}



export default expression;