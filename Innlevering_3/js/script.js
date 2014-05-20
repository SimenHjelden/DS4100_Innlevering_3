// JavaScript Document
(function () {

    window.onload = init;

    var container, btnGenerer, btnStopp, btnEndreFarge, count, interval;

    function init() {
        setObjects();
        setEventHandlers();

    }

    function setObjects() {
        count = 20;
        container = document.getElementById("container");
        btnGenerer = document.getElementById("btnGenerer");
        btnStopp = document.getElementById("btnStopp");
        btnEndreFarge = document.getElementById("btnEndreFarge");

    }

    function setEventHandlers() {
        btnStopp.onclick = stoppInterval;
        btnGenerer.onclick = startInterval;
        btnEndreFarge.onclick = endreFarge;

    }

    function startInterval() {
        interval = setInterval(genererDiv, 1000);
    }

    function stoppInterval() {
        clearInterval(interval);
    }

    function endreFarge() {
        var divisjonsliste = document.getElementById("container").getElementsByTagName("div");
        for (var i = 0; i < divisjonsliste.length; i++) {
            divisjonsliste[i].style.backgroundColor = "#0F9FFF";
        }
    }

    function genererDiv() {
        for (var i = 0; i < count; i++) {
            var nyDiv = document.createElement("div");
            container.appendChild(nyDiv);
        }
    }

})();