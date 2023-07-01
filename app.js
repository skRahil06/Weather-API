const getWeatherBtn = document.getElementById('getWeatherBtn');
      const cityInput = document.getElementById('cityInput');
      const weatherInfo = document.getElementById('weatherInfo');

      getWeatherBtn.addEventListener('click', getWeather);
      cityInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          getWeather();
        }
      });

      function getWeather() {
        const city = cityInput.value;
        const apiKey = '3045dd712ffe6e702e3245525ac7fa38'; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            if (data.cod === '404') {
              weatherInfo.innerHTML = '<p>City not found</p>';
            } else {
              const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
              const description = data.weather[0].description;
              const cityName = data.name;

              weatherInfo.innerHTML = `
                <p>City: ${cityName}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
              `;
            }
          })
          .catch(error => {
            console.log('Error:', error);
            weatherInfo.textContent = 'An error occurred while fetching weather data';
          });
      }