(function(){

    var komplettJSON, logo, cart = [], cartLink, cartOpen, cartCloseLink, expandable;

    var init = function() {
        setObjects();
        getJSON();
        setEventHandlers();
    }

    var setObjects = function() {
       komplettJSON = "../js/movies.json";
       cartLink = $(".cart_icon");
       cartOpen = false;
       cartCloseLink = $(".hideCart");
       expandable = $("#expandable");
    }

    var setEventHandlers = function () {
        cartLink.click(function () {
            if (!cartOpen) {
                expandable.css("display", "block");
                console.log("expand cart clicked");
                cartLink.addClass("cartOpen");
            }
            else {
                expandable.css("display", "none");
                cartLink.removeClass("cartOpen");
            }
            cartOpen = !(cartOpen);
        });
      
        cartCloseLink.click(function () {
            expandable.css("display", "none");
            cartLink.removeClass("cartOpen");
            cartOpen = !(cartOpen);
         });
    }

    /*
        Reads the json-object containing all avalible movies, 
        and renders them as articles in the section with id of hovedInnhold
    */
    var getJSON = function() {
        $.getJSON( komplettJSON, function(data){
            $.each(data.movies, function(i, item) {
                $("section#hovedInnhold").append(
                    "<article id='movieId"+ i +"'>"
                    + "<img src='../" + item.imageSrc + "'/>"
                    + "<h1>" + item.Title + "</h1>"
                    + "<p>" + item.Description + "</p>"
                    + "<div class='price'>" + getPrice(item.priceCat, 1) + "</span></div>"
                    + "<img src='../images/buy.png' alt='buy' class='buy' />"
                    + "</article>"
                );
            });
            $(".buy").click(function(){
                putInCart($(this));
                expandable.css("display", "block");
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

    /*
        Adds a move to the users cart
    */
    var addMovie = function(id, title, url, count) {
        $.getJSON( komplettJSON, function(data){
            cart.push({"movieId" : id, "title" : title, "img" : url, "count" : 1, "price" : data.movies[id].priceCat});
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
                    +"<p class='price'>Pris: "+ getPrice(cart[i].price, cart[i].count) + "NOK</p>"
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
            expandable.hide();
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
                    console.log("luckily, there is only one of its kind in your cart, lets just throw it out!\n");
                    cart = jQuery.grep(cart, function(value){ return value != cart[i]; });
                } else {
                    console.log("you've got like " + cart[i].count + "x of that stupid " + stupidMovie.children('img').attr('alt') + " movie, let me throw away just one.\n");
                    cart[i].count--;
                }
                updateCart();
                break;
            }
        }
    }

    /*
        Lets find the price based on price category and count
        This function returns it as e.g. 240.<span class='cents'>50</span>
    */
    var getPrice = function(cat, count) {
        var pris;
        switch (cat) {
            case "A":
                pris = "149.50";
                break;
            case "B":
                pris = "129.50";
                break;
        }
        pris = (parseFloat(count) * parseFloat(pris)).toFixed(2)
        return pris.slice(0,-2) + "<span class='cents'>" + pris.substr(pris.length - 2) + "</span>";
    }

    $( document ).ready(init());

})();