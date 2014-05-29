(function () {

    var wrapper, questionContainer, alternativesContainer, btnSubmit, currentQuestion;

    var init = function () {
        setObjects();
        alignObjets();
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


    var setSenter = function (element) {
        element.style.top = ((window.innerHeight / 2) - element.offsetHeight / 2) + "px";
        element.style.left = ((window.innerWidth / 2) - element.offsetWidth / 2) + "px";
    }

    var alignObjets = function () {
        setSenter(wrapper);
    }

    window.onload = init;

})();