(function(){

	var splashScreen, statusScreen, gameWrapper, 
	startField, startGameInput, userName, 
	currentScore, 
	button = [], currentGame = [], userInput = [], 
	activeUser = false;

	var init = function() {
		setObjects();
		positionateObjects();
		setEventListeners();
	}

	var setObjects = function() {
		startField = elementId("start");
		splashScreen = elementId("splashScreen");
		statusScreen = elementId("statusScreen");
		statusScreen.style.display = "none";
		
		gameWrapper = elementId("gameWrapper");
		startGameInput = elementId("userNameInput");
		userName = elementId("username");
		currentScore = elementId("score");
		button.nextRound = elementId("nesteRundeBtn");
		button.topLeft = elementId("topLeft");
		button.bottomLeft = elementId("bottomLeft");
		button.topRight = elementId("topRight");
		button.bottomRight = elementId("bottomRight");
	}

	var setEventListeners = function() {
		startGameInput.addEventListener("keyup", startGame, false);
		button.topLeft.addEventListener("click", function(){
			//console.log("top left button clicked!");
			checkInput(1, button.topLeft);
		}, false);
		button.topRight.addEventListener("click", function(){
			//console.log("top right button clicked!");
			checkInput(2, button.topRight);
		}, false);
		button.bottomLeft.addEventListener("click", function(){
			//console.log("bottom left button clicked!");
			checkInput(3, button.bottomLeft);
		}, false);
		button.bottomRight.addEventListener("click", function(){
			//console.log("bottom right button clicked!");
			checkInput(4, button.bottomRight);
		}, false);
		button.nextRound.addEventListener("click", function(){
			alert("neste runde!");
			statusScreen.style.display="none";
			showCurrentGame();
		}, false);
	}
	

	var startGame = function(event) {
	    if (event.keyCode == 13) {
	    	var n = startGameInput.value.toLowerCase();
	    	userName.innerHTML = n.charAt(0).toUpperCase() + n.slice(1);
	    	currentScore.innerHTML = "0 points";
	    	//console.log("Ditt brukernavn er " + startGameInput.value);
	    	startGameInput.removeEventListener("keyup", startGame, false);
	    	splashScreen.style.display="none";
	    	setTimeout(function() {
	    		createNewGame();
	    		showCurrentGame();
	    	}, 1000);
	    }
	}

	var showCurrentGame = function() {
		currentGame.forEach(function(entry) {
			var currentBtn = -1;
			switch(entry) {
		    	case 1:
		    		currentBtn = button.topLeft;
		    		break;
		    	case 2:
		    		currentBtn = button.topRight;
		    		break;
		    	case 3:
		    		currentBtn = button.bottomLeft;
		    		break;
		    	case 4:
		    		currentBtn = button.bottomRight;
		    		break;
		    }
		    var currentBtnDefaultBackgroundColor = currentBtn.style.backgroundColor;
		    currentBtn.style.opacity = .5;
			setTimeout(function() {
				currentBtn.style.opacity = 1;
			}, 500);
		    //console.log(currentBtn.id);
		});
	}

	var simulateClickFrom = function() {
	}

	var checkInput = function(num, element) {
		userInput.push(num);
		if(userInput.length === currentGame.length) {
			clickBtn(element);
			createNewGame();
			userInput = [];
		}
	}

	var clickBtn = function(b) {
		b.style.opacity = .5;
		setTimeout(function() {
			b.style.opacity = 1;
			setTimeout(function() {
				statusScreen.style.backgroundColor = "#ecf0f1";
				statusScreen.style.display = "block";
			}, 500);
		}, 500);
	}

	var elementId = function(id) {
		return document.getElementById(id);
	}

	var createNewGame = function() {
		currentGame.push(Math.floor((Math.random() * 4) + 1));
		//console.log(currentGame);
	}

	var positionateObjects = function() {
		setSenter(startField);
		setSenter(gameWrapper);
	}

	var setSenter = function(item) {
		item.style.top = ((window.innerHeight/2) - item.offsetHeight/2) + "px";
		item.style.left = ((window.innerWidth/2) - item.offsetWidth/2) + "px";
	}

	onload = init;

	window.onresize = function(event) {
	    setSenter(startField);
		setSenter(gameWrapper);
		setSenter(statusScreen);
	};

})();