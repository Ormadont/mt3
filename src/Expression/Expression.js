import React from 'react';
import Signs from './Signs/Signs';

const expression = props => {
    let factor1 = <Signs chars={props.factor1} />;
    let factor2 = <Signs chars={props.factor2} />
    let result = <Signs chars={props.factor1 * props.factor2} />

    switch (props.hidedPart) {
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
    return (
        <div>
            {factor1}
            <Signs chars='*' />
            {factor2}
            <Signs chars='=' />
            {result}
        </div>
    )
}



export default expression;