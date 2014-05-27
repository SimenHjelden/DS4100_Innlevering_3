(function () {

    var sections = [], buttons = [], user = [], game = [], buttonToBlink;

    var init = function () {
        setObjects()
        alignObjects();
        setEventHandlers();       
    }

 

    var setObjects = function () {
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
        setSenter(sections.wrapper);
        setSenter(sections.statusScreen);
    }


    var setEventHandlers = function () {
        console.log("setting the mood");
        buttons.topLeft.addEventListener("click", btnClicked, false);
        buttons.topRight.addEventListener("click", btnClicked, false);
        buttons.bottomLeft.addEventListener("click", btnClicked, false);
        buttons.bottomRight.addEventListener("click", btnClicked, false);

        user.input.addEventListener("keyup", splashInputChange, false);
        
    }

    var newGame = function () {
        game.push(Math.floor(Math.random() * 4 + 1));
        
    }

  

    //HJELPEMETODER
    var getElement = function (id) {
        return document.getElementById(id);
    }

    var setSenter = function (element) {
        console.log(element.id);
        element.style.top = ((window.innerHeight/2) - element.offsetHeight/2) + "px";
        element.style.left = ((window.innerWidth/2) - element.offsetWidth/2) + "px";
    }

    var btnClicked = function (e) {
        console.log("user clicked: "+ btnToId(this.id));
        if (game.buttonsClickable) {
            console.log("user.guess = " + buttonToId(this.id) + " currect = " + game[0]);
            user.guess.push(btnToId(this.id));
            for (var i = 0; i <= user.guess.length; i++) {
                if (user.guess[i] == game[i]) {
                    console.log("users guess " + user.guess + "correct");
                }
            }
        }
    }

    var splashInputChange = function (e) {
        if (e.keyCode == 13) {
            var input = user.input.value.toLowerCase();
            user.name.innerHTML = input.charAt(0).toUpperCase(); +input.slice(1);
            user.printScore = user.score + " poeng";

            user.input.removeEventListener("keyup", splashInputChange, false);
            sections.spalsh.style.display = "none";
            newGame();
            showCurrentGame();
            console.log(game);
        }
    }

    var showCurrentGame = function () {
        setTimeout(blinkButton(game[buttonToBlink]), 500);
    }

    var blinkButton = function (buttonId) {
        setTimeout(function () {
            console.log("button to click is" + buttonId);
        }, 500);
        
        if (buttonToBlink <= game.length) {
            blinkButton(buttonToBlink++);
        } else {
            game.buttonsClickable = true;
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

