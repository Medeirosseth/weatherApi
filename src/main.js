import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import WeatherService from "./weather-service.js";

function clearFields() {
  $("#location").val("");
  $(".showErrors").text("");
  $(".showHumidity").text("");
  $(".showTemp").text("");
}

function getElements(response) {
  if (response.main) {
    const k = response.main.temp;
    const Fahrenheit = Math.floor(((k - 273.15) * 9) / 5 + 32);

    $(".showHumidity").text(
      `The humidity in ${response.name} is ${response.main.humidity}%`
    );
    $(".showTemp").text(
      `The temperature in Kelvin is ${response.main.temp} degrees.`
    );
    $(".showFahrenheit").text(
      `The temperature in Fahrenheit is ${Fahrenheit} degrees.`
    );
    $(".showClouds").text(
      `The current cloud level in ${response.name} is ${response.clouds.all}`
    );
    $(".showWind").text(
      `The current Wind speed in ${response.name} is ${response.wind.speed}`
    );
  } else {
    $(".showErrors").text("");
    $(".showErrors").text(`There was an erro:${response.message}`);
  }
}

async function makeApiCall(city) {
  const response = await WeatherService.getWeather(city);
  getElements(response);
}

$(document).ready(function () {
  $("#weatherLocation").click(function () {
    let city = $("#location").val();
    clearFields();
    makeApiCall(city);
  });
});
