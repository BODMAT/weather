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
    let regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
    }

    let words = input.value.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    input.value = words.join(' ');
}

//Запрос к серверу и вывод ответа
async function loadWeather(citySearched) {
    const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${citySearched}&appid=4a20c8dce813771932d1840aa5252afb`;
    const response = await fetch(server, {
        method: "GET",
    });
    const data = await response.json();

    if (response.ok) {
        //console.log(data);

        description.textContent = data.weather[0].description;

        const temp = Math.round(data.main.temp);
        const tempFeelsLike = Math.round(data.main.feels_like);
        const humadity = data.main.humidity;
        const weatherStatus = data.weather[0].main;
        const weatherStatusVal = data.clouds.all;
        const wind = data.wind.speed;

        tempVal.textContent = temp + "°";
        tempFeelsVal.textContent = tempFeelsLike + "°";
        howWeatherKey.textContent = weatherStatus;
        howWeatherVal.textContent = weatherStatusVal + "%";
        humadityVal.textContent = humadity + "%";
        windVal.textContent = wind + "km/h";

        cityVal.textContent = data.name;
        tempMainVal.textContent = temp + "°";

        // console.log(icoWeather.outerHTML);
        // console.log(weatherStatus);

        if (temp >= tempFeelsLike) {
            icoTemp.setAttribute("src", "img/temp-max.svg");
            icoTempFeels.setAttribute("src", "img/temp-min.svg");
        } else {
            icoTemp.setAttribute("src", "img/temp-min.svg");
            icoTempFeels.setAttribute("src", "img/temp-max.svg");
        }

        if (weatherStatus === "Clouds") {
            fullscreenImg.setAttribute("src", "img/bg-clouds.jpg");

            icoWeather.setAttribute("src", "img/cloudy.svg");
            icoWeather2.setAttribute("src", "img/cloudy.svg");
        } else if (weatherStatus === "Clear") {
            fullscreenImg.setAttribute("src", "img/bg-sunny.jpg");

            icoWeather.setAttribute("src", "img/sunny.svg");
            icoWeather2.setAttribute("src", "img/sunny.svg");
        } else if (weatherStatus === "Haze") {
            fullscreenImg.setAttribute("src", "img/bg-haze.jpg");

            icoWeather.setAttribute("src", "img/haze.svg");
            icoWeather2.setAttribute("src", "img/haze.svg");
        } else if (weatherStatus === "Rain") {
            fullscreenImg.setAttribute("src", "img/bg-rain.jpg");

            icoWeather.setAttribute("src", "img/rain.svg");
            icoWeather2.setAttribute("src", "img/rain.svg");
        } else {
            fullscreenImg.setAttribute("src", "img/bg-weather.jpg");

            icoWeather.setAttribute("src", "img/snow.svg");
            icoWeather2.setAttribute("src", "img/snow.svg");
        }
    } else {
        cityVal.textContent = "City not found"
    }
    input.value = "";
}

const input = document.querySelector(".sidebar__input");
const button = document.querySelector(".sidebar__btn");

const tempVal = document.querySelector(".sidebar__temp .sidebar__value");
const tempFeelsVal = document.querySelector(".sidebar__temp-feels .sidebar__value");
const howWeatherKey = document.querySelector(".sidebar__how .sidebar__key");
const howWeatherVal = document.querySelector(".sidebar__how .sidebar__value");
const windVal = document.querySelector(".sidebar__wind .sidebar__value");
const humadityVal = document.querySelector(".sidebar__humadity .sidebar__value");

const tempMainVal = document.querySelector(".main__temp");
const cityVal = document.querySelector(".main__city");

const icoWeather = document.querySelector(".main__img img");
const icoWeather2 = document.querySelector(".sidebar__how .sidebar__img");

const icoTemp = document.querySelector(".sidebar__temp img");
const icoTempFeels = document.querySelector(".sidebar__temp-feels img");

const description = document.querySelector(".sidebar__description");

const fullscreenImg = document.querySelector(".fullscreen img");

button.addEventListener("click", event => {
    event.preventDefault();
    if (input.value.length > 1) {
        let city = input.value;
        loadWeather(city)
    }
})

loadWeather("Smila");