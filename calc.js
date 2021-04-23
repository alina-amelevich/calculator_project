'use strict'

let calcContainer = document.querySelector('#calc-container');

calcContainer.addEventListener('click', calculation);


let store =  {};
store.number1 = '';
store.number2 = '';
store.sign = '';
store.counter = 0;

function calculation(eventObject) {
    eventObject = eventObject || window.event;
    let target = eventObject.target // Где был клик?
    let targetValue = target.getAttribute('data-button');

    console.log('targetValue = ' + targetValue);

    if (!targetValue) {
        return; // Если клик был не по кнопке - вып-ние ф-ции прерывается
    }
    console.log('Button was clicked'); // Эт временно для проверки, отладки

    if (targetValue === 'c') {
        store.counter = 0; 
        store.number1 = '';
        store.number2 = '';
        console.log('Обнуление сработало');
        return;
    }
    console.log('Не "C"');

    //Number
    if (targetValue === '0' || targetValue === '1' || targetValue === '2'
    || targetValue === '3'|| targetValue === '4'|| targetValue === '5'
    || targetValue === '6'|| targetValue === '7'|| targetValue === '8'
    || targetValue === '9'|| targetValue === '.') {

        if ((!store.number1) || (!store.sign)) {
            if ((targetValue === '.') && (!store.number1)) {
                store.number1 += '0'; 
            }
            store.number1 += targetValue;
            console.log('store.number1 = ' + store.number1);
            return;
        }

        if ((targetValue === '.') && (!store.number2)) {
            store.number2 += '0'; 
        }
        store.number2 += targetValue;
        console.log('store.number2 = ' + store.number1);
        return;
    }
    console.log('Не "C" и не цифра');
    //Следующее 'if' можно не писать т.к. это все оставшиеся варианты
    //if (targetValue === '+' || '-' || '*' || '/' || '%' || '-a' || '=') {}  
    // console.log('store.counter = ' + store.counter);

    //Signes
    if (targetValue === '+'|| targetValue === '-' || targetValue === '*' 
    || targetValue === '/' || targetValue === '%' || targetValue === '=') {
        if (!store.number1) {
            return;
        }
        let number1Parsed = parseFloat(store.number1);
        if (store.number2) {
            let number2Parsed = parseFloat(store.number2);
            switch (store.sign) {
                case '+':
                    store.counter = number1Parsed + number2Parsed;
                    break;
                case'-':
                    store.counter = number1Parsed - number2Parsed;
                    break;
                case '*': 
                    store.counter = number1Parsed * number2Parsed;
                    break;
                case '/':
                    store.counter = number1Parsed / number2Parsed;
                    break;
                case '%': 
                    //Тут много сложностей, разоюраться, как работает %
                    break;
            }
            store.number1 = store.counter.toString;
            store.number2 = '';
            if (targetValue === '=') {
                //здесь добавить вывод результата на панели
                return;
            }
        } else if (targetValue === '=') {
            store.counter = number1Parsed;
            return;
        }
        store.sign = targetValue;
        console.log('store.sign = ' + store.sign);
        return;
    }
    console.log('Не "C", не цифра и не арифм.знак');
    
    // +/- Пока не будет работать, если указать его до Number1
    if (targetValue === '-a') {
        store.counter = -store.counter;
        console.log('store.counter = ' + store.counter);
        return;
    }
    
    console.log('Косяк, это не должно отображаться');
    
};

