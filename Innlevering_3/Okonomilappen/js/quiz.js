(function () {

    var questionContainer, alternativesContainer, btnSubmit, currentQuestion;

    var init = function () {
        setObjects();
        getJSON();
    }

    var setObjects = function () {
        questionContainer = $("#questionContainer");
        alternativesContainer = $("#alternativesContainer");
        btnSubmit = $("#btnSubmit");
        currentQuestion = 0;
    }

    var setEventHandlers = function () {
        btnSubmit.click(function () {


        });
    }

    var getJSON = function(){
        $.ajax({
            url: "js/Oppgaver.json",
            dataType: "json",
            success: function (data) {
                $.each(data.Oppgaver, function(i, item) {
                    if (i == currentQuestion) {
                        questionContainer.append("<h2>Spørsmål: " + i + item.Spm + "</h2>");
                        $.each(item.Alternativ, function (i, alternativ) {
                            alternativesContainer.append("<input type='radio' class='radioAlternativ' value='" + alternativ.Text + "'/>");
                        });
                    }
                });
            }
        });
    }

    window.onload = init;

})();