"use strict";

// Экран для ответов
const answerScreen = document.querySelector(".answer_screen"),
// Секция с кнопками для делигирования (псевдо) 
section = document.querySelectorAll(".section");


// Записываем кнопки в объект и приписываем им цифровые значения 
const numbers = {
    num1: 1,
    num2: 2,
    num3: 3
};

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
};

// Тут равно проверяет какой был выполнен оператор
let id = {
    plus: "",
};


// Формируем первое число до оператора (аргумент1)
function argument1 (e) {
    let btn = e.target;
    if (btn && btn.classList.contains("section_item")) {

        // Секция ЧИСЕЛ
        if (btn.classList.contains("num_1")) {
            numStorage.arg1.push(numbers.num1);
            numStorage.argNum1 = Number(numStorage.arg1.join(""));
            console.log(numStorage.argNum1);
        } else if (btn.classList.contains("num_2")) {
            numStorage.arg1.push(numbers.num2);
            numStorage.argNum1 = Number(numStorage.arg1.join(""));
            console.log(numStorage.argNum1);
        } else if (btn.classList.contains("num_3")) {
            numStorage.arg1.push(numbers.num3);
            numStorage.argNum1 = Number(numStorage.arg1.join(""));
            console.log(numStorage.argNum1);
        }
    }
} 

// Формируем второе число после оператора (аргумент2)
function argument2 (e) {
    let btn = e.target;
    if (btn && btn.classList.contains("section_item")) {

        // Секция ЧИСЕЛ
        if (btn.classList.contains("num_1")) {
            numStorage.arg2.push(numbers.num1);
            numStorage.argNum2 = Number(numStorage.arg2.join(""));
            console.log(numStorage.argNum2);
        } else if (btn.classList.contains("num_2")) {
            numStorage.arg2.push(numbers.num2);
            numStorage.argNum2 = Number(numStorage.arg2.join(""));
            console.log(numStorage.argNum2);
        } else if (btn.classList.contains("num_3")) {
            numStorage.arg2.push(numbers.num3);
            numStorage.argNum2 = Number(numStorage.arg2.join(""));
            console.log(numStorage.argNum2);
        }
    }
}

// Ф-ция операторов
function operators (e) {
    let btn = e.target;
    if (btn && btn.classList.contains("section_item")) {

        // Плюс
        if (btn.classList.contains("plus")) {

            if (numStorage.argNum2 !="") { // Создаем 3й аргумент как очищеный 2й, а 1й = 1й+2й 
                numStorage.argNum1 = numStorage.argNum1 + numStorage.argNum2;
                numStorage.arg2 = [];
                id.plus = 1;
            } else {
                section[0].removeEventListener("click", argument1);
                section[0].addEventListener("click", argument2);
                id.plus = 1;
            }
        }

        // Равно
        if (btn.classList.contains("equate")) {
            if (id.plus !="") { // Проверяем айди оператора (был ли он выполнен)
                results.plus = numStorage.argNum1 + numStorage.argNum2;
                console.log(results.plus);
                id.plus = ""; 
            }
        }
    }
}

// Делигируем события на секции с кнопками
section[0].addEventListener("click", argument1);
section[1].addEventListener("click", operators);



