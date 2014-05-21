(function(){

    var komplettJSON, logo, cart = [];

    var init = function() {
        setObjects();
        getJSON();
        setEventHandlers();
    }

    var setObjects = function() {
       komplettJSON = "../js/movies.json";
       logo = $("#logo");
    }

    var setEventHandlers = function() {
        logo.click(function(event) {
            console.log("logo got clicked");
        });
    }

    var getJSON = function() {
        $.getJSON( komplettJSON, function(data){
            $.each(data.movies, function(i, item) {
                $("section#hovedInnhold").append(
                    "<article>"
                    + "<img src='../" + item.imageSrc + "'/>"
                    + "<h1>" + item.Title + "</h1>"
                    + "<p>" + item.Description + "</p>"
                    + "<div class='price'>"+ getPrice(item.priceCat)+ "</div>"
                    + "<img id='movieId"+ i +"'' src='../images/buy.png' alt='buy' class='buy' />"
                    + "</article>"
                );
            });
            $(".buy").click(function(){
                putInCart($(this).closest('article').children('h1'), this.id, $(this).closest('article').children('img').src);
            });
        });
    }

    var putInCart = function (title, id, imgUrl) {
        var title = title.html();
        var movieId = id.substring(7);

        console.log("movie id: " + movieId + " is called '" + title + "'");
        console.log(imgUrl);
        //Add clicked movie to cart, and update cartMenu
        cart.push(movieId);
        updateCartCount();
        $("#cartContent").append("<div>"+img+"<h2>"+title+"</h2><p></p><a class='delFromCart'>Slett</a></div>");
        $(".delFromCart").click(function(){
            delFromChart(this);
        });
    }

    var updateCartCount = function() {
        return $(".cart_icon").html("X (<span>"+ cart.length +"</span>)");
    }

    var delFromChart = function(element) {
        console.log("delete something!!");
        ($(element).parent()).remove();
        cart.splice(-1,1);
        updateCartCount();
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