import React from 'react';
import Signs from './Signs/Signs';
import styles from './Expression.module.css';
import OptionsContext from '../Context/OptionsContext';

const expression = props => {
    const exps = [...props.expressions];
    const i = props.expCurNum;
    // console.log(`Expression.js props=`, props);
    let factor1 = <Signs chars={exps[i].factor1} />;
    let factor2 = <Signs chars={exps[i].factor2} />
    let result = <Signs chars={exps[i].factor1 * exps[i].factor2} />
    const signs =
        <Signs chars=''
            checkAnswer={props.checkAnswer}
            changeAnswer={props.changeAnswer}
            userInput={props.userInput}
            checkKnowledgeIsEnd={props.checkKnowledgeIsEnd}
        />;
    switch (exps[i].hidedPart) {
        case 'factor1':
            factor1 = signs;
            break;
        case 'factor2':
            factor2 = signs;
            break;
        case 'result':
            result = signs;
            break;
        default:
            break;
    }
    let style = props.receivedRightAnswer ? styles.rightExpression : '';
    if (props.checkKnowledge) {
        style += styles.cusBorder + ' ';
        switch (props.seconds) {
            case 9:
            case 8:
                style += styles.sec_5 + ' ';
                break;
            case 7:
            case 6:
                style += styles.sec_4 + ' ';
                break;
            case 5:
            case 4:
                style += styles.sec_3 + ' ';
                break;
            case 3:
            case 2:
                style += styles.sec_2 + ' ';
                break;
            case 1:
            case 0:
                style += styles.sec_1 + ' ';
                break;
            default:
                break;
        }
    }
    // console.log('style = ', style);

    return (
        <OptionsContext.Consumer>{context => {
            return (
                <div className={style + ' ' + styles.expression}>
                    {factor1}
                    <Signs chars='*' />
                    {factor2}
                    <Signs chars='=' />
                    {result}
                    {console.log("context.mobileMode=", context.mobileMode)}
                </div>
            )
        }}</OptionsContext.Consumer>
    )
}

export default expression;