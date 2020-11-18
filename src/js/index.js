// Import stylesheets
//import './style.css';

import {elements, renderLoader, clearLoader, renderInfoOverlay, 
renderForecastLoader, clearForecastLoader} from './Views/base';
import Weather from './models/Weather';
import * as weatherView from './Views/weatherView';

renderInfoOverlay();

/**
 * The Global app controller
 */
const handleSearch = () =>{
  //console.log('clicked');
  const city = weatherView.getInput();
  //console.log(city);
  weatherView.clearResults();

  renderLoader(elements.mainWeatherDiv);

  Weather.fetchWeather(city, (currentWeatherData)=>{
    // console.log(data);
    if(currentWeatherData){
      weatherView.renderMainWeatherData(currentWeatherData);
      weatherView.renderWeatherDetails(currentWeatherData.details);
      clearLoader('overlay');
      //Forecast 

      renderForecastLoader();
      Weather.fetchForecastWeather(city, (forecastData)=>{
        //console.log('in..');
        if(forecastData){
          weatherView.renderForecastData(forecastData);
          clearForecastLoader();
        }else{
          clearForecastLoader();
          //Display error
        }
        
      });
    }else{
      clearLoader('overlay');
      // Display error
    }
    
  });
  
};

const hideInfoOverlay = (e) =>{
  // event bubbling 
  if(e.target.matches('.infoOverlay')){
    //console.log('matched...');
    clearLoader('infoOverlay');
  }
};

// Attaching  event listener
elements.searchBtn.addEventListener('click', handleSearch);
elements.container.addEventListener('click', hideInfoOverlay);

