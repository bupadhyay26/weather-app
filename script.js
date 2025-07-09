const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind'); // 🔁 FIXED ID

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
  const api_key = "c5092b8ff49bab5333ae2808e02d1606"; // 🔁 Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(url).then(response => response.json());

  if (weather_data.cod === "404") {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("Location not found");
    return;
  }

  console.log("Weather fetched");
  location_not_found.style.display = "none";
  weather_body.style.display = "flex";
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}km/h`;

  switch (weather_data.weather[0].main) {
    case 'Clouds':
      weather_img.src = "cloudy sky.png";
      break;
    case 'Clear':
      weather_img.src = "clear sky.png";
      break;
    case 'Rain':
      weather_img.src = "rainy sky.png";
      break;
    case 'Mist':
      weather_img.src = "mist sky.png";
      break;
    case 'Snow':
      weather_img.src = "snow sky.png";
      break;
    default:
      weather_img.src = "default.png";
  }

  console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
  const city = inputBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});
