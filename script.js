
import { keyValue } from './external.js';

const baseUrl= "http://api.weatherstack.com/current";

const myApiKey = keyValue;
const selectNode = document.getElementById("location");
const loadButton = document.getElementById("loadButton");
const containerNode = document.getElementById("weatherDataContainer");


async  function fetchData(location){
    const url = `${baseUrl}?access_key=${myApiKey}&query=${location}`;

    try {
        // fetch data from the url
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);  
        }
        const currentData = await response.json();
        console.log(currentData);
        // destructuring data
        const{ 
            current:{humidity, temperature, wind_degree, wind_dir, wind_speed},
            location:{name, country}
        } 
        = currentData;
        // push the destructured data into an empty array
        let weatherData =[];
        weatherData.push(humidity, temperature, wind_degree, wind_dir, wind_speed, name, country);
        console.log(weatherData);
        return weatherData;

    } catch(error){
        console.error(`Failed to fetch: ${error.message}`);
    }
}

loadButton.addEventListener("click", async() => {
    //Clear the old data
    containerNode.innerHTML ="";

    if(!selectNode.value){
        const errorNode = document.createElement('p');
        errorNode.innerHTML = "A city is required. Please select a city."
        containerNode.appendChild(errorNode);
        return;
    }
    const location = selectNode.value;
    const weatherDate = await fetchData(location);

    displayWeather(weatherDate,location);
});
console.log(baseUrl, myApiKey);


function displayWeather(weatherData,location){
    // add the head of the data
    const headNode = document.createElement('h2');
    headNode.textContent = `Current Weather in ${location}`;
    containerNode.appendChild(headNode);
    // display the weather data 
    const weatherDataNode = document.createElement('p');
    weatherDataNode.innerHTML = `Country:${weatherData[6]}<br>Ctiy:${weatherData[5]}<br>Tempreture:${weatherData[1]}<br>Humidity:${weatherData[0]}<br>Wind Degree:${weatherData[2]}<br>Wind Direction:${weatherData[3]} <br>Wind Speed:${weatherData[4]}<br>`;
    containerNode.appendChild(weatherDataNode); 
} 