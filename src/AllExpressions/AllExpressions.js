import React from 'react';
import Expression from '../Expression/Expression';

const allExpressions = props => {
    let exprs = null;
    if (props.showedAll) {
      exprs = props.expressions.map( (exp,index) => 
        <Expression
          expressions={props.expressions}
          expCurNum={index}
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