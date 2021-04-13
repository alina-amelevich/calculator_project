'use strict'

let calcContainer = document.querySelector('#calc-container');

calcContainer.addEventListener('click', calculation);

function calculation(eventObject) {
    eventObject = eventObject || window.event;
    let target = eventObject.target // Где был клик?

    let targetValue = target.getAttribute('data-button');
    if (!targetValue) return; // Если клик был не по кнопке - вып-ние ф-ции прерывается
    
    console.log('Button was clicked'); // Эт временно для проверки, отладки
};

