(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(e,t,a){e.exports={missEnter:"Options_missEnter__1nxwM",btn:"Options_btn__1iqTU",header:"Options_header__2Qldx",option:"Options_option__2UTw8",closeBtn:"Options_closeBtn__3Znc0",optBtn:"Options_optBtn__1FhXH",back:"Options_back__f1rPo"}},,function(e,t,a){e.exports={app:"App_app__th-hl",center:"App_center__3FCQh",sessionStatus:"App_sessionStatus__2MNxe"}},function(e,t,a){e.exports={factorInput:"AddExression_factorInput__2RZHd",addExp:"AddExression_addExp__11YrE"}},function(e,t,a){e.exports={sign:"Signs_sign__3zf5U",answerInput:"Signs_answerInput__258kk",userAnsweredRight:"Signs_userAnsweredRight__SLjrA"}},,,,,,function(e,t,a){e.exports={rightExpression:"Expression_rightExpression__3H7JL",smallBigSmall:"Expression_smallBigSmall__2KNo0"}},,,,function(e,t,a){e.exports=a(22)},,,,,,function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(7),o=a.n(r),i=(a(21),a(14)),c=a(2),l=a(8),h=a(9),u=a(12),p=a(10),m=a(13),d=a(3),E=a.n(d),f=a(1),w=a.n(f),g=function(e){var t=e.options;return s.a.createElement(s.a.Fragment,null,s.a.createElement("button",{className:w.a.btn,onClick:e.showHide},"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"),t.show?s.a.createElement("section",{className:w.a.back},s.a.createElement("div",{className:w.a.header},s.a.createElement("h4",null,"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438")),s.a.createElement("div",{className:w.a.option},s.a.createElement("span",null,s.a.createElement("input",{className:w.a.missEnter,type:"radio",name:"missEnter",id:"cb1",value:"miss Enter",onChange:e.changeRadioButton,checked:t.missEnter}),s.a.createElement("label",{htmlFor:"missEnter"},"\u043e\u0442\u0432\u0435\u0442 c \u043f\u0430\u0443\u0437\u043e\u0439")),s.a.createElement("span",null,s.a.createElement("input",{className:w.a.missEnter,type:"radio",name:"missEnter",id:"cb2",value:"do not miss Enter",onChange:e.changeRadioButton,checked:!t.missEnter}),s.a.createElement("label",{htmlFor:"missEnter"},"\u043e\u0442\u0432\u0435\u0442 c \u043a\u043b\u0430\u0432\u0438\u0448\u0435\u0439 \u0412\u0432\u043e\u0434"))),s.a.createElement("div",{className:w.a.option},s.a.createElement("button",{className:w.a.optBtn,onClick:e.showAddFunc},"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c/\u0441\u043a\u0440\u044b\u0442\u044c \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u0444\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b")),s.a.createElement("button",{className:w.a.closeBtn,onClick:e.showHide},"\u0417\u0430\u043a\u0440\u044b\u0442\u044c")):null)},x=a(5),_=a.n(x),v=function(e){var t=e.chars;t||(t=s.a.createElement("input",{autoFocus:!0,type:"text",name:"answer",maxLength:2,className:_.a.answerInput,onChange:e.checkAnswer,value:e.userInput,id:""}));var a=null;switch(e.chars){case"*":a={verticalAlign:"-15%"};break;case"=":a={verticalAlign:"10%"}}return s.a.createElement("span",{className:_.a.sign,style:a},t)},k=a(11),C=a.n(k),A=function(e){var t=Object(c.a)(e.expressions),a=e.expCurNum,n=s.a.createElement(v,{chars:t[a].factor1}),r=s.a.createElement(v,{chars:t[a].factor2}),o=s.a.createElement(v,{chars:t[a].factor1*t[a].factor2});switch(t[a].hidedPart){case"factor1":n=s.a.createElement(v,{chars:"",checkAnswer:e.checkAnswer,userInput:e.userInput});break;case"factor2":r=s.a.createElement(v,{chars:"",checkAnswer:e.checkAnswer,userInput:e.userInput});break;case"result":o=s.a.createElement(v,{chars:"",checkAnswer:e.checkAnswer,userInput:e.userInput})}var i=e.receivedRightAnswer?C.a.rightExpression:null;return s.a.createElement("div",{className:i},n,s.a.createElement(v,{chars:"*"}),r,s.a.createElement(v,{chars:"="}),o)},b=function(e){var t=null;return e.showedAll&&(t=e.expressions.map(function(t,a){return s.a.createElement(A,{expressions:e.expressions,expCurNum:a,key:t.key})})),s.a.createElement(s.a.Fragment,null,s.a.createElement("button",{onClick:e.showHide},"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435 \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u044f"),t)},F=a(4),N=a.n(F),S=function(e){return s.a.createElement("form",{autoComplete:"off",onSubmit:e.addExp},s.a.createElement("span",null,"\u041f\u0435\u0440\u0432\u044b\u0439 \u043c\u043d\u043e\u0436\u0438\u0442\u0435\u043b\u044c"),s.a.createElement("input",{className:N.a.factorInput,type:"number",min:"1",max:"9",name:"factor1",value:e.factor1,onChange:e.changeFactor}),s.a.createElement("br",null),s.a.createElement("span",null,"\u0412\u0442\u043e\u0440\u043e\u0439 \u043c\u043d\u043e\u0436\u0438\u0442\u0435\u043b\u044c"),s.a.createElement("input",{className:N.a.factorInput,type:"number",min:"1",max:"9",name:"factor2",value:e.factor2,onChange:e.changeFactor}),s.a.createElement("br",null),s.a.createElement("input",{className:N.a.addExp,type:"submit",value:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u0435"}))},I=function(e,t,a){for(var n=a-t+1,s=[],r=M(n,t),o=0;o<n;o++){var i,c=void 0,l=void 0,h=void 0;h=!(Math.random()<.5),i=r.splice(0,1);var u="";h?(c=e,l=i[0],u=0===Math.floor(2*Math.random())?"result":"factor2"):(c=i[0],l=e,u=0===Math.floor(2*Math.random())?"result":"factor1");var p="".concat(o,"-").concat(Math.floor(100*Math.random()));s.push({factor1:c,factor2:l,hidedPart:u,showedPart:"",key:p})}return s},M=function(e,t){for(var a=[];a.length<e;){var n=Math.floor(Math.random()*e)+t;0!==a.length&&a.includes(n)||a.push(n)}return a},O=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).mainFactors=[],a.getExps=function(e){return I(e,a.state.options.leftLimit,a.state.options.rightLimit)},a.showAddFunc_handleClick=function(){var e=a.state.options;e.showAddFunc=!e.showAddFunc,a.setState({options:e})},a.appDiv=null,a.setAppDiv=function(e){return a.appDiv=e},a.focusAppDiv=function(){a.appDiv&&a.appDiv.focus()},a.showHideExpressions_handleClick=function(){var e=a.state.showedAllExpressions;a.setState({showedAllExpressions:!e})},a.showHideOptions_handleClick=function(){var e=a.state.options;e.show=!e.show,a.setState({options:e})},a.changeMainFactor_handleChange=function(e){var t=e.target.value,n=a.getExps(t);0<t&&t<10&&a.setState({userInput:"",receivedRightAnswer:!1,mainFactor:t,expressions:n})},a.changeTempFactorX_handleChange=function(e){"factor1"===e.target.name?a.setState({tempFactor1:e.target.value}):a.setState({tempFactor2:e.target.value})},a.addExpression_handleSubmit=function(e){var t=Object(c.a)(a.state.expressions),n="";switch(Math.floor(3*Math.random())){case 0:n="factor1";break;case 1:n="factor2";break;default:n="result"}var s="addedManually".concat(t.length.toString()),r={factor1:parseInt(a.state.tempFactor1),factor2:parseInt(a.state.tempFactor2),hidedPart:n,showedPart:"",key:s};t.push(r),e.preventDefault(),0===r.factor1||0===r.factor2?alert("\u041c\u043d\u043e\u0436\u0438\u0442\u0435\u043b\u044c \u043d\u0435 \u0434\u043e\u043b\u0436\u0435\u043d \u0431\u044b\u0442\u044c \u0440\u0430\u0432\u0435\u043d 0"):isNaN(r.factor1)||isNaN(r.factor1)?alert("\u041c\u043d\u043e\u0436\u0438\u0442\u0435\u043b\u044c \u0434\u043e\u043b\u0436\u0435\u043d \u0431\u044b\u0442\u044c \u0447\u0438\u0441\u043b\u043e\u043c"):a.setState({expressions:t})},a.delCurExpression_handleClick=function(){if(a.state.expressions.length>1){var e=Object(c.a)(a.state.expressions);e.splice(a.state.expCurNum,1);var t=Math.floor(Math.random()*e.length);a.setState({expressions:e,expCurNum:t})}else if(a.mainFactors.length>0){var n=a.mainFactors.splice(0,1)[0],s=a.getExps(n),r=Math.floor(Math.random()*s.length);a.setState({mainFactor:n,expressions:s,expCurNum:r})}},a.showHideAnswer_handleClick=function(){var e=a.state.expCurNum,t=Object(c.a)(a.state.expressions);"nothing"!==t[e].hidedPart?(t[e].showedPart=t[e].hidedPart,t[e].hidedPart="nothing"):(t[e].hidedPart=t[e].showedPart,t[e].showedPart=""),a.setState({expressions:t})},a.nextEpression_handleClick=function(){var e=Object(c.a)(a.state.expressions),t=a.state.expCurNum;""!==e[t].showedPart&&(e[t].hidedPart=e[t].showedPart,e[t].showedPart=""),a.setState({userInput:""}),a.setState({expressions:e}),a.setState({expCurNum:Math.floor(Math.random()*a.state.expressions.length)})},a.checkAnswer_handleChange=function(e){var t=0,n=Object(c.a)(a.state.expressions)[a.state.expCurNum];switch(n.hidedPart){case"factor1":t=n.factor1;break;case"factor2":t=n.factor2;break;case"result":t=n.factor1*n.factor2}parseInt(e.target.value)===parseInt(t)?(a.setState({userInput:""}),a.showHideAnswer_handleClick(),a.setState({receivedRightAnswer:!0}),a.state.options.missEnter&&setTimeout(function(){a.delCurExpression_handleClick(),a.setState({receivedRightAnswer:!1})},3e3),a.focusAppDiv()):a.setState({userInput:e.target.value})},a.rightAnswerHandler_enterPress=function(e){"Enter"===e.key&&a.state.receivedRightAnswer&&!a.state.options.missEnter&&(a.delCurExpression_handleClick(),a.setState({receivedRightAnswer:!1}))},a.missEnterOptionsRadioButton_handleChange=function(e){var t=Object(i.a)({},a.state.options);"miss Enter"===e.target.value?t.missEnter=!0:t.missEnter=!1,a.setState({options:t})},a.state={mainFactor:-1,expressions:[],expCurNum:0,userInput:"",tempFactor1:0,tempFactor2:0,showedAllExpressions:!1,receivedRightAnswer:!1,scores:0,options:{show:!1,missEnter:!0,dontHideMainFactor:!0,showAddFunc:!1,leftLimit:1,rightLimit:9}},a.mainFactors=M(9,1),a.state.mainFactor=a.mainFactors.splice(0,1)[0],a.state.expressions=I(a.state.mainFactor,a.state.options.leftLimit,a.state.options.rightLimit),a}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.state.options.showAddFunc?s.a.createElement(s.a.Fragment,null,s.a.createElement("button",{onClick:this.nextEpression_handleClick},"\u0414\u0440\u0443\u0433\u043e\u0435 \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u0435"),s.a.createElement(S,{factor1:this.state.tempFactor1,factor2:this.state.tempFactor2,addExp:this.addExpression_handleSubmit.bind(this),changeFactor:this.changeTempFactorX_handleChange.bind(this)}),s.a.createElement("button",{onClick:this.delCurExpression_handleClick},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0435\u0435 \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u0435"),s.a.createElement("button",{onClick:this.showHideAnswer_handleClick},"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c/\u0441\u043a\u0440\u044b\u0442\u044c \u043e\u0442\u0432\u0435\u0442"),s.a.createElement(b,{showedAll:this.state.showedAllExpressions,expressions:this.state.expressions,showHide:this.showHideExpressions_handleClick})):null,t=s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:E.a.sessionStatus},s.a.createElement("span",null,"\u0412\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u0439: ",this.state.expressions.length),s.a.createElement("span",null,"\u041e\u0441\u043d\u043e\u0432\u043d\u044b\u0445 \u043c\u043d\u043e\u0436\u0438\u0442\u0435\u043b\u0435\u0439: ",this.mainFactors.length+1)));return s.a.createElement("div",{className:E.a.app,ref:this.setAppDiv,onKeyDown:this.rightAnswerHandler_enterPress,tabIndex:"0"},s.a.createElement("header",{className:E.a.center},s.a.createElement("label",null,"\u041e\u0441\u043d\u043e\u0432\u043d\u043e\u0439 \u043c\u043d\u043e\u0436\u0438\u0442\u0435\u043b\u044c"),s.a.createElement("input",{value:this.state.mainFactor,onChange:this.changeMainFactor_handleChange,type:"number"}),s.a.createElement(g,{options:this.state.options,changeRadioButton:this.missEnterOptionsRadioButton_handleChange,showHide:this.showHideOptions_handleClick,showAddFunc:this.showAddFunc_handleClick})),s.a.createElement("section",{className:E.a.center},s.a.createElement(A,{expressions:this.state.expressions,expCurNum:this.state.expCurNum,userInput:this.state.userInput,receivedRightAnswer:this.state.receivedRightAnswer,checkAnswer:this.checkAnswer_handleChange})),s.a.createElement("footer",null,t,e))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[15,1,2]]]);
//# sourceMappingURL=main.5e1cce89.chunk.js.map