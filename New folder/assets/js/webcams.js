$("#citySubmit").on("click", function() {

     var lat = $("#lat").val();
  
     var lon = $("#lon").val();
  
     var lat2 = $("#lat2").val() + 2;
  
     var lon2 = $("#lon2").val() + 2;
  
  
        var mashapeauthkey = "Eg0ZQFdgZrmshgRuNT3elKYlPu0Mp1yQbzPjsnIocSuKYu0yV5";
        //use lat lon from alt app to populate coordinates

        var endpoint2 =
        "https://webcamstravel.p.mashape.com/webcams/list/bbox=" + lat + "," + lon + "," + lat2 + "," + lon2 + "?show=webcams%3Aimage%2Clocation";
  console.log(endpoint2);

    
    $.ajax({
        url: endpoint2,
        type: "POST", // The HTTP Method
        data: {},
        dataType: "json",
        error: function(err) {
        console.log(err);
        },
        beforeSend: function(xhr) {
          xhr.setRequestHeader("X-Mashape-Authorization","Eg0ZQFdgZrmshgRuNT3elKYlPu0Mp1yQbzPjsnIocSuKYu0yV5");
        }
    }).done(function(data2) {
      
        console.log(data2);
        for (var i = 0; i < data2.result.webcams.length; i++) {
            // create a "card" variable, it's going to be a div
            var card = $("<div>");
            card.addClass("card");
            var imagediv = $("<div>");
            imagediv.addClass("card-image");
            var img = $("<img>");
            img.attr("src", data2.result.webcams[i].image.current.preview);
            imagediv.html(img);
            card.html(imagediv);
            var cardcontent = $("<div>");
            cardcontent.addClass("card-content");
            var cardtitle = $("<div>");
            cardtitle.addClass("card-title");
            cardtitle.text(data2.result.webcams[i].title);
            cardcontent.html(cardtitle);
            card.append(cardcontent);
            $(".webcam").append(card);
        }
    });
      // end ajax call 2
   });
   