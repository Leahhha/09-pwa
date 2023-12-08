require('dotenv').config()
const express = require('express');
const app = express();

// const API_KEY = process.env.API_KEY;

// console.log(API_KEY)

// ////////WHWHST//WHATAWHATWHATWHAT
// app.get('/weather', (req, res) => {
//   // Use API_KEY and make requests to the weather API here
//   // Return the weather data as a response
//   res.json({ apiKey: API_KEY });
// });
// app.get('/api/key', (req, res) => {
//     res.json({ apiKey: process.env.API_KEY });
//   });


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('weather', {
        MY_VARIABLE: process.env.MY_VARIABLE // Pass environment variables to the HTML template
    });
});

app.listen(3000, () => {
    console.log('Server listening at http://localhost:3000');
});


// async function askQuestion() {
// let majorCity = ['New York', 'London', 'Paris', 'Hongkong'];
// let baseUrl = 'http://api.weatherapi.com/v1/forecast.json?key='+ API_KEY +'&q='; // Replace with your actual base URL

// let urls = majorCity.map(city => {
//     return baseUrl + encodeURIComponent(city) + '&days=1&aqi=yes&alerts=no';
// });

// const responses = await Promise.all(urls.map(url => fetch(url)));
// const jsonData = await Promise.all(responses.map(response => response.json()));

// console.log(jsonData); // Array of JSON data for each city

// let usEPAIndex2 = ['N/A', 'Good', 'Moderate', 'Unhealthy for sensitive group', 'Unhealthy', 'Very Unhealthy', 'Hazardous']

// // Initialize arrays to store data for each city
// const locations = [];
// const localTimes = [];
// const avgTemperatures = [];
// const sunriseTimes = [];
// const sunsetTimes = [];
// const avgHumidities = [];
// const precipitations = [];
// const maxWindspeeds = [];
// const icons = [];
// const iconTexts = [];
// const usEPAIndices = [];

// // Process data for each city
// jsonData.forEach((cityData, index) => {
//     locations[index] = cityData.location.name;
//     localTimes[index] = 'Localtime: ' + cityData.location.localtime;

//     // Store average temperatures for each city
//     const avgTempC = cityData.forecast.forecastday[0].day.avgtemp_c;
//     const avgTempF = cityData.forecast.forecastday[0].day.avgtemp_f;
//     avgTemperatures[index] = avgTempF + '°F / ' + avgTempC + '°C';
    
//     // Store sunrise and sunset times
//     sunriseTimes[index] = 'Sunrise: ' + cityData.forecast.forecastday[0].astro.sunrise;
//     sunsetTimes[index] = 'Sunset: ' + cityData.forecast.forecastday[0].astro.sunset;

//     // Store average humidity, precipitation, max windspeed, icon, icon text, and air quality
//     avgHumidities[index] = 'Humidity: ' + cityData.forecast.forecastday[0].day.avghumidity + '%';
//     precipitations[index] = 'Precipitation: ' + cityData.forecast.forecastday[0].day.daily_chance_of_rain + '%';
//     maxWindspeeds[index] = 'Wind: ' + cityData.forecast.forecastday[0].day.maxwind_mph + 'mph' + '/' + cityData.forecast.forecastday[0].day.maxwind_kph + 'kph';
//     icons[index] = 'https:' + cityData.current.condition.icon;
//     iconTexts[index] = cityData.current.condition.text;

//     const usEPAIndex = cityData.current.air_quality['us-epa-index'];
//     usEPAIndices[index] = 'Air Quality: ' + usEPAIndex2[usEPAIndex];
// });

// console.log(locations); // Array of city names
// console.log(localTimes); // Array of local times
// console.log(avgTemperatures); // Array of average temperatures
// console.log(sunriseTimes); // Array of sunrise times
// console.log(sunsetTimes); // Array of sunset times
// console.log(avgHumidities); // Array of average humidities
// console.log(precipitations); // Array of precipitations
// console.log(maxWindspeeds); // Array of max windspeeds
// console.log(icons); // Array of icons
// console.log(iconTexts); // Array of icon texts
// console.log(usEPAIndices); // Array of air quality info


// // Find the container where you want to display the data
// const dataContainer = document.getElementById('data-container');

// // Loop through the stored data arrays and create HTML elements
// locations.forEach((location, index) => {
//     const cityContainer = document.createElement('div');
//     cityContainer.classList.add('city-container');

//     const cityHeading = document.createElement('h2');
//     cityHeading.textContent = location;

//     const localTimePara = document.createElement('p');
//     localTimePara.textContent = localTimes[index];

//     const avgTempPara = document.createElement('p');
//     avgTempPara.textContent = avgTemperatures[index];

//     const sunriseTimesPara = document.createElement('p');
//     sunriseTimesPara.textContent = sunriseTimes[index];
    
//     const sunsetTimesPara = document.createElement('p');
//     sunsetTimesPara.textContent = sunsetTimes[index];

//     const avgHumiditiesPara = document.createElement('p');
//     avgHumiditiesPara.textContent = avgHumidities[index];
    
//     const precipitationsPara = document.createElement('p');
//     precipitationsPara.textContent = precipitations[index];

//     const maxWindspeedsPara = document.createElement('p');
//     maxWindspeedsPara.textContent = maxWindspeeds[index];

//     const iconsElement = document.createElement('img');
//     iconsElement.src = icons[index];
//     iconsElement.style.width = '15%'; // Set the width here
//     iconsElement.alt = 'Weather Icon'; // Optionally set alt text for accessibility
//     iconsElement.id = 'weatherIcon'; // Set the desired id value here


//     const iconTextsPara = document.createElement('p');
//     iconTextsPara.textContent = iconTexts[index];
//     iconTextsPara.id = 'icon_Texts'; // Set the desired id value here

//     const usEPAIndicesPara = document.createElement('p');
//     usEPAIndicesPara.textContent = usEPAIndices[index];
    
//     // Create other elements for sunrise, sunset, humidity, precipitation, max windspeed, icon, icon text, air quality

//     cityContainer.appendChild(cityHeading);
//     cityContainer.appendChild(localTimePara);
//     cityContainer.appendChild(avgTempPara);
//     cityContainer.appendChild(sunriseTimesPara);
//     cityContainer.appendChild(sunsetTimesPara);
//     cityContainer.appendChild(avgHumiditiesPara);
//     cityContainer.appendChild(precipitationsPara);
//     cityContainer.appendChild(maxWindspeedsPara);
//     cityContainer.appendChild(iconsElement);
//     cityContainer.appendChild(iconTextsPara);
//     cityContainer.appendChild(usEPAIndicesPara);



//     dataContainer.appendChild(cityContainer);
//     cityContainer.classList.add('city-data'); // Add a class for styling purposes
// });

// // /////////////// location
// // const location = jsonData[0].location.name
// // console.log(location)

// // const location1 = jsonData[1].location.name


// // const location2 = jsonData[2].location.name


// // const location3 = jsonData[3].location.name
// // // console.log(location3)

// // ////////////// local time
// // const localTime = 'Localtime: ' + jsonData[0].location.localtime
// // console.log(localTime)

// // const localTime1 = 'Localtime: ' + jsonData[1].location.localtime

// // const localTime2 = 'Localtime: ' + jsonData[2].location.localtime

// // const localTime3 = 'Localtime: ' + jsonData[3].location.localtime
// // // console.log(localTime3)

// // ////////////// average temp C
// // const avgTemp_c = jsonData[0].forecast.forecastday[0].day.avgtemp_c
// // // console.log(avgTemp_c)

// // ////////////// average temp f
// // const avgTemp_f = jsonData[0].forecast.forecastday[0].day.avgtemp_f
// // // console.log(avgTemp_f)

// // const avgTemp_fc = avgTemp_f + '°F' + '/' + avgTemp_c + '°C'
// // console.log(avgTemp_fc)

// // // sunrise time
// // const sunriseTime = 'Sunrise: ' + jsonData[0].forecast.forecastday[0].astro.sunrise 
// // console.log(sunriseTime)

// // // sunsettime
// // const sunsetTime = 'Sunset: ' + jsonData[0].forecast.forecastday[0].astro.sunset
// // console.log(sunsetTime)

// // // avg humidity
// // const avgHumidity = 'Humidity: ' + jsonData[0].forecast.forecastday[0].day.avghumidity + '%'
// // console.log(avgHumidity)

// // // Precipitation
// // const precipitation = 'Precipitation: ' + jsonData[0].forecast.forecastday[0].day.daily_chance_of_rain + '%'
// // console.log(precipitation)

// // // maxWindspeed 
// // const maxWindspeed = 'Wind: ' + jsonData[0].forecast.forecastday[0].day.maxwind_mph + 'mph' + '/' + jsonData[0].forecast.forecastday[0].day.maxwind_kph + 'kph'
// // console.log(maxWindspeed)

// // // weather icon
// // const icon = 'https:' + jsonData[0].current.condition.icon
// // console.log(icon)

// // // text for icon - describe the current weather like
// // const iconText = jsonData[0].current.condition.text
// // console.log(iconText)

// // // air_quality - usEPAIndex
// // // Dynamically access the JSON element with a computed key
// // const usEPAIndex = source_data.current.air_quality['us-epa-index'];
// // const usEPAIndex3 = 'Air Quality: ' + usEPAIndex2[usEPAIndex];

// // console.log(usEPAIndex3);


// title.innerHTML = location 
// local_time.innerHTML = localTime
// avgtemp_fc.innerHTML = avgTemp_fc 
// sunrisetime.innerHTML = sunriseTime
// sunsettime.innerHTML = sunsetTime 
// wind.innerHTML = maxWindspeed
// humidity.innerHTML = avgHumidity
// precipitationn.innerHTML = precipitation
// air_quality.innerHTML = usEPAIndex3
// icontext.innerHTML = iconText

// img_answer.innerHTML = "<img src='"+ icon +"'style='width:15%;'/>"
// }

// // Call the function when the page loads
// window.onload = askQuestion;



// ///////////////Button click, call api
// const button = document.getElementById("ask")
// button.addEventListener('click', askQuestion1)

// async function askQuestion1() {
// let url = 'http://api.weatherapi.com/v1/forecast.json?key='+ API_KEY +'&q='

// url1 = url + question.value+'&days=1&aqi=yes&alerts=no'
// console.log(url1)

// const response = await fetch(url1)
// // console.log(response)

// const source_data = await response.json()
// console.log(source_data)

// let usEPAIndex2 = ['N/A', 'Good', 'Moderate', 'Unhealthy for sensitive group', 'Unhealthy', 'Very Unhealthy', 'Hazardous']

// // location
// const location = source_data.location.name
// console.log(location)

// // local time
// const localTime = 'Localtime: ' + source_data.location.localtime
// console.log(localTime)


// // average temp C
// const avgTemp_c = source_data.forecast.forecastday[0].day.avgtemp_c
// // console.log(avgTemp_c)

// // average temp f
// const avgTemp_f = source_data.forecast.forecastday[0].day.avgtemp_f
// // console.log(avgTemp_f)

// const avgTemp_fc = avgTemp_f + '°F' + '/' + avgTemp_c + '°C'
// console.log(avgTemp_fc)

// // sunrise time
// const sunriseTime = 'Sunrise: ' + source_data.forecast.forecastday[0].astro.sunrise 
// console.log(sunriseTime)

// // sunsettime
// const sunsetTime = 'Sunset: ' + source_data.forecast.forecastday[0].astro.sunset
// console.log(sunsetTime)

// // avg humidity
// const avgHumidity = 'Humidity: ' + source_data.forecast.forecastday[0].day.avghumidity + '%'
// console.log(avgHumidity)

// // Precipitation
// const precipitation = 'Precipitation: ' + source_data.forecast.forecastday[0].day.daily_chance_of_rain + '%'
// console.log(precipitation)

// // maxWindspeed 
// const maxWindspeed = 'Wind: ' + source_data.forecast.forecastday[0].day.maxwind_mph + 'mph' + '/' + source_data.forecast.forecastday[0].day.maxwind_kph + 'kph'
// console.log(maxWindspeed)

// // weather icon
// const icon = 'https:' + source_data.current.condition.icon
// console.log(icon)

// // text for icon - describe the current weather like
// const iconText = source_data.current.condition.text
// console.log(iconText)

// // air_quality - usEPAIndex
// // Dynamically access the JSON element with a computed key
// const usEPAIndex = source_data.current.air_quality['us-epa-index'];
// const usEPAIndex3 = 'Air Quality: ' + usEPAIndex2[usEPAIndex];
// // usEPAIndex: number from 1-6; usEPAIndex2: using an array to convert numbers to words; usEPAIndex3: final version that shows words to viewers  
// // console.log(usEPAIndex);

// console.log(usEPAIndex3);


// // log data to html 
// title.innerHTML = location 
// local_time.innerHTML = localTime
// avgtemp_fc.innerHTML = avgTemp_fc 
// sunrisetime.innerHTML = sunriseTime
// sunsettime.innerHTML = sunsetTime 
// wind.innerHTML = maxWindspeed
// humidity.innerHTML = avgHumidity
// precipitationn.innerHTML = precipitation
// air_quality.innerHTML = usEPAIndex3
// icontext.innerHTML = iconText

// img_answer.innerHTML = "<img src='"+ icon +"'style='width:15%;'/>"
// }