(function(){

    var init = function () {

    }

    var setObjects = function () {

    }

    var setEventHandlers = function () {

    }

    var getJSON = function () {
        $.ajax({
            url: "js/movies.json",
            dataType: "json",
            success: function (data) {
                $.each(data.movies, function (i, item) {
                    $("#hovedInnhold").append(
                        "<article><img src='" + item.imageSrc + "'<h1>"+ item.Title + "</h1><p>" + item.Description + "</p></article>"
                       );
                });
            }
        });
    }

    var expandCart = function () {

    }

})();