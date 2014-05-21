(function(){

    var logo;

    var init = function() {
        getJSON();
        setObjects();
        setEventHandlers();
    }

    var setObjects = function() {
       logo = $("#logo");
       
    }

    var setEventHandlers = function() {
        logo.click(function(event) {
            console.log("logo got clicked");
        });
        
    }

    var getJSON = function() {
        $.ajax({
            url: "../js/movies.json",
            dataType: "json",
            success: function (data) {
                $.each(data.movies, function (i, item) {
                    $("section#hovedInnhold").append(
                        "<article><img src='../" + item.imageSrc + "'/>" + "<h1>" + item.Title + "</h1>" + "<p>" + item.Description + "</p>" + "<div class='price'>" + getPrice(item.priceCat) + "</div>" + "<img src='../images/buy.png' alt='buy.png' class='buy' />" + "</article>"
                       );
                });
                $(".buy").click(function(event) {
                    buyItem(this);
                });
            } 
        });
    }

    var buyItem = function (element) {
        console.log(element);
    }

    var getPrice = function (cat) {
        switch (cat) {
            case "A":
                return "149.<span class='cents'>50</span>"
                break;
            case "B":
                return "129.<span class='cents'>50</span>"
                break;
        }
    }

    var expandCart = function () {

    }


    $( document ).ready(init());

})();