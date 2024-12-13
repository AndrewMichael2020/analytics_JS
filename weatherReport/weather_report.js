function showweatherDetails(event) {
    event.preventDefault();
  
    const cityInput = document.getElementById('city').value.trim();
    const apiKey = '50d4c354f03b3231a662126ce71ff02c'; // Replace with your actual API key
  
    // Validate input format (City or City, State/Province)
    const cityRegex = /^[a-zA-Z\s]+(?:,\s?[a-zA-Z\s]+)?$/;
    if (!cityRegex.test(cityInput)) {
      alert("Please enter a valid city or city with state/province (e.g., 'Vancouver' or 'Vancouver, WA').");
      return;
    }
  
    // Check if state/province is included
    const [city, stateOrProvince] = cityInput.split(',').map(part => part.trim());
  
    // Construct the API query
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    if (stateOrProvince) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}&units=metric`;
    }
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("City not found. Please specify state or province if applicable.");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.json();
      })
      .then(data => {
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `
          <h2>Weather in ${data.name}</h2>
          <p>Temperature: ${data.main.temp} &#8451;</p>
          <p>Weather: ${data.weather[0].description}</p>`;
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
      });
  }
  
  // Attach the event listener to the form
  document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);
  