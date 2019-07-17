import React from 'react';
import Signs from './Signs/Signs';
import styles from './Expression.module.css';
import MobileSigns from './mobileSigns/MobileSigns';
import {getFactors, mixUp} from '../stuff/modules';
// import MobileAnswers from './MobileAnswers/MobileAnswers';

const expression = props => {
    const exps = [...props.expressions];
    const i = props.expCurNum;
    let factor1 = <Signs chars={exps[i].factor1} />;
    let factor2 = <Signs chars={exps[i].factor2} />
    let result = <Signs chars={exps[i].factor1 * exps[i].factor2} />
    const signs = props.isMobileMode ?
        <MobileSigns position='default' /> :
        <Signs chars=''
            checkAnswer={props.checkAnswer}
            changeAnswer={props.changeAnswer}
            userInput={props.userInput}
            checkKnowledgeIsEnd={props.checkKnowledgeIsEnd}
        />;
    let rightAnswer;
    switch (exps[i].hidedPart) {
        case 'factor1':
            rightAnswer=exps[i].factor1;
            factor1 = signs;
            break;
        case 'factor2':
            rightAnswer=exps[i].factor2;
            factor2 = signs;
            break;
        case 'result':
            rightAnswer=exps[i].factor1 * exps[i].factor2;
            result = signs;
            break;
        default:
            break;
    }
    let style = props.receivedRightAnswer ? styles.rightExpression : '';
    if (props.checkKnowledge) { // режим проверки
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
    // const variantsCount = 6; // количество вариантов ответа
    const mainFactor=props.mainFactor;
    let answers = getFactors(6,1).map(x=>x*mainFactor);
    // Если набор ответов не содержит правильного ответа, 
    // то убрать один ответ, добавить правильный и перемешать.
    if (!answers.find(el=>el===rightAnswer)) { 
      answers.shift();
      answers.push(rightAnswer);
      answers = mixUp(answers);
    }

    const topAnswers = props.isMobileMode && !props.receivedRightAnswer ? (<>
        <MobileSigns checkMobAnswer={props.checkMobAnswer} position="upLeft" chars={answers[0]}/>
        <MobileSigns checkMobAnswer={props.checkMobAnswer} position="upCenter" chars={answers[1]}/>
        <MobileSigns checkMobAnswer={props.checkMobAnswer} position="upRight" chars={answers[2]}/>
    </>): null;
    const bottomAnswers = props.isMobileMode && !props.receivedRightAnswer ? (<>
        <MobileSigns checkMobAnswer={props.checkMobAnswer} position="downLeft" chars={answers[3]}/>
        <MobileSigns checkMobAnswer={props.checkMobAnswer} position="downCenter" chars={answers[4]}/>
        <MobileSigns checkMobAnswer={props.checkMobAnswer} position="downRight" chars={answers[5]}/>
    </>): null;
    const onlyExpression = (<>
            {factor1}
            <Signs chars='*' />
            {factor2}
            <Signs chars='=' />
            {result}
    </>);
    return (
        <div className={style + ' ' + styles.expression}>
            {topAnswers}
            {onlyExpression}
            {bottomAnswers}
        </div>)
}

export default expression;