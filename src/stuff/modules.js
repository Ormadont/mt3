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
    const secondaryFactors=getFactors(length, leftLimit);
    // заполнение массива
    for (let i = 0; i < length; i++) {
        // множители, undefined
        let factor1, factor2, factorX, mainFactorIsFirst;
        (Math.random() < 0.5) ? mainFactorIsFirst = false : mainFactorIsFirst = true;
        factorX = secondaryFactors.splice(0,1);
        let hidedPart = ''; // что скрывается?
        if (mainFactorIsFirst) {
            factor1 = mainFactor;
            factor2 = factorX[0];
            if (Math.floor(Math.random() * 2) === 0) hidedPart = 'result';
            else hidedPart = 'factor2';
        } else {
            factor1 = factorX[0];
            factor2 = mainFactor;
            if (Math.floor(Math.random() * 2) === 0) hidedPart = 'result';
            else hidedPart = 'factor1';
        }
        // уникальный идентификатор - ключ
        const key=`${i}-${Math.floor(Math.random() * 100)}`;
        arr.push({factor1: factor1, factor2: factor2, hidedPart: hidedPart, showedPart: '', key:key});
    }
    return arr;
}

// массив вспомогательных множителей
// аргументы: первый - правая граница (левая - 0), второй - модификатор
// например, на вход - 3 и 0, на выходе [1, 0, 2]
// например, на вход - 4 и 2, на выходе [3, 5, 4, 2]
export const getFactors = (border, addin) => {
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

