$(document).ready(function () {

    //Initial array of search types for specified location
    var searchTypes = ["Lodging", "Restaurants", "Parks", "Bars", "Banks"];
    var city = ["Honolulu"];

    //function to display search category buttons to the page
    function renderButtons() {
        $("#buttons").empty();

        //loop through the array of types/categories
        for (var i = 0; i < searchTypes.length; i++) {

            // //DEBUGGING REMOVE AFTER TESTING
            // var typeName = searachTypes[i].attr("data-category");

            //generate buttons for each item in the array
            var buttonCreate = $("<button>");
            buttonCreate.addClass("type-buttons");
            buttonCreate.attr("data-category", "&query=" + searchTypes[i]);
            buttonCreate.text(searchTypes[i]);
            $("#buttons").append(buttonCreate);
        }

        // This function handles when the search submit button is clicked
        //$("#add-type").on("click", function(event) { 
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        // event.preventDefault();
        // This line grabs the input from the textbox
        // var type = $("#search-input").val().trim();
        // Adding the search query from the textbox to our array
        // searchTypes.push(type);
        // Calling renderButtons which handles the processing of the searchTypes array
        // renderButtons();
        // })

        //This function listens for clicks on one of the category buttons
        $(".type-buttons").on("click", function () {
            var category = $(this).attr("data-category");
            console.log("Search Category: " + category);
            $("#results-main").empty();

            // Display results info
            //Possibly unecessary
            //function displayResultsInfo() {

            var city = ["Honolulu, HI"];
            var latitude = '21.276';
            var longitude = '-157.820';
            var location = "&location=" + latitude + "," + longitude + "&radius=500";
            var urlKey = "&key=AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc";
            //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.303,-111.838&radius=500&type=lodging&key=AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc
            var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + category + location + urlKey;
            console.log(queryURL);

            // Performing our AJAX GET request
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // After the data comes back from the API
                .then(function (response) {
                    // Storing an array of results in the results variable
                    var resultData = response.results;
                    console.log(resultData);
                    // Looping over every result item
                    for (var i = 0; i < resultData.length; i++) {

                        // Creating a var for the result display section of the page
                        var resultDiv = $("<div class='result-divs'>");

                        // Set a variable to the place's name from the API
                        var placeName = response.results[i].name;
                        // Creating an element to have the name displayed
                        var pName = $("<p>").text((i + 1) + ".  " + "Name: " + placeName);
                        var address = response.results[i].formatted_address;
                        var pAddress = $("<p>").text("Address: " + address);
                        // Photo search URL https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAPq7bOqj7eU2x1lKCRisXylg6lC9_BFrt4DLxjuF5cRICRUtr3yaSaMu2YBoFV8pSPuHoWB5yobXg6Wjy-pQ6MoKUB7FORuPxI48K24SaVsJHjZqGarOMIeFwj1nKFmHpEhApcxHwso7aD666CHzqAw4BGhTwt9KPMnX022zMTmms0T6y-ZDFkg&key=AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc
                        if (response.results[i].photos != undefined) {
                            //Check if search result has a photo available, if not append only the name and address
                            var picID = response.results[i].photos[0].photo_reference;
                            var picHTML = $("<img>");
                            picHTML.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + picID + "&key=AIzaSyBKV1JVEtr31cn9Hpi6L8d-dCN8cCSQISc");
                            picHTML.attr("class", "result-photo");
                            //Combine all of the results sections into the resultsDiv
                            resultDiv.append(pName, pAddress, picHTML);
                        } else {
                            resultDiv.append(pName, pAddress);
                        }
                        //Update the page with the results
                        $("#results-main").append(resultDiv);
                    }
                });
        });
    };
    // Calling the renderButtons function to display the intial buttons
    

    //OpenWeatherMap API
    var weatherAPIKey = "743a4ef3c30935fe19ecbad14f631fae";
    var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +city + "&APPID=" + weatherAPIKey;
            console.log(weatherQueryURL);

            // Performing our AJAX GET request
            $.ajax({
                url: weatherQueryURL,
                method: "GET"
            })
                // After the data comes back from the API
                .then(function (response) {
                    // Storing an array of results in the results variable
                    var weatherData = response.weather;                
                    //A div to hold the weather data
                    var weatherDiv = $("<div class='weather-divs'>");

                        // Set a variable to the temp from the API
                        var placeTemp = response.main.temp;
                        console.log(placeTemp);
                        //convert temp from Kelvin to Fahrenheit
                        var tempF = Math.floor(placeTemp * (9/5) - 459.67);
                        // Creating an element to have the temp displayed
                        var pTemp = $("<p>").text("Temp: " + tempF + "F");
                        // Set a variable to the icon code for the current weather
                        var iconCode = response.weather[0].icon;
                        var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
                        console.log(iconURL);
                        var iconHTML = $("<img>");
                        iconHTML.attr("src", iconURL);
                        iconHTML.attr("class", "weather-icon");
                        //Update weather div with the temp and weather icon
                        weatherDiv.append(pTemp, iconHTML);
                        //Update page with the weather div content
                        $("#form-div").append(weatherDiv);
                });
            
            renderButtons();
});
