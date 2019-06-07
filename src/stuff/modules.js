// Генерация массива выражений для состояния App в конструкторе при первом запуске 
// и далее каждый раз при выборе нового основного множителя.
// Подразумевается генерация номера текущего выражения будет в конструкторе 
// или позже, но перед функцией render().
// На вход три аргумента: первый - основной множитель, второй и третий - 
// границы прочих множителей
// Скрытая часть выражения при генерации определяется случайно
// Порядок выражений определяется случайно при генерации
export const getExprs = (mainFactor, leftLimit, rightLimit) => {
    const length = rightLimit - leftLimit + 1; //длина массива включая концы границ
    const arr = [];
    const secondaryFactors=getSecondaryFactors(length, leftLimit);
    // заполнение массива
    for (let i = 0; i < length; i++) {
        // множители, undefined
        let factor1, factor2, factorX, mainFactorIsFirst;
        (Math.random() < 0.5) ? mainFactorIsFirst = false : mainFactorIsFirst = true;
        factorX = secondaryFactors.splice(0,1);
        if (mainFactorIsFirst) {
            factor1 = mainFactor;
            factor2 = factorX[0];
        } else {
            factor1 = factorX[0];
            factor2 = mainFactor;
        }
        // что скрывается?
        let hidedPart = '';
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                hidedPart = 'factor1';
                break;
            case 1:
                hidedPart = 'factor2';
                break;
            default:
                hidedPart = 'result';
                break;
        }
        // уникальный идентификатор - ключ
        const key=`${i}-${Math.floor(Math.random() * 100)}`;
        arr.push({factor1: factor1, factor2: factor2, hidedPart: hidedPart, showedPart: '', key:key});
    }
    return arr;
}

// массив вспомогательных множителей
// например, на вход - 3 и 0, тогда на выход [1, 0, 2]
const getSecondaryFactors = (border, addin) => {
    let factors=[];
    while (factors.length < border) {
        const temp = Math.floor(Math.random() * border) + addin;
        if ((factors.length === 0) || (!factors.includes(temp))) {
            factors.push(temp);
        } 
    }
    // console.log(`factors=${factors}, len=${factors.length}`);
    return factors;
}
