import {elements} from './base';

export const clearResults = () => {
    elements.mainWeatherDiv.innerHTML = '';
    elements.weatherDetialsDiv.innerHTML = '';
    elements.forecastList.innerHTML = '';
};

export const getInput =()=>{
  return elements.searchTextField.value;
};

export const renderMainWeatherData= (currentWeather)=>{
  const markup = `
    <span style="display: block;"> Today </span>
    <span style="display: block;">${currentWeather.dateTime}</span>
    <img style="width:30%; " src="https://openweathermap.org/img/w/${currentWeather.main.weatherIcon}.png" />

   <span style="display: block;">${currentWeather.main.weatherInfo}</span>
   <span style="display: block;">${currentWeather.main.currentTemp} &#176;C</span>
   <span style="display: block;">Min: ${currentWeather.main.minTemp} &#176;C | Max: ${currentWeather.main.maxTemp} &#176;C</span>

   <span style="display: block;">Wind Speed : ${currentWeather.main.speed} m/s</span>
   `;

   elements.mainWeatherDiv.insertAdjacentHTML('beforeend', markup);
};

export const renderWeatherDetails = (weatherDetails) =>{
  const markup = `
     <div class="details_container">
      <table style="width:100%;"> 
          <tr class="border_bottom">
            <td class="light-color">Humidity</td>
            <td class="float-right">${weatherDetails.humidity} %</td>
          </tr>
          <tr class="border_bottom">
            <td class="light-color">Pressure</td>
            <td class="float-right">${weatherDetails.pressure} hPa</td>
          </tr>
          <tr class="border_bottom">
            <td class="light-color">Sunrise</td>
            <td class="float-right">${weatherDetails.sunrise}</td>
          </tr>
          <tr class="border_bottom">
            <td class="light-color">Sunset</td>
            <td class="float-right">${weatherDetails.sunset}</td>
          </tr>
          <tr class="border_bottom">
            <td class="light-color">Visibility</td>
            <td class="float-right">${weatherDetails.visibility} m</td>
          </tr>
      </table>
    </div>
  `;

  elements.weatherDetialsDiv.insertAdjacentHTML('beforeend', markup);
};

const renderForecast = forecast => {
  //console.log(forecast);
    const markup = `
        <li class="forecast_list_item">
         <span style="display:block;">${forecast.dateTime}</span>
         <img src="https://openweathermap.org/img/w/${forecast.weatherIcon}.png" />
         <span>${forecast.currentTemp} &#176;C</span> <span class="light-color">|</span>
         <span>Wind Speed: ${forecast.windSpeed} km/h</span>
       </li>
    `;
    //console.log('in.....');
    elements.forecastList.insertAdjacentHTML('beforeend', markup);
};

export const renderForecastData = (forecastData) =>{
  console.log(forecastData);
  forecastData.forEach(renderForecast);
};

export const toggleOverlay = () =>{
  elements.overlay.classList.toggle('show');
};

