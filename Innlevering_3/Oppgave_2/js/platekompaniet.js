(function(){

    var logo, cart = [];

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
                        "<article>"
                        + "<img src='../" + item.imageSrc + "'/>"
                        + "<h1>" + item.Title + "</h1>"
                        + "<p>" + item.Description + "</p>"
                        + "<div class='price'>"+ getPrice(item.priceCat)+ "</div>"
                        + "<img id='movieId"+ i +"'' src='../images/buy.png' alt='buy' class='buy' />" //onclick='putInCart(" + i + ");'
                        + "</article>"
                       );
                });
                $(".buy").click(function(){
                    putInCart(this.id);
                });
            } 
        });
    }

    var putInCart = function (element) {
        var movieId = element.substring(7);
        console.log("Movie id in JSON: " + movieId);
        //cart.push(movieId);
        $(".cart_icon").html("x (<span>"+ cart.length +"</span>)");
        $("#expandable div").append("<img><h2>"+getMovieName(movieId)+"</h2><p></p><a href='#'>Slett</a>");
        //console.log(cart);
    }

    var getMovieName = function (movieId) {
        $.getJSON('../js/movies.json', function(data) {
            return data.movies[movieId].Title;
        });
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