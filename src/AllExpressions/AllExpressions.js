import React from 'react';
import Expression from '../Expression/Expression';

const allExpressions = props => {
    let exprs = null;
    if (props.showedAll) {
      exprs = props.expressions.map( exp => 
        <Expression
          factor1={exp.factor1}
          factor2={exp.factor2}
          hidedPart={exp.hidedPart}
          key={exp.key} />
      )
    }
    return (
        <>
          <button onClick={props.showHide}>Показать все выражения</button>
          {exprs}
        </>
    )
} 

export default allExpressions;