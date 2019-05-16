import React from 'react';
import Signs from './Signs/Signs';


const expression = props => {
    let factor1 = props.factor1;
    let factor2 = props.factor2;
    let result = factor1 * factor2;
    switch (props.hidedPart) {
        case 'factor1':
            factor1 = '';
            break;
        case 'factor2':
            factor2 = '';
            break;
        case 'result':
            result = '';
            break;
        default:
            
            break;
    }
    return (
        <div>
            <Signs 
                chars = {factor1}
            />
            <Signs 
                chars = '*'
            />
            <Signs 
                chars = {factor2}
            />
            <Signs 
                chars = '='
            />
            <Signs 
                chars = {result}
            />
        </div>
    )
}

export default expression;