(function () {

    var value = 0;

    var init = function () {
        setEventHandlers();
        displaySuperheroes();
        dropableRegions();
    }


    var setEventHandlers = function () {
        $("#leggTilAlle").click(function () {
            $("#dropZone .dragImg").detach().css({ top: 0, left: 0 }).appendTo($("#galleri"));
            $("table tr").not("tr:first-child").remove();
            $("#galleri .dragImg").draggable("enable");
            $("#status").progressbar({
                value: 0

            });
        });

        $("#returnerSiste").click(function () {
            $("#dropZone .dragImg:last-child").detach().css({ top: 0, left: 0 }).appendTo($("#galleri"));
            $("table tr:last-child").not("tr:first-child").remove();
            $("#galleri .dragImg").draggable("enable");
            value -= 10;
            $("#status").progressbar({
                value: value

            });
        });

    }

    var displaySuperheroes = function () {
        $.ajax({
            url: "js/superhelter.json",
            dataType: "json",
            success: function (data) {
                $.each(data.superhelter, function (i, item) {
                    $("#galleri").append('<img src="' + item.bildeSrc + '" class="dragImg"/>');
                    $("#galleri img").draggable({ revert: true });
                });
            }
        });
    };

    var dropableRegions = function () {
        
        $("#dropZone").droppable({
            accept: ".dragImg",
            cursor: "move",
            drop: function (event, ui) {
                $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo($("#dropZone"));
                ui.draggable.draggable("disable");
                $.ajax({
                    url: "js/superhelter.json",
                    dataType: "json",
                    success: function (data) {
                        $.each(data.superhelter, function (i, item) {
                            
                            if (item.bildeSrc === $(ui.draggable).attr("src")) {
                                $("table").append("<tr>"
                                                    + "<td>" + item.navn + "</td>"
                                                    + "<td>" + item.realName + "</td>"
                                                    + "<td>" + item.power + "</td>"
                                                    + "<td>" + item.weakness + "</td>"
                                                    + "<td>" + item.info + "</td>"
                                                    + "</tr>");

                                value += 10;
                                $("#status").progressbar({
                                    value: value

                                });
                            }  
                        });
                    }
                });
            }
        });
    }

    window.onload = init;

})();