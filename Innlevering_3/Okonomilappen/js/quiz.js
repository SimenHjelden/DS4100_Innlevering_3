(function () {

    var wrapper, questionContainer, alternativesContainer, btnSubmit, btnNext, currentQuestion;

    var init = function () {
        setObjects();
        getJSON();
    }

    var setObjects = function () {
        questionContainer = $("#questionContainer");
        alternativesContainer = $("#alternativesContainer");
        btnSubmit = $("#btnSubmit");
        wrapper = $("#wrapper");
        currentQuestion = 0;
    }

    var setEventHandlers = function () {
        btnSubmit.click(function () {
        });
        btnNext.click(function () {

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