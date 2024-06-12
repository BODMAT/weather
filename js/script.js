"use strict"

//DATE 06:09 - Monday, 9 Sep ‘23
const date = document.querySelector(".main__date");

function makeDate() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
    let day = now.getDate().toString();
    let month = now.toLocaleDateString('en-US', { month: 'short' });
    let year = (now.getFullYear() % 100).toString().padStart(2, '0');

    let formattedDate = `${hours}:${minutes} - ${dayOfWeek}, ${day} ${month} '${year}`;
    date.textContent = formattedDate;
}
makeDate()
setInterval(makeDate, 60000);


//Валидация ввода только текста
function validateInput(input) {
    let regex = /^[a-zA-Z]+$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-Z]/g, '');
    }

    input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
}


