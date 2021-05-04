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

  //Number, dot or change sign
  if (targetValue === '0' || targetValue === '1' || targetValue === '2'
  || targetValue === '3'|| targetValue === '4'|| targetValue === '5'
  || targetValue === '6'|| targetValue === '7'|| targetValue === '8'
  || targetValue === '9'|| targetValue === '.' || targetValue === '-a') {

    //Change sign
    if (targetValue === '-a') {
      if (!store.number1 || ((store.sign) && (!store.number2))) {
        return;
      } else if ((store.number1) && (!store.sign)) {
        if (store.number1[0] !== '-') {
          store.number1 = '-' + store.number1;
          console.log('store.number1 = ' + store.number1);
          return;
        } else {
          store.number1 = store.number1.substr(1);
          console.log('store.number1 = ' + store.number1);
          return;
        }
      } //дописать то же самрое  на number2
    }

    if ((!store.number1) || (!store.sign)) {
      //dot
      if ((targetValue === '.') && (!store.number1)) {
        store.number1 += '0'; 
      }
      //numbers & dot
      store.number1 += targetValue;
      console.log('store.number1 = ' + store.number1);
      return;
    }
    //dot
    if ((targetValue === '.') && (!store.number2)) {
      store.number2 += '0'; 
    }
    //numbers & dot
    store.number2 += targetValue;
    console.log('store.number2 = ' + store.number1);
    return;

  }
  console.log('Не "C" и не цифра');

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
          //Тут много сложностей, разобраться, как работает %
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
  
  console.log('Косяк, это не должно отображаться');
};

