(function () {

    var question, alternatives, correctAnswer, btn = [], currentQuestion;

    var init = function () {
        setObjects();
        setEventHandlers();
        getJSON();
    }

    var setObjects = function () {
        question = $("#questionContainer");
        alternatives = $("#alternativesContainer ul");
        btn.next = $("#btnNext");
        currentQuestion = 0;
    }

    var setEventHandlers = function () {
        btn.next.click(function () {
            console.log("i twerks : btn.next.click");
        });
    }

    var getJSON = function () {
        $.getJSON("js/Oppgaver.json").done(function (data) {
            $.each(data.Oppgaver, function (i, item) {
                if (i == currentQuestion) {
                    //Create question
                    var question = $("<h2>", {
                        text: item.Spm
                    });
                    //Create question ID
                    var questionNumb = $("<p>", {
                        text: "Spørsmål " + i
                    });

                    console.log("Adding questiontext: '" + item.Spm + "'" );
                    //Append question to questioncontainer
                    question.append(
                        question,
                        questionNumb
                    );

                    //Create Alternatives
                    $.each(item.Alternativer, function (a, alt) {
                        console.log("Adding alternative '" + alt.Tekst + "'" );
                        alternatives.append(
                            $("<li>", {
                                class: "alternative",
                                text: alt.Tekst
                            })
                        );
                        if(alt.Value == true) {
                            correctAnswer = alt.Tekst;
                        }
                    });
                    $(".alternative").click(function() {
                        if($(this).text() === correctAnswer) {
                            console.log("riktig");
                        }
                        $(".alternative").css("background-color", "rgb(128, 161, 182)");
                        $(this).css("background-color", "rgb(59, 110, 143)");
                    });
                }
            }); 
        });
    }

    window.onload = init;

})();