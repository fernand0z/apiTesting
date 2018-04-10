$( document ).ready(function(){
    $(".button-collapse").sideNav();

    $('.carousel.carousel-slider').carousel({fullWidth: true});

    setInterval(function(){
        $('.carousel').carousel('next');
    }, 4000);
});

$(document).ready(function () {

    //Initial array of search types for specified location
    var searchTypes = ["Lodging", "Restaurants", "Parks", "Bars", "Banks"];
    var city = [""];
    var lat; //Latitude
    var lon; //Longitude
    //Variable to old city value from user input
    var c = document.getElementById("citySearch").value;
    c = c.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                });            
    $("#city-main-pic-text").text(c);
    $("#current-city").text("Current City: " + c);
    //Function to run after city entered, submit clicked
    $("#citySubmit").on("click", function () {
        //Empty the results div of any previous search results
        var c = document.getElementById("citySearch").value;
        $("#current-city").text("Current City: " + c);
        $("#city-main-pic-text").text(c);
        $("#results-main").empty();
        //Variable to hold google API key
        var googleAPIkey = "&key=AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc";
        //Variable to assemble the query URL
        var endpoint = "https://maps.googleapis.com/maps/api/geocode/json?address=" + c + googleAPIkey;
        //!!REMOVE AFTER DEUBUGGING
        console.log("Endpoint: " + endpoint);
        //AJAX function to get google API data
        this.endpoint = endpoint;
        $.ajax({
            url: this.endpoint,
            type: "GET", // The HTTP Method
            data: {}, // Additional parameters here
            dataType: "json",
            //Error handler
            error: function (err) {
                console.log(err);
            }

        }).done(function (data) {
            //!!REMOVE AFTER DBUGGING
            console.log(data);
            //Assign variables to returned longitude and latitude values from the data object
            var latitude = data.results[0].geometry.location.lat;
            var longitude = data.results[0].geometry.location.lng;
                //Capitalize first letter of city string
                c = c.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                });            
            //Display results to page
            console.log(latitude + "," + longitude);
            $("#coordinates").html("<br>" + "Results for:  " + c + "<hr>" + "Lat: " + latitude + "<br>"+ "Lng: " + longitude);
            //Set global lat and lon variables to the returned values
            lat = latitude;
            lon = longitude;
            //Run the weather API using the latitude and longitude values    
            locationWeather();
        });
    });

(function($) {
    $.fn.locationWeather = function(latitude, longitude) {
        //OpenWeatherMap API
        var weatherAPIKey = "743a4ef3c30935fe19ecbad14f631fae";
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + weatherAPIKey;
        console.log(weatherQueryURL);

        // Performing our AJAX GET request
        $.ajax({
            url: weatherQueryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function (response) {
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
    };
});

})(jQuery);

$.fn.locationWeather(33, -111);



// (function($) {

//     $.fn.geolocationfunc = function(placequery) {

//       var googleAPIkey = "AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc";
//       var mapaddress = "Phoenix AZ";
//       var endpoint = "https://maps.googleapis.com/maps/api/geocode/json?address=" + mapaddress + "&key=" + googleAPIkey;

//     $.ajax({
//         url: endpoint,
//         type: "GET", // The HTTP Method
//         dataType: "json",
//         error: function(err) {
//           console.log(err);
//         }
//     }).done(function(data) {
//         lat = data.results[0].geometry.bounds.northeast.lat;
//         lon = data.results[0].geometry.bounds.northeast.lng;
//         lat2 = data.results[0].geometry.bounds.southwest.lat;
//         lon2 = data.results[0].geometry.bounds.southwest.lng;
//         latitude = data.results[0].geometry.location.lat;
//         longitude = data.results[0].geometry.location.lng;
//         // lat  and lon perameters 
//       console.log(lat+lon+lat2+lon2+latitude+longitude);
//    });
//       // end ajax call 1

// }})(jQuery);

// $.fn.geolocationfunc();