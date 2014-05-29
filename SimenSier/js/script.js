(function () {

    var sections = [], buttons = [], user = [], game = [], buttonToBlink;

    var init = function () {
        //console.log("Running the init function");

        setObjects()
        alignObjects();
        setEventHandlers();       
    }

 

    var setObjects = function () {
        //console.log("Running the setObjects function");

        sections.spalsh = getElement("splashScreen");
        sections.statusScreen = getElement("statusScreen");
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
        user.printScore = getElement("score").innerHTML;
        user.guess = [];
        buttonToBlink = 0;

        game.buttonsClickable = false;
    }

    var alignObjects = function () {
        //console.log("Running the alignObjects function");
        setSenter(sections.wrapper);
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
        console.log("A new game is made, the game is " + game);
    }


    var showCurrentGame = function () {
        //console.log("Running showCurrentGame function \ndoing a timeout on blinkButton(buttonToBlink)");
        setTimeout(blinkButton(game[buttonToBlink]), 500);
    }

    var nextRound = function(){       
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
            user.guess.push(btnToId(this.id));
            console.log("checking if userGuess: " + user.guess + " == game: " + game);
            for(var i = 0; i < game.length-1; i++) {
                if (user.guess[i] == game[i]) {
                    console.log("users guess " + user.guess + " correct");
                } else {
                    console.log("users guess " + user.guess + " false");
                    game.buttonsClickable = false;
                }
            }
            
            if(!game.buttonsClickable || user.guess.length == game.length) {
                game.buttonsClickable = false;
                //console.log("user.guess.length = " + user.guess.length + ", game.length = " + game.length);
                user.guess = [];
                console.log("user guesses cleared : user.guess = '" + user.guess +"'");
                console.log("sets status screen to display block in 0.5s");
                setTimeout(function() {
                    sections.statusScreen.style.display = "block";
                }, 500);
            }
        }
        
    }

    var splashInputChange = function (e) {
        //console.log("User typing username: " + user.input.value);
        if (e.keyCode == 13) {
            var input = user.input.value.toLowerCase();
            user.name.innerHTML = input.charAt(0).toUpperCase(); +input.slice(1);
            user.printScore = user.score + " poeng";

            user.input.removeEventListener("keyup", splashInputChange, false);
            sections.spalsh.style.display = "none";
            newGame();
            showCurrentGame();
        }
    }



    var blinkButton = function (buttonId) {
        //console.log("Running blinkButton(" + buttonId + ")");
        setTimeout(function () {
            //console.log("waiting 0.5 sec before starting blink session");
            //console.log("Button to click is buttonId: " + buttonId);
            var buttonToBlinkCurrBackgroundColor = getButtonBackgroundColor(buttonId);
            //console.log("buttonId " + game[buttonToBlink] + " is at game[" + buttonToBlink + "]");
            setButtonBackgroundColor(buttonId, "#333");
            setTimeout(function() {
                //console.log("Set background back to default");
                setButtonBackgroundColor(buttonId, buttonToBlinkCurrBackgroundColor);
                if(buttonToBlink < game.length - 1) {
                    //console.log("Increasing buttonToBlink value by one");
                    buttonToBlink++;
                    //console.log("buttonToBlink is " + buttonToBlink);
                    blinkButton(game[buttonToBlink]);
                } else {
                    //console.log("game.buttonsClickable = true");
                    game.buttonsClickable = true;
                }
            }, 500);
        }, 500);
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

