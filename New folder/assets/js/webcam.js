var googleAPIkey = "AIzaSyDjoG9b-qqRgMcdpiNWXHei7WpRu1BmuBk";

var mapaddress = "Phoenix AZ";
var endpoint = "https://maps.googleapis.com/maps/api/geocode/json?address=" + mapaddress + "&key=" + googleAPIkey;

function queryMapsAPI() {
    this.endpoint = endpoint;
    $.ajax({
        url: this.endpoint,
        type: "GET", // The HTTP Method
        data: {}, // Additional parameters here
        dataType: "json",
        error: function(err) {
        console.log(err);
        }
        /**,
    beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", mashapeauthkey);
    }**/
    }).done(function(data) {
        console.log(data);
        lat = data.results[0].geometry.bounds.northeast.lat;
        lon = data.results[0].geometry.bounds.northeast.lng;
        lat2 = data.results[0].geometry.bounds.southwest.lat;
        lon2 = data.results[0].geometry.bounds.southwest.lng;
        // lat  and lon perameters 
        getwebcams(lat, lon, lat2, lon2);
    });

}
queryMapsAPI();













function getwebcams(lat, lon, lat2, lon2) {
    var mashapeauthkey = "Eg0ZQFdgZrmshgRuNT3elKYlPu0Mp1yQbzPjsnIocSuKYu0yV5";
    //use lat lon from alt app to populate coordinates

    var endpoint =
    "https://webcamstravel.p.mashape.com/webcams/list/bbox=" +
    lat +
    "," +
    lon +
    "," +
    lat2 +
    "," +
    lon2 +
    "?show=webcams%3Aimage%2Clocation";

    this.endpoint = endpoint;
    $.ajax({
        url: this.endpoint,
        type: "POST", // The HTTP Method
        data: {},
        dataType: "json",
        error: function(err) {
        console.log(err);
        },
        beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", mashapeauthkey);
        }
    }).done(function(data) {
        console.log(data);
        // $.each(data.result.webcams, function(key, value ) {


        for (var i = 0; i < data.result.webcams.length; i++) {

            // create a "card" variable, it's going to be a div
            var card = $("<div>");

            // give that div a class "card"
            card.addClass("card");

            //create another variable for the image div
            var imagediv = $("<div>");

            // give that image div the class of card-image
            imagediv.addClass("card-image");

            // create a 3rd variable called img, it will be an <img> element
            var img = $("<img>");

            // we give that img element a src attribute from the data
            img.attr("src", data.result.webcams[i].image.current.preview);

            // set the HTML for the imagediv div to contain the img element
            // <div class="card-image"><img src="whateverthesrcis"></div>
            imagediv.html(img);

            // <div class="card"><div class="card-image"><img src...></div></div>
            card.html(imagediv);

            // another variable cardcontent is a div
            var cardcontent = $("<div>");

            // give that div a class of card-content
            cardcontent.addClass("card-content");

            // yet another variable cardtitle
            var cardtitle = $("<div>");

            // add card-title class to that div
            cardtitle.addClass("card-title");

            // set text of card-title div to say the webcam title
            cardtitle.text(data.result.webcams[i].title);

            // cardcontent div should contain the card title
            cardcontent.html(cardtitle);

            // append the card content variable to the div with the class of card
            card.append(cardcontent);


            // $("#webcams").html(webcamdiv);
            $("#webcams").append(card);
        }
    });
}
