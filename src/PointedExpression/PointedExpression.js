import React from 'react';
import Expression from '../Expression/Expression'

const pointedExpression = props => {
    return <Expression 
        factor1 = {props.expressions[props.i].factor1}
        factor2 = {props.expressions[props.i].factor2}
        hidedPart = {props.expressions[props.i].hidedPart}
        key = {props.expressions[props.i].key}/>
}

export default pointedExpression;