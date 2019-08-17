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

// массив вспомогательных множителей из целых чисел
// аргументы: первый - правая граница (левая - 0) и количество множителей, второй - модификатор
// например, на вход - 3 и 0, на выходе [0, 9, 2]
// например, на вход - 4 и 2, на выходе [3, 5, 4, 2]
export const getFactors = (border, addin) => {
    let factors=[];
    while (factors.length < border) {
        const temp = Math.floor(Math.random() * 9) + addin;
        if ((factors.length === 0) || (!factors.includes(temp))) {
            factors.push(temp);
        } 
    }
    // console.log(`factors=${factors}, len=${factors.length}`);
    return factors;
}



//перемешать произвольный массив
export function mixUp(origArray) {
    const mixUpArray = [];
    while (origArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * origArray.length); //рандомный индекс первого массива
        const rand_element = origArray.splice(randomIndex, 1) //удалённый элемент (массив) первого массива для второго массива
        mixUpArray.push(rand_element[0]); //добавляем элемент в новый массив
    }
    return mixUpArray;
}

export var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// Used to detect whether the users browser is an mobile browser
function isMobile_alt() {
    ///<summary>Detecting whether the browser is a mobile browser or desktop browser</summary>
    ///<returns>A boolean value indicating whether the browser is a mobile browser or not</returns>

    if (sessionStorage.desktop) // desktop storage 
        return false;
    else if (localStorage.mobile) // mobile storage
        return true;

    // alternative
    var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile']; 
    for (var i in mobile) if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;

    // nothing found.. assume desktop
    return false;
}