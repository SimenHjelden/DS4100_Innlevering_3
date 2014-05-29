(function () {

    var sections = [], buttons = [], user = [], game = [], buttonToBlink;

    var init = function () {
        //console.log("Running the init function");

        setObjects()
        alignObjects();
        setEventHandlers();      
        user.printScore(); 
    }

 

    var setObjects = function () {
        //console.log("Running the setObjects function");

        sections.spalsh = getElement("splashScreen");
        sections.statusScreen = getElement("statusScreen");
        sections.statusContent = getElement("statusContent");
        sections.statusScreenH1 = getElement("statusH1");
        sections.wrapper = getElement("gameWrapper");
        sections.scoreboard = getElement("scoreboard");

        buttons.topLeft = getElement("topLeft");
        buttons.topRight = getElement("topRight");
        buttons.bottomLeft = getElement("bottomLeft");
        buttons.bottomRight = getElement("bottomRight");
        buttons.nextRound = getElement("btnNextRound");
        
        user.input = getElement("userNameInput");
        user.name = getElement("username");
        user.score = 0;
        user.printScore = function(){getElement("score").innerHTML = user.score + " poeng"};
        user.guess = [];
        user.currentGuessNumb = 0;
        buttonToBlink = 0;

        game.buttonsClickable = false;
    }

    var alignObjects = function () {
        //console.log("Running the alignObjects function");
        setSenter(sections.wrapper);
        setSenter(user.input);
        setSenter(sections.statusContent);
    }


    var setEventHandlers = function () {
        //console.log("Running the setEventHandlers function");
        buttons.topLeft.addEventListener("click", btnClicked, false);
        buttons.topRight.addEventListener("click", btnClicked, false);
        buttons.bottomLeft.addEventListener("click", btnClicked, false);
        buttons.bottomRight.addEventListener("click", btnClicked, false);
        buttons.nextRound.addEventListener("click", nextRound, false);

        user.input.addEventListener("keyup", splashInputChange, false);
        
    }

    var newGame = function () {
        //console.log("Entered newGame function");
        game.push((Math.floor(Math.random() * 4) + 1));
        //console.log("A new game is made, the game is " + game);
    }


    var showCurrentGame = function () {
        //console.log("Running showCurrentGame function \ndoing a timeout on blinkButton(buttonToBlink)");
        setTimeout(blinkButton(game[buttonToBlink], false), 500);
    }

    var nextRound = function(){       
        //console.log("Start next round!");
        sections.statusScreen.style.display = "none";
        newGame();
        showCurrentGame();   
    }
  

    //HJELPEMETODER
    var getElement = function (id) {
        return document.getElementById(id);
    }

    var setSenter = function (element) {
        //console.log("Setting " + element.id + " to align center");
        element.style.top = ((window.innerHeight/2) - element.offsetHeight/2) + "px";
        element.style.left = ((window.innerWidth/2) - element.offsetWidth/2) + "px";
    }

    var btnClicked = function (e) {
        //console.log("User clicked: "+ btnToId(this.id));
        if (game.buttonsClickable) {
            //console.log("User clicked " + this.id);

            blinkButton(btnToId(this.id), false)

            //console.log("Save users guess of " +btnToId(this.id));
            user.guess.push(btnToId(this.id));

            console.log("Checking if user has guessed correct amount of " + game.length + " guesses");
            var levelCleared = false;
            if(user.guess.length == game.length) {
                console.log("User guessed " + user.guess + ", correct guess is " + game);

                if(user.guess[user.currentGuessNumb] == game[user.currentGuessNumb]) {
                    user.score++;
                    levelCleared = true;
                }
                setTimeout(function() {
                    userDoneGuessing(levelCleared);
                }, 1000);
                
            } else {
                //console.log("current guess number is " + user.currentGuessNumb);
                //console.log("checking if users guess equals to game["+user.currentGuessNumb+"]");
                if(user.guess[user.currentGuessNumb] == game[user.currentGuessNumb]) {
                    //console.log("users guess matched game["+user.currentGuessNumb+"]");
                    user.currentGuessNumb++;
                } else {
                    //console.log("User failed by guessed " + user.guess + ", correct guess would be " + game);
                    setTimeout(function() {
                        userDoneGuessing(levelCleared);
                    }, 1000);
                }
                console.log("Do another guess!");
            }
        }
    }

    var userDoneGuessing = function(levelCleared){
        console.log("Clear user guess, currentGuessNumb, buttonToBlink and changed buttonsClickable to false");
        user.guess = [];
        user.currentGuessNumb = 0;
        buttonToBlink = 0;
        game.buttonsClickable = false;

        if(levelCleared) {
            console.log("user cleared the level");
            sections.statusScreenH1.innerHTML = "RIKTIG, nå har du " + user.score + " poeng!";
            buttons.nextRound.innerHTML = "Videre til neste runde";
        } else {
            console.log("user failed to clear level");
            game = [];
            sections.statusScreenH1.innerHTML = "FEIL, du klarte å få " + user.score + " totalt!";
            user.score = 0;
            buttons.nextRound.innerHTML = "Start på nytt";
        }

        console.log("Display status screen");
        user.printScore();
        sections.statusScreen.style.display = "block";
    }

    var splashInputChange = function (e) {
        //console.log("User typing username: " + user.input.value);
        if (e.keyCode == 13) {
            var input = user.input.value.toLowerCase();
            user.name.innerHTML = input.charAt(0).toUpperCase() + input.slice(1);
            user.printScore;

            user.input.removeEventListener("keyup", splashInputChange, false);
            sections.spalsh.style.display = "none";
            newGame();
            showCurrentGame();
        }
    }



    var blinkButton = function (buttonId, blinkSingleButton) {
        setTimeout(function () {
            var buttonToBlinkCurrBackgroundColor = getButtonBackgroundColor(buttonId);
            //console.log("buttonId " + game[buttonToBlink] + " is at game[" + buttonToBlink + "]");
            setButtonBackgroundColor(buttonId, "#333");
            setTimeout(function() {
                //console.log("Set background back to default");
                setButtonBackgroundColor(buttonId, buttonToBlinkCurrBackgroundColor);
                if(!blinkSingleButton) {
                    if(buttonToBlink < game.length - 1) {
                        //console.log("Increasing buttonToBlink value by one");
                        buttonToBlink++;
                        //console.log("buttonToBlink is " + buttonToBlink);
                        blinkButton(game[buttonToBlink], false);
                    } else {
                        //console.log("game.buttonsClickable = true");
                        game.buttonsClickable = true;
                        console.log("Time for user input");
                    }
                }
            }, 500);
        }, 100);
    }

    var getButtonBackgroundColor = function(id) {
        if(id == 1) {
            return "#27ae60";
        } else if(id == 2) {
            return "#c0392b";
        } else if(id == 3) {
            return "#f39c12";
        } else if(id == 4) {
            return "#2980b9";
        }   
    }

    var setButtonBackgroundColor = function(buttonId, color) {
        if(buttonId == 1) {
            //buttonToBlinkCurrBackgroundColor = buttons.topLeft.style.backgroundColor;
            buttons.topLeft.style.backgroundColor = color;
        } else if(buttonId == 2) {
            //buttonToBlinkCurrBackgroundColor = buttons.topRight.style.backgroundColor;
            buttons.topRight.style.backgroundColor = color;
        } else if(buttonId == 3) {
            //buttonToBlinkCurrBackgroundColor = buttons.bottomLeft.style.backgroundColor;
            buttons.bottomLeft.style.backgroundColor = color;
        } else if(buttonId == 4) {
            //buttonToBlinkCurrBackgroundColor = buttons.bottomRight.style.backgroundColor;
            buttons.bottomRight.style.backgroundColor = color;
        }
    }

    var btnToId = function(element) {
        switch (element) {
            case "topLeft":
                return 1;
                break;
            case "topRight":
                return 2;
                break;
            case "bottomLeft":
                return 3;
                break;
            case "bottomRight":
                return 4;
                break;
        }
    }

    window.onresize = function() {
        alignObjects();
    }

    window.onload = init;

})();

