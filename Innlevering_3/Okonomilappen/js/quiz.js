(function () {

var question, alternatives, correctAnswer, btn = [], currentQuestion, points, score, altSelected, status, quizLength;

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
    altSelected = false;
    status = $("#status");
}

var setEventHandlers = function () {
    btn.next.click(function () {
        if (altSelected) {
            clearContent();
            if(currentQuestion < quizLength) {
                console.log("quiz length: " + quizLength + ", currentQuestion: " + currentQuestion);
                currentQuestion++;
                getJSON();
                altSelected = false;
                console.log("Klarert innhold og hentet neste spørsmål i json");
            } else {
                btn.next.hide();

            }
        }
        else {
            status.css("display", "block");
            setStatus();
        }
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

var setStatus = function () {
    status.html("Du kan ikke trykke på neste før du har valgt alternativ!");
}

var getJSON = function () {
    $.getJSON("js/Oppgaver.json").done(function (data) {
        quizLength = data.Oppgaver.length - 1;
        var item = data.Oppgaver[currentQuestion];

        //Create question
        var questionText = $("<h2>", {
            text: item.Spm
        });

        //Create question number
        var questionNumb = $("<p>", {
            text: "Spørsmål " + (currentQuestion + 1)
        });

        console.log("Adding questiontext: '" + item.Spm + "'");
        //Append question to questioncontainer
        question.append(
            questionNumb,
            questionText
            );

        //Create Alternatives
        $.each(item.Alternativer, function(i, item){
            console.log("Adding alternative: '" + item.Tekst + "'");
            alternatives.append(
                $("<li>", {
                    class: "alternative",
                    text: item.Tekst
                })
            );
            if(item.Value) {
                correctAnswer = item.Tekst;
            }
        });

        $(".alternative").click(function(){
            if( $( this ).text() === correctAnswer ) {
                $( this ).css("background-color", "rgb(160, 207, 103)");
                points += 100;
                console.log("riktig");
            } else {
                $( this ).css( "background-color",  "rgb(181, 30, 58)");
                console.log( "Feil" );
            }
            $( ".alternative" ).off();
            altSelected = true;
            btn.next.css("background-color", "rgb(111, 38, 113)");
            status.css("display", "none");
            showScore();
        });
    });
}

window.onload = init;

})();