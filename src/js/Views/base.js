export const elements = {
  "searchTextField":document.querySelector('.city__search'),
  "searchBtn":document.querySelector('.city__search--btn'),
  "mainWeatherDiv": document.querySelector('.weather_area'),
  "weatherDetialsDiv": document.querySelector('.details-div'),
  "forecastAreaDiv":document.querySelector('.forecast_area'),
  "forecastList": document.querySelector('.forecast_list'),
  "container": document.querySelector('.container'),
  "overlay": document.getElementById('overlay'),
  "infoOverlay":document.querySelector('.infoOverlay'),
  "forecastSpinner":document.querySelector('.forecast-spinner')
};

/**
 * Attach the loader to the parent element.
 * @param {} parent 
 */
export const renderLoader = (parent) =>{
    const loader = `
            <div id="overlay" class="overlay">
                <div class="donut" id="spinner"></div>
            </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
};
/**
 * clear loader
 */
export const clearLoader = (selector)=>{
    const loader = document.querySelector(`.${selector}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
};

export const renderInfoOverlay = () =>{
    const markup = `
            <div id="overlay" class="infoOverlay">
                <div class="info-text">
                  Enter a City name and hit search to get the current and foreacst weather information for the location.
                </div>
                
            </div>
    `;
    elements.container.insertAdjacentHTML('afterbegin',markup);
};

export const renderForecastLoader = () =>{
  elements.forecastSpinner.classList.add('show');
};

export const clearForecastLoader = () =>{
  elements.forecastSpinner.classList.remove('show');
};