import axios from 'axios';
import { proxy, key, units } from '../config';
import * as util from '../utils/util';

export default class Weather{
  constructor(){
    
  }

  static fetchWeather(city, cb){
  
    axios.get(`${proxy}https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${key}`)
      .then( (response) => {
        const responseCode = response.data.cod;
        
        
        const {name,main,weather,sys, dt, wind, visibility} = {...response.data};
        
        let {sunrise, sunset} = {...sys};
        sunrise = util.convertUnixTimestampToJavascriptDate(sunrise);
        sunset = util.convertUnixTimestampToJavascriptDate(sunset);
        sunrise = sunrise.split(" ")[1];
        sunset = sunset.split(" ")[1];
        const weatherIcon = weather[0].icon;
        const weatherInfo = weather[0].main;
        const weatherDescription = weather[0].description;
        const humidity = main.humidity;
        const pressure = main.pressure;
        const currentTemp = main.temp;
        const minTemp = main.temp_min;
        const maxTemp = main.temp_max;

        this.weatherData = {
          main: {
            currentTemp,
            minTemp,
            maxTemp,
            weatherIcon,
            weatherInfo,
            weatherDescription,
            ...wind},
          dateTime: util.convertUnixTimestampToJavascriptDate(dt),
          location: name,
          details:{
            sunrise,
            sunset,
            visibility,
            humidity,
            pressure
          }
        };

        
        return cb(this.weatherData);

      })
      .catch( (error) => {
      
        return cb(null);
      });
 
  }

  static fetchForecastWeather(city, cb){
    
    this.weatherForecastData = [];
    axios.get(`${proxy}https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${key}`)
      .then( (response) => {
       
        const forecastData = response.data.list;
        forecastData.forEach((data)=>{
          const hourlyData = {
            dateTime: util.convertUnixTimestampToJavascriptDate(data.dt),
            currentTemp: data.main.temp,
            windSpeed :data.wind.speed,
            weatherIcon: data.weather[0].icon,
            weatherInfo: data.weather[0].main,
            weatherDescription: data.weather[0].description
          }
          this.weatherForecastData.push(hourlyData);
        });

       

        return cb(this.weatherForecastData);

      })
      .catch( (error) => {
       
        return cb(null);
      });

  }


  static getWeather(){
    
    return this.weatherData;
  }

  static getForecastWeather(){
    return this.weatherForecastData;
  }

}