$(document).ready(function () {

    //Initial array of search types for specified location
    var searchTypes = ["Lodging", "Restaurants", "Parks", "Bars", "Banks"];
    var city = [""];
    var lat; //Latitude
    var lon; //Longitude
    //Variable to old city value from user input
    var c = document.getElementById("citySearch").value;
    //!!REMOVE AFTER DEBUGGING
    console.log("Script City: " + c);

    //Function to run after city entered, submit clicked
    $("#citySubmit").on("click", function () {
        //Empty the results div of any previous search results
        var c = document.getElementById("citySearch").value;
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
            $("#result").html("Search for:  " + c + "<hr>" + "Lat: " + latitude + ",  Lng: " + longitude);
            //Set global lat and lon variables to the returned values
            lat = latitude;
            lon = longitude;
            //Run the weather API using the latitude and longitude values    
            locationWeather();
        });
    });

    //function to display search category buttons to the page
    function renderButtons() {
        $("#buttons").empty();
        //loop through the array of types/categories
        for (var i = 0; i < searchTypes.length; i++) {

            //generate buttons for each item in the array
            var buttonCreate = $("<button>");
            buttonCreate.addClass("type-buttons");  //Add a class to each button
            buttonCreate.attr("data-category", "&query=" + searchTypes[i]);  //Add a data-cateogry attribute with value of it's name
            buttonCreate.text(searchTypes[i]);  //Set button text
            $("#buttons").append(buttonCreate); //Append page div with the button
        }

        //This function listens for clicks on one of the category buttons
        $(".type-buttons").on("click", function () {
            var category = $(this).attr("data-category"); //Assign variable equal to data-category value
            //!!REMOVE AFTER DEBUGGING
            console.log("Search Category: " + category);
            //Empty results-main div of any previous results
            $("#results-main").empty();

            //Assign variables to hold latitude and longitude values
            var latitude = lat;
            var longitude = lon;
            //Assemble & format latitude, longitude for query URL
            var location = "&location=" + latitude + "," + longitude + "&radius=500";
            var urlKey = "&key=AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc";
            //Assigns variable to user input for no. results to return
            var resultsNum = $("#number").value;
            //Assemble complete query URL
            var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + category + location + urlKey;
            //!!REMOVE AFTER DEBUGGING
            console.log(queryURL);
            // Performing our AJAX GET request
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // After the data comes back from the API
                .then(function (response) {
                    // Storing an array of results in the resultsData variable
                    var resultData = response.results;
                    //!!REMOVE AFTER DEBUGGING
                    console.log(resultData);
                    x = document.getElementById("number").value;
                    console.log("Input number: " + x);
                    // Looping over every result item
                    for (var i = 0; i < x; i++) {
                        //    for (var i = 0; i < resultData.length; i++) {
                        // Creating a var for the result display section of the page
                        var resultDiv = $("<div class='result-divs'>");
                        // Set a variable to the place's name from the API
                        var placeName = response.results[i].name;
                        // Creating an element to have the name displayed
                        var pName = $("<p style='font-weight: bold;'>").text((i + 1) + ".   " + placeName);
                        var address = response.results[i].formatted_address;
                        var pAddress = $("<p>").text("Address: " + address);
                        //'If' function to check if the photo reference property is undefined
                        if (response.results[i].photos != undefined) {
                            //If not undefined, assign variable to hold photo_reference value
                            var picID = response.results[i].photos[0].photo_reference;
                            //Variable to create an HTML img element
                            var picHTML = $("<img>");
                            //Add src attribute to img element that assembles photo URL and attaches API key
                            picHTML.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + picID + "&key=AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc");
                            //Add result-photo class to each photo
                            picHTML.attr("class", "result-photo");
                            //Combine all of the results sections into the resultsDiv
                            resultDiv.append(pName, pAddress, picHTML);
                        } else {
                            //If photo_reference is undefined, append only the name and address divs to the result div
                            resultDiv.append(pName, pAddress);
                        }
                        //Update the page with the results
                        $("#results-main").append(resultDiv);
                    }
                });
        });
    };

    function locationWeather() {
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
                console.log(placeTemp);
                //Convert temp from Kelvin to Fahrenheit
                var tempF = Math.floor(placeTemp * (9 / 5) - 459.67);
                //Creating an element to have the temp displayed
                var pTemp = $("<p style='font-weight: bold;'>").text("Temp: " + tempF + "F");
                //Set a variable to the weather description
                var weatherDesc = response.weather[0].description;
                    //Method for weather desc string to capitalize first letter of each word 
                    weatherDesc = weatherDesc.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                        return letter.toUpperCase();
                    });
                //Create a paragraph element to display the weather description
                var pDesc = $("<p>").text(weatherDesc);
                var windSpeed = response.wind.speed;
                console.log("Windspeed: " + windSpeed);     
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

    renderButtons();
});
