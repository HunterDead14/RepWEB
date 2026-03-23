// task 1
let a=20;
let b=9;

console.log("сума", a+b);
console.log("різниця", a-b);
console.log("множення", a*b);
console.log("ділення",a/b);

//task2
let firstName= "Микола";
let lastName= "Ільчук";

let fullName=`${firstName} ${lastName}`;
console.log(`Привіт,${fullName}!`);

//task3
let age=19;

if(age>=18){
    console.log("Доступ дозволено");
} else {
    console.log("Доступ заборонено");
}

//task4
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

//task 5
function square(number) {
    return number * number;
}
const result = square(5)
console.log("Квадрат числа 5 дорівнює:", result);

//task6
const fruits = ["мандарин", "банан", "кавун"];

fruits.push("яблуко");
console.log(fruits);