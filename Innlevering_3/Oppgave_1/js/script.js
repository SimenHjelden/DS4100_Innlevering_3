// JavaScript Document
(function () {

    var container, btnGenerer, btnStopp, btnEndreFarge, divsPerSec, interval;

    function init() {
        setObjects();
        setEventHandlers();

    }

    function setObjects() {
        divsPerSec = 20;
        container = document.getElementById("container");
        btnGenerer = document.getElementById("btnGenerer");
        btnStopp = document.getElementById("btnStopp");
        btnEndreFarge = document.getElementById("btnEndreFarge");

    }

    function setEventHandlers() {
        btnStopp.addEventListener("click", stoppInterval, false);
        btnGenerer.addEventListener("click", startInterval, false);
        btnEndreFarge.addEventListener("click", endreFarge, false);
    }

    function startInterval() {
        console.log("start interval");
        interval = setInterval(genererDiv, 1000);
    }

    function stoppInterval() {
        console.log("stop interval");
        clearInterval(interval);
    }

    function endreFarge() {
        console.log("endre farge");
        var divisjonsliste = document.getElementById("container").getElementsByTagName("div");
        for (var i = 0; i < divisjonsliste.length; i++) {
            divisjonsliste[i].style.backgroundColor = "#0F9FFF";
        }
    }

    function genererDiv() {
        for (var i = 0; i < divsPerSec; i++) {
            var nyDiv = document.createElement("div");
            container.appendChild(nyDiv);
        }
    }

    window.onload = init;

})();