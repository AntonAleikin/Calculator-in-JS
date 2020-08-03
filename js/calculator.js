"use strict";

// Экран для ответов
const answerScreen = document.querySelector(".answer_screen"),
// Секция с кнопками для делигирования 
section = document.querySelector(".section");


// Создаем объект для хранения числовых значений ввода (аргументов)
let numStorage = {
    arg1: [],
    argNum1: "",
    arg2: [],
    argNum2: ""
};


// Объект для хранения результатов действий операторов
let results = {
    plus: "",
    minus: "",
    multiply: "",
    devide: "",
    percent: ""
};

// Тут равно проверяет какой был выполнен оператор
let id = {
    plus: "",
    minus: "",
    multiply: "",
    devide: "",
    percent: ""
};


// Формируем первое число до оператора (аргумент1)
function argument1 (e) {
    let btn = e.target;
    if (btn && btn.classList.contains("section_item")) {

        // Назначаем цифровое значение кнопок от 0 до 9 с помощью цикла 
        for (let i = 0; i < 10; i++) {
            if (btn.classList.contains(`num_${i}`)) {
                numStorage.arg1.push(i);
                numStorage.argNum1 = Number(numStorage.arg1.join(""));
                answerScreen.textContent = `${numStorage.argNum1}`;
            } 
        }
    }
} 

// Формируем второе число после оператора (аргумент2)
function argument2 (e) {
    let btn = e.target;
    if (btn && btn.classList.contains("section_item")) {

        for (let i = 0; i < 10; i++) {
            if (btn.classList.contains(`num_${i}`)) {
                numStorage.arg2.push(i);
                numStorage.argNum2 = Number(numStorage.arg2.join(""));
                answerScreen.textContent = `${numStorage.argNum2}`;
            } 
        }
    }
}

// Реализация цекочки из сразу нескольких разных операций 
function multiOperations () {
    
    // Создаем 3й аргумент как очищеный 2й, а 1й как резалт операции 1-го и 2-го 
    if (numStorage.argNum2 !="") { 
        // Предыдущая операция:
        if (id.plus == 1) {  // ПЛЮС
            numStorage.argNum1 = numStorage.argNum1 + numStorage.argNum2;
            id.plus = "";
        } else if (id.minus == 1) { // МИНУС
            numStorage.argNum1 = numStorage.argNum1 - numStorage.argNum2;
            id.minus = "";
        } else if (id.multiply == 1) { // УМНОЖЕНИЕ
            numStorage.argNum1 = numStorage.argNum1 * numStorage.argNum2;
            id.multiply = "";
        } else if (id.devide == 1) { // ДЕЛЕНИЕ
            numStorage.argNum1 = numStorage.argNum1 / numStorage.argNum2;
            id.devide = "";
        }
        numStorage.arg2 = [];
    } else {
        section.removeEventListener("click", argument1);
        section.addEventListener("click", argument2);
    }
}

// Ф-ция операторов
function operations (e) {
    let btn = e.target;
    if (btn && btn.classList.contains("section_item")) {

        // Плюс
        if (btn.classList.contains("plus")) {
            multiOperations();
            id.plus = 1;
        }

        // Минус
        if (btn.classList.contains("minus")) {
            multiOperations();
            id.minus = 1;
        }

        // Умножение
        if (btn.classList.contains("multiply")) {
            multiOperations();
            id.multiply = 1;
        }

        // Деление
        if (btn.classList.contains("devide")) {
            multiOperations();
            id.devide = 1;
        }

        // Равно
        if (btn.classList.contains("equate")) {

            // Плюс
            if (id.plus == 1) { // Проверяем айди оператора (был ли он выполнен)
                results.plus = numStorage.argNum1 + numStorage.argNum2;
                answerScreen.textContent = `${results.plus}`;
            }

            // Минус
            if (id.minus == 1) { 
                results.minus = numStorage.argNum1 - numStorage.argNum2;
                answerScreen.textContent = `${results.minus}`;
            }

            // Умножение
            if (id.multiply == 1) { 
                results.multiply = numStorage.argNum1 * numStorage.argNum2;
                answerScreen.textContent = `${results.multiply}`;
            }

            // Деление
            if (id.devide == 1) { 
                results.devide = numStorage.argNum1 / numStorage.argNum2;
                answerScreen.textContent = `${results.devide}`;
            }
        }
    }
}

// Делигируем события на секции с кнопками
section.addEventListener("click", argument1);
section.addEventListener("click", operations);



