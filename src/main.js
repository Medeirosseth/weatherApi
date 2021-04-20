import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import WeatherService from './weather-service.js'

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
}
$('#weatherLocation').click(function () {
  let city = $('#location').val();
  clearFields();
  let promise = WeatherService.getWeather(city);
  promise.then(function (response) {
    const body = JSON.parse(response);
    const k = body.main.temp
    const Fahrenheit = Math.floor((k - 273.15) * 9 / 5 + 32)
    $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
    $('.showTemp').text(`The temperature in Kelvin is ${body.main.temp} degrees.`);
    $('.showFahrenheit').text(`The temperature in Fahrenheit is ${Fahrenheit} degrees.`);
    $('.showClouds').text(`The current cloud level in ${city} is ${body.clouds.all}`);
    $('.showWind').text(`The current Wind speed in ${city} is ${body.wind.speed}`);
    $('.showErrors').text("");
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request:${error}`);
    $('.showHumidity').text("");
    $('.showTemp').text("");
  });
});
    
  
