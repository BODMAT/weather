## WEATHER
- Visit [site](https://bodmat.github.io/weather/)
- Use HTML, CSS (SCSS), JS (with DOM and Fetch)
\```
async function loadWeather(citySearched) {
    const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${citySearched}&appid=4a20c8dce813771932d1840aa5252afb`;
    const response = await fetch(server, {
        method: "GET",
    });
    const data = await response.json();
    ...
}
\```
