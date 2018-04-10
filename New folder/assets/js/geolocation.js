$("#citySubmit").on("click", function() {

      var googleAPIkey = "AIzaSyDjoG9b-qqRgMcdpiNWXHei7WpRu1BmuBk";
      var mapaddress = $("#citySearch").val();
      var endpoint = "https://maps.googleapis.com/maps/api/geocode/json?address=" + mapaddress + "&key=" + googleAPIkey;

    $.ajax({
        url: endpoint,
        type: "GET", // The HTTP Method
        dataType: "json",
        error: function(err) {
          console.log(err);
        }
    }).done(function(data) {
        lat = data.results[0].geometry.bounds.northeast.lat;
        lon = data.results[0].geometry.bounds.northeast.lng;
      
      $("#lat").val(lat);
      $("#lon").val(lon);
      
        lat2 = data.results[0].geometry.bounds.southwest.lat;
        lon2 = data.results[0].geometry.bounds.southwest.lng;
      
      
      $("#lat2").val(lat2);
      $("#lon2").val(lon2);
      
        // lat  and lon perameters 
      console.log(lat+lon+lat2+lon2);
   });
      // end ajax call 1
});