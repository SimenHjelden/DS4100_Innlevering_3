(function(){

    var komplettJSON, logo, cart = [], cartLink, cartOpen, cartCloseLink;

    var init = function() {
        setObjects();
        getJSON();
        setEventHandlers();
    }

    var setObjects = function() {
       komplettJSON = "../js/movies.json";
       logo = $("#logo");
       cartLink = $(".cart_icon");
       cartOpen = false;
       cartCloseLink = $(".hideCart");
    }

    var setEventHandlers = function () {
        cartLink.click(function () {
            if (!cartOpen) {
                $("#expandable").css("display", "block");
                console.log("expand cart clicked");
                cartLink.addClass("cartOpen");
                cartOpen = true;
            }
            else {
                $("#expandable").css("display", "none");
                cartOpen = false;
                cartLink.removeClass("cartOpen");
            }
        });
      
        cartCloseLink.click(function () {
            $("#expandable").css("display", "none");
            cartLink.removeClass("cartOpen");
            cartOpen = false;
         });
    }

    var getJSON = function() {
        $.getJSON( komplettJSON, function(data){
            $.each(data.movies, function(i, item) {
                var price = getPrice(item.priceCat);
                $("section#hovedInnhold").append(
                    "<article id='movieId"+ i +"'>"
                    + "<img src='../" + item.imageSrc + "'/>"
                    + "<h1>" + item.Title + "</h1>"
                    + "<p>" + item.Description + "</p>"
                    + "<div class='price'>" + price.slice(0,-2) + "<span class='cents'>" + price.substr(price.length - 2) + "</span></div>"
                    + "<img src='../images/buy.png' alt='buy' class='buy' />"
                    + "</article>"
                );
            });
            $(".buy").click(function(){
                putInCart($(this));

                $("#expandable").css("display", "block");
                cartOpen = true;
            });
        });
    }

    /*
        Check if movie allready is added to cart, in that case set an counter of it to +1
        If the added movie does noe exist in cart add a new object in cart-array
        Update the cart
    */
    var putInCart = function (element) {
        var title = element.closest('article').children('h1').html();
        var id = element.closest('article').attr('id').slice(7);
        var url = element.closest('article').children('img').attr('src');

        //console.log("movie id: " + movieId + " is called '" + title + "'");
        //console.log(imgUrl);

        var found = false;
        if(cart.length < 1) {
            console.log("There was nothing in the cart baby, therefor lets add the the movie " + title);
            addMovie(id, title, url, 1);
            console.log(title + " added!\n");
        } else {
            console.log("Lets check if "+title+" is allready added in your cart...");
            for(var i=0; i<cart.length; i++) {
                if(cart[i].movieId === id) {
                    console.log("Yes it is, you've allready got " + cart[i].count + "x of " + title + " in you cart. Lets just add an extra.");
                    cart[i].count++;
                    console.log(title + " added! Wow, now you've got " + cart[i].count + "x of that badboy in your cart!\n");
                    found = true;
                    updateCart();
                    break;
                }
            }
            if(!found) {
                console.log("Looks like you don't got this movie in your cart, lets add it!");
                console.log(title + " added!\n");
                addMovie(id, title, url, 1);
            }
        }
    }

    var addMovie = function(id, title, url, count) {
        $.getJSON( komplettJSON, function(data){
            var price = getPrice(data.movies[id].priceCat);
            cart.push({"movieId" : id, "title" : title, "img" : url, "count" : 1, "price" : price});
            updateCart();
        });
        
    }

    /*
        Updates the cart bro!
        Move along officer..
    */
    var updateCart = function() {
        $("#cartContent").html("");
        cart.count = 0;
        $.each(cart, function(i, item){
            $("#cartContent").append(
                "<div>"
                    +"<img src='"+item.img+"' alt='"+item.title+"' />"
                    + "<h2>"+item.title+"</h2></br><p class='movieCount'>"+cart[i].count+"x</p></br>"
                    +"<p class='price'>Pris: "+ (parseFloat(cart[i].count) * parseFloat(cart[i].price)).toFixed(2) +"NOK</p>"
                    +"<a class='removeItem'></a>"
                +"</div>");
            cart.count += item.count;
        });
        $(".cart_icon").html("X (<span>" + cart.count + "</span>)");
        $(".removeItem").click(function(){
            console.log("Whats up with that stupid movie, I cant stand it! Lets remove it right now!");
            removeItem($(this).closest('div'));
        });
        if(cart.count == "0") {
            $("#expandable").hide();
        }
    }

    /*
        Lets remove that movie, I hate it!
    */
    var removeItem = function(stupidMovie) {
        for(var i=0; i<cart.length; i++) {
            console.log("lets find that stinkin " + stupidMovie.children('img').attr('alt') + " movie..");
            if(cart[i].title === stupidMovie.children('img').attr('alt')) {
                console.log("found it!");
                if(cart[i].count <= 1) {
                    console.log("luckily, there is only one of its kind in your cart, lets just throw it out!");
                    removeFromCart(cart[i]);
                    updateCart();
                } else {
                    console.log("you've got like " + cart[i].count + "x of that stupid " + stupidMovie.children('img').attr('alt') + " movie, let me throw away just one.\n");
                    cart[i].count--;
                }
                break;
            }
        }
        updateCart();
    }

    var removeFromCart = function(item) {
        cart = jQuery.grep(cart, function(value){
            return value != item;
        });
    }

    var getPrice = function (cat) {
        switch (cat) {
            case "A":
                return "149.50"
                break;
            case "B":
                return "129.50"
                break;
        }
    }



    $( document ).ready(init());

})();