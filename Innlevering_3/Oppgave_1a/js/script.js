// JavaScript Document
(function () {

    var container, btnGenerer, btnStopp, btnEndreFarge, divsPerSec, interval, runningInterval, divIndex, running = false;;

    var init = function() {
        setObjects();
        setEventHandlers();

    }

    var setObjects = function() {
        divsPerSec = 20;
        container = document.getElementById("container");
        btnGenerer = document.getElementById("btnGenerer");
        btnStopp = document.getElementById("btnStopp");
        btnEndreFarge = document.getElementById("btnEndreFarge");
        runningInterval = false;
        divIndex = 0;
    }

    var setEventHandlers = function() {
        btnStopp.addEventListener("click", stoppInterval, false);
        btnGenerer.addEventListener("click", startInterval, false);
        btnEndreFarge.addEventListener("click", endreFarge, false);
    }

    var startInterval = function() {
        //console.log("start interval");
        if(!running) {
            genererDiv();
            running = true;
        }
    }

    var stoppInterval = function() {
        //console.log("stop interval");
        clearInterval(interval);
        running = false;
    }

    var endreFarge = function() {
        //console.log("endre farge");
        var divisjonsliste = document.getElementById("container").getElementsByTagName("div");
        for (var i = 0; i < divisjonsliste.length; i++) {
            divisjonsliste[i].style.backgroundColor = "#0F9FFF";
        }
    }

    var genererDiv = function() {
        interval = setInterval(function(){
            var nyDiv = document.createElement("div");
            nyDiv.innerHTML = "<p>" + divIndex++ + "</p>";
            container.appendChild(nyDiv);
        }, (1000/divsPerSec));
    }

    window.onload = init;

})();