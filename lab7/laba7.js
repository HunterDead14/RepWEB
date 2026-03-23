//task1
//Перший скрипт завантажиться, через те що порядок дій йде з верху до самого низу.


//task2.1
var a=2;
var x=1+(a*=2);
console.log(x);//5

//task2.2
// if ("0") {
//     alert('Привіт');
// }
//Так, буде, тому що "0" — це непорожній рядок, а значить true.

//task2.3
let name="Василь";
let admin=name;
console.log(admin);//виведе

//task 3.

let countiesData = [];



//asyns-функція асинхронна. await- зупиняє виконанняя функції поки promise виконується.
async function fetchCounties() {
    const response = await fetch("https://api.census.gov/data/2020/acs/acs5/profile?get=NAME&for=county:*");
    const data = await response.json(); //відповідь перетворює у масив.

    countiesData = data.slice(1).map(item => ({//прибирає перший рядок map перетворює в обєкт
        name: item[0],
        state: item[1],
        county: item[2]
    }));
}

function findCountyCode(countyName) {
    const found = countiesData.find(c => c.name.toLowerCase() === countyName.toLowerCase()); //find повертає перший елем мас який задовільняє умову.
    //.toLowerCase() — щоб пошук не залежав від регістру
    return found ? `${found.state}${found.county}` : "Не знайдено";
}

const searchBtn = document.getElementById("searchBtn");
searchBtn.disabled = true;//блокує поки грузить
searchBtn.textContent = "Завантаження...";

fetchCounties().then(() => {
    searchBtn.disabled = false;//розблоковує після
    searchBtn.textContent = "Знайти";
});

searchBtn.addEventListener("click", () => {
    const input = document.getElementById("countyInput").value;
    const code = findCountyCode(input);
    document.getElementById("result").textContent = code;
});

//task4

document.getElementById("form").addEventListener("submit", function(event) { //addEventListener слухач події. Браузер сам викликає цю функцію коли форма відправляється.
    const first = document.getElementById("first_name").value.trim();
    const last = document.getElementById("last_name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!first || !last || !email) {
        alert("Заповніть всі поля!");
        event.preventDefault();
    } else {
        alert(`Ім'я: ${first}, Прізвище: ${last}, Email: ${email}`);
    }
});

//task5
let position = 0;
const el = document.getElementById("elid");

// обмеження щоб елемент не виходив за межі вікна
const MAX_OFFSET = window.innerWidth - 150;
const MIN_OFFSET = 0;

document.getElementById("rightB").addEventListener("click", () => {
    position = Math.min(position + 100, MAX_OFFSET);
    el.style.left = position + "px";
});

document.getElementById("leftB").addEventListener("click", () => {
    position = Math.max(position - 100, MIN_OFFSET);
    el.style.left = position + "px";
});