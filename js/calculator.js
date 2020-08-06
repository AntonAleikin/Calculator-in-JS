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
        // Запятая / разделитель целых чисел
        if (btn.classList.contains("comma")) {
            if (numStorage.argNum1 == "") {
                numStorage.arg1.push("0.");
            } else {
                numStorage.arg1.push(".");
            }
            numStorage.argNum1 = numStorage.arg1.join("");
            answerScreen.textContent = `${numStorage.argNum1}`;
        }

        // Делаем число отрицательным / положительным 
        if (btn.classList.contains("negative")) {
            if (numStorage.argNum1 > 0) {
                numStorage.arg1.unshift("-");
                numStorage.argNum1 = Number(numStorage.arg1.join(""));
                answerScreen.textContent = `${numStorage.argNum1}`;
            } else {
                numStorage.arg1.shift();
                numStorage.argNum1 = Number(numStorage.arg1.join(""));
                answerScreen.textContent = `${numStorage.argNum1}`;
            }
        }

        // Проценты 
        if (btn.classList.contains("percent")) {
            numStorage.argNum1 = numStorage.argNum1 / 100;
            answerScreen.textContent = `${numStorage.argNum1}`;
        }

        // Меняем кнопку АС на С, при написании цифр
        if (numStorage.argNum1 != "") {
            section.querySelector(".ac").textContent = "C";
        }
    }
} 

// Формируем второе число после оператора (аргумент2)
function argument2 (e) {
    let btn = e.target;
    if (btn && btn.classList.contains("section_item")) {

        for (let i = 0; i < 10; i++) {
            if (btn.classList.contains(`num_${i}`)) {
                removeWhite();
                numStorage.arg2.push(i);
                numStorage.argNum2 = Number(numStorage.arg2.join(""));
                answerScreen.textContent = `${numStorage.argNum2}`;
            } 
        }

        if (btn.classList.contains("comma")) {
            if (numStorage.argNum2 == "") {
                numStorage.arg2.push("0.");
            } else {
                numStorage.arg2.push(".");
            }
            numStorage.argNum2 = numStorage.arg2.join("");
            answerScreen.textContent = `${numStorage.argNum2}`;
        }

        if (btn.classList.contains("negative")) {
            if (numStorage.argNum2 > 0) {
                numStorage.arg2.unshift("-");
                numStorage.argNum2 = Number(numStorage.arg2.join(""));
                answerScreen.textContent = `${numStorage.argNum2}`;
            } else {
                numStorage.arg2.shift();
                numStorage.argNum2 = Number(numStorage.arg2.join(""));
                answerScreen.textContent = `${numStorage.argNum2}`;
            }
            if (numStorage.argNum2 == 0) { // После Равно, когда арг2 = 0
                if (numStorage.argNum1 > 0) {
                    numStorage.arg1 = String(numStorage.argNum1).split(); 
                    numStorage.arg1.unshift("-");
                    numStorage.argNum1 = Number(numStorage.arg1.join(""));
                    answerScreen.textContent = `${numStorage.argNum1}`;
                } else {
                    numStorage.arg1 = String(numStorage.argNum1).split("-");
                    numStorage.arg1.shift();
                    numStorage.argNum1 = Number(numStorage.arg1.join(""));
                    answerScreen.textContent = `${numStorage.argNum1}`;
                }
            }
        }

        if (btn.classList.contains("percent")) {
            // Вычисляем процент от предыдущего числа 
            numStorage.argNum2 = numStorage.argNum1 * numStorage.argNum2 / 100;
            answerScreen.textContent = `${numStorage.argNum2}`;
            if (numStorage.argNum2 == 0) {
                numStorage.argNum1 = numStorage.argNum1 / 100;
                answerScreen.textContent = `${numStorage.argNum1}`;
            }
        }
    }
}

// Отключаем белый стиль операторов (+-*/)
function removeWhite () {
    section.querySelectorAll(".operator").forEach((item)=> {
        if (item.classList.contains("white")){
            item.classList.toggle("white");
        }
    });
}


// Реализация цекочки из сразу нескольких разных операций 
function multiOperations () {
    
    // Создаем 3й аргумент как очищеный 2й, а 1й как резалт операции 1-го и 2-го 
    if (numStorage.argNum2 !="") { 
        // Предыдущая операция:
        if (id.plus == 1) {  // ПЛЮС
            numStorage.argNum1 = numStorage.argNum1 + numStorage.argNum2;
        } else if (id.minus == 1) { // МИНУС
            numStorage.argNum1 = numStorage.argNum1 - numStorage.argNum2;
        } else if (id.multiply == 1) { // УМНОЖЕНИЕ
            numStorage.argNum1 = numStorage.argNum1 * numStorage.argNum2;
        } else if (id.devide == 1) { // ДЕЛЕНИЕ
            numStorage.argNum1 = numStorage.argNum1 / numStorage.argNum2;
        }
        // Очищение айди и аргумента 2
        for (let key in id) {
            id[key] = "";
        }
        numStorage.arg2 = [];
        numStorage.argNum2 ="";
    } else {
        // Очищаем айди всех операторов, чтобы всегда четко срабатывал тот, который нажат последним
        for (let key in id) {
            id[key] = "";
        }
        section.removeEventListener("click", argument1);
        section.addEventListener("click", argument2);
    }
}

// Ф-ция операторов
function operations (e) {
    let btn = e.target;
    if (btn && btn.classList.contains("section_item")) {
        removeWhite(); // делегируем удаление белого сразу на все кнопки

        // Добаляем белый и ф-цию мультиопераций на нужные операторы (+-*/) 
        if (btn.classList.contains("plus") || btn.classList.contains("minus") || btn.classList.contains("multiply") ||
        btn.classList.contains("multiply") || btn.classList.contains("devide")) {
            btn.classList.add("white");
            multiOperations();
        }

        // Динамически добавляем айди, после нажатия операторов: +-*/
        for (let key in id) {
            if (btn.classList.contains(`${key}`)) {
                id[key] = 1;
            }
        }

        
        // Равно
        if (btn.classList.contains("equate")) {
            // Плюс
            if (id.plus == 1) { // Проверяем айди оператора (был ли он выполнен)
                numStorage.argNum1 = numStorage.argNum1 + numStorage.argNum2;
                numStorage.arg2 = [];
                numStorage.argNum2 = "";
                answerScreen.textContent = `${numStorage.argNum1}`;
            }

            // Минус
            if (id.minus == 1) { 
                numStorage.argNum1 = numStorage.argNum1 - numStorage.argNum2;
                numStorage.arg2 = [];
                numStorage.argNum2 = "";
                answerScreen.textContent = `${numStorage.argNum1}`;
            }

            // Умножение
            if (id.multiply == 1) {
                numStorage.argNum1 = numStorage.argNum1 * numStorage.argNum2;
                numStorage.arg2 = [];
                numStorage.argNum2 = "";
                answerScreen.textContent = `${numStorage.argNum1}`;
            }

            // Деление
            if (id.devide == 1) {
                numStorage.argNum1 = numStorage.argNum1 / numStorage.argNum2;
                numStorage.arg2 = [];
                numStorage.argNum2 = "";
                answerScreen.textContent = `${numStorage.argNum1}`;
            }
        }

        // AC
        if (btn.classList.contains("ac")) {
            // Полностью очищаем все объекты до исходников 
            numStorage.arg1 = [];
            numStorage.arg2 = [];
            numStorage.argNum1 = "";
            numStorage.argNum2 = "";

            for (let key in id) {
                id[key] = "";
            }

            answerScreen.textContent = 0;

            // Меняем кнопку С на АС обратно
            if (numStorage.argNum1 == "") {
                btn.textContent = "AC";
            }

            // Отключаем второй
            section.removeEventListener("click", argument2);
            // Заново добавляем Первый аргумент
            section.addEventListener("click", argument1);
        }
    }
}

// Делигируем события на секции с кнопками
section.addEventListener("click", argument1);
section.addEventListener("click", operations);


