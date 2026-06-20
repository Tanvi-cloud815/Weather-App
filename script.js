const apiKey = "0fd12f8a2b75a60e940c7ac014962b9c";

async function getWeather() {

    const city = document.getElementById("city").value.trim();
    const result = document.getElementById("weatherResult");

    if(city === ""){
        result.innerHTML = "<p>Please enter a city name</p>";
        return;
    }

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        result.innerHTML = `
            <h2>${data.name}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <h3>${data.main.temp} °C</h3>
            <p>${data.weather[0].main}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

    }
    catch(error){
        result.innerHTML = "<p>City not found</p>";
    }
}

document.getElementById("city").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        getWeather();
    }
});