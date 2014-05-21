(function(){

    var init = function () {
        getJSON();
        //console.log("init funksjon ferdig");
    }

    var setObjects = function () {

    }

    var setEventHandlers = function () {

    }

    var getJSON = function () {
        $.ajax({
            url: "../js/movies.json",
            dataType: "json",
            success: function (data) {
                $.each(data.movies, function (i, item) {
                    $("section#hovedInnhold").append(
                        "<article><img src='../" + item.imageSrc + "'/>" + "<h1>" + item.Title + "</h1>" + "<p>" + item.Description + "</p>" + "<div class='pris'></div>" + "<img src='../images/buy.png' alt='buy.png' class='buy' />" + "</article>"
                       );
                });
            }
        });
    }

    var expandCart = function () {

    }

    $( document ).ready(init());

})();