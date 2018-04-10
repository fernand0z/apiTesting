$("#citySubmit").on("click", function() {

    //OpenWeatherMap API
    var weatherAPIKey = "743a4ef3c30935fe19ecbad14f631fae";

    var lat = $("#lat").val();
    var lon = $("#lon").val();
    var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + weatherAPIKey;
    console.log(weatherQueryURL);

    // Performing our AJAX GET request
    $.ajax({
            url: weatherQueryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .then(function(response) {
            //Storing an array of results in the results variable
            var weatherData = response.weather;
            //A div to hold the weather data
            var weatherDiv = $("<div class='weather-divs'>");
            //Set a variable to the temp from the API
            var placeTemp = response.main.temp;
            //Convert temp from Kelvin to Fahrenheit
            var tempF = Math.floor(placeTemp * (9 / 5) - 459.67);
            //Creating an element to have the temp displayed
            $("#high-temp-text").text(tempF);
            var pTemp = $("<p style='font-weight: bold;'>").text("Temp: " + tempF + "F");
            //Set a variable to the weather description
            var weatherDesc = response.weather[0].description;
            //Method for weather desc string to capitalize first letter of each word 
            weatherDesc = weatherDesc.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            //Create a paragraph element to display the weather description
            var pDesc = $("<p>").text(weatherDesc);
            // Set a variable to the icon code for the current weather
            var iconCode = response.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
            console.log(iconURL);
            var iconHTML = $("<img>");
            iconHTML.attr("src", iconURL);
            iconHTML.attr("class", "weather-icon");
            //Update weather div with the temp and weather icon
            weatherDiv.append(pTemp, pDesc, iconHTML);
            //Update page with the weather div content
            $("#result").append(weatherDiv);
        });


});