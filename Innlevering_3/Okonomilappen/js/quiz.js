(function () {

    var wrapper, questionContainer, alternativesContainer, btnSubmit, btnNext, currentQuestion, htmlAlternatives;

    var init = function () {
        setObjects();
        setEventHandlers();
        getJSON();
    }

    var setObjects = function () {
        questionContainer = $("#questionContainer");
        alternativesContainer = $("#alternativesContainer");
        htmlAlternatives = $("#alternativesContainer ul li");
        btnSubmit = $("#btnSubmit");
        btnNext = $("#btnNext");
        wrapper = $("#wrapper");
        currentQuestion = 0;
    }

    var setEventHandlers = function () {
        btnSubmit.click(function () {
        });
        btnNext.click(function () {
        });

        htmlAlternatives.click(function () {
            $(this).css("background-color", "rgb(59, 110, 143)");
        });
    }

    var getJSON = function () {
        $.getJSON("js/Oppgaver.json").done(function (data) {
                $.each(data.Oppgaver, function (i, item) {
                    if (i == currentQuestion) {
                        //spørsmålet
                        $("#questionContainer").append("<h2>" + item.Spm + "</h2><p>Spørsmål " + i + "</p></br>");
                        //alternativ
                        $.each(item.alternativ, function (a, alt) {
                            $("#alternativesContainer ul").append("<li>" + alt.Text + "<li>");
                            
                        });
                    }
                }); 
            });
        }

    window.onload = init;

})();