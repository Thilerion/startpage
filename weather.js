//api.openweathermap.org/data/2.5/weather?q={city name},{country code ISO 3166}
//api.openweathermap.org/data/2.5/weather?q=Rotterdam,nl

//api.openweathermap.org/data/2.5/weather?id={city code}
//Rotterdam city code: 2747891

//API call ends with &APPID={APIKEY}
//APIKEY: 5d51498de66c9894821f660dda39c68b

/*
http://api.wunderground.com/api/{API-KEY}/{features}/{settings}/q/{query.format}

Features:
	conditions
		current temp, weather condition, humidity, feels like temp, barometric pressure, visibility
	geolookup
		city name, zip code, lat/long coords, nearby weather statiosn
		
Settings:
	lang
		default: EN
		possible: NL
		written as: lang:NL
		
Query:
	Netherlands/Rotterdam
	autoip
	
Format:
	json or xml
	
example:

http://api.wunderground.com/api/fbe7051340118408/geolookup/conditions/forecast/q/autoip.json
*/

var returnWeather = function(test) {
	let baseUrl = "http://api.wunderground.com/api/";
	let apiKey = "fbe7051340118408";
	let settings = ["geolookup", "conditions", "forecast"];
	let language = "lang:" + prefs.get.general.language.toUpperCase();
	let query = "autoip";
	let format = "json";
	
	let complete = baseUrl + apiKey + "/" + settings.join("/") + "/" + language + "/q/" + query + "." + format;
	console.log(complete);
	
	/* FOR TESTING PURPOSES, SO AS NOT TO SPAM WUNDERGROUND */
	if (test === true) {
		complete = "/json/wunderground_test.json";
	}	
	/* END TEST JSON */
	
	fetch(complete).then(function(response) {
		console.log(response);
		return response.json();		
	}).then(function(myResponse) {
		var r = myResponse;
		console.log(myResponse);
		displayWeatherData(myResponse);
	});
};

function displayWeatherData(data) {	
	let city = data.current_observation.display_location.city;
	let country = data.current_observation.display_location.state_name;
	
	let wLocation = city + ", " + country;
	let idWeatherLocation = document.getElementById("weatherLocation");
	idWeatherLocation.innerHTML = wLocation;
	
	let currentTemp = data.current_observation.temp_c;
	let idWeatherTemp = document.getElementById("weatherTemp");
	idWeatherTemp.innerHTML = currentTemp + "&deg;C";
	
	let currentFeelsLike = data.current_observation.feelslike_c;
	let idWeatherFeelsLike = document.getElementById("weatherFeelsLike");
	idWeatherFeelsLike.innerHTML = "Voelt als " + currentFeelsLike + "&deg;C";
	
	let weatherDescription = data.current_observation.weather;
	let idWeatherDescription = document.getElementById("weatherDescription");
	idWeatherDescription.innerHTML = weatherDescription;
	
	let weatherIconClass = "wi wi-wu-" + data.current_observation.icon;
	let weatherIconNode = document.createElement("i");
	weatherIconNode.setAttribute("class", weatherIconClass);
	let iconParent = idWeatherTemp.parentNode;
	iconParent.insertBefore(weatherIconNode, idWeatherTemp);
}