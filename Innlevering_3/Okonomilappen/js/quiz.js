(function () {

    var question, alternatives, correctAnswer, btn = [], currentQuestion, points, score;

    var init = function () {
        setObjects();
        setEventHandlers();
        getJSON();
        showScore();
    }

    var setObjects = function () {
        question = $("#questionContainer");
        alternatives = $("#alternativesContainer ul");
        btn.next = $("#btnNext");
        currentQuestion = 0;
        score = $("#score");
        points = 0;
    }

    var setEventHandlers = function () {
        btn.next.click(function () {
            clearContent();
            currentQuestion++;
            getJSON();
                console.log("i twerks : btn.next.click");
            });
    }

    var showScore = function () {
        score.html("Score: " + points);
    }

    var clearContent = function () {
        question.children("p").remove();
        question.children("h2").remove();
        alternatives.children("li").remove();
        btn.next.css("background-color", "rgb(127, 140, 141)")
    }

    var getJSON = function () {
        $.getJSON("js/Oppgaver.json").done(function (data) {
            $.each(data.Oppgaver, function (i, item) {
                if (i == currentQuestion) {
                    //Create question
                    var questionText = $("<h2>", {
                        text: item.Spm
                    });
                    //Create question ID
                    var questionNumb = $("<p>", {
                        text: "Spørsmål " + (i + 1)
                    });

                    console.log("Adding questiontext: '" + item.Spm + "'" );
                    //Append question to questioncontainer
                    question.append(
                        questionNumb,
                        questionText          
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

                    $(".alternative").click(function () {
                        $(".alternative").css("background-color", "rgb(128, 161, 182)");
                        $(this).css("background-color", "rgb(59, 110, 143)");
                        $(".alternative").off();
                        if ($(this).text() === correctAnswer) {
                            $(this).css("background-color", "rgb(160, 207, 103)");
                            points += 100;
                            console.log("riktig");
                        }
                        else {
                            $(this).css("background-color", "rgb(181, 30, 58)");
                            console.log("feil");
                        }      
                        btn.next.css("background-color", "rgb(111, 38, 113)");
                        showScore();
                    });
                }
            }); 
        });
    }

    window.onload = init;

})();