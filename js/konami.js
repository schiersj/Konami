$(document).ready(function() {
  konami.register();
});

(function (konami, $, undefined) {
    var neededkeys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var konamiMode = false;
    var started = false;
    var count = 0;

    var defaultIterations = 5;
    var defaultInterval = 1000;

    konami.register = function (callback, iterations, interval) {
        if (typeof iterations !== "undefined" && iterations !== null && iterations !== "") {
            defaultIterations = iterations;
        }
        if (typeof interval !== "undefined" && interval !== null && interval !== "") {
            defaultInterval = interval;
        }

        if (typeof callback === "function") {
            konami.populate = callback;
        }

        $(document).keydown(function (e) {
            var key = e.keyCode;

            if (!started && key === 38) started = true;

            if (started) {
                if (neededkeys[count] === key) {
                    count++;
                } else {
                    reset();
                }

                if (count === 10) {
                    konamiMode = !konamiMode;

                    if (konamiMode) massPopulate();
                    else stop();

                    reset();
                }
            } else {
                reset();
            }
        });
    }

    konami.populate = function () {
        for (var i = 0; i < 15; i++) {
            var sources = [
                "img/GrumpyCat.png",
                "img/BlackCat.png",
                "img/OrangeCat.png"
            ];

            var source = sources[Math.floor(Math.random() * sources.length)];
            var left = (Math.random() * 90);
            var bottom = (Math.random() * 200 + 25);

            $("body").append("<img src='" + source + "' " +
                "class='konami' style='position: absolute; " +
                "left: " + left + "%; " +
                "bottom: " + bottom + "%; " +
                "'/>");
        }
    }

    function massPopulate() {
        $(".konami").remove();
        $("body").append("<div class='konami-background'><p>Its all Just Rainbows and Kittens!</p></div>");
        $(".konami-background").animate({ width: "100%" });

        asyncPopulate.count = 0;
        asyncPopulate();
    }

    function asyncPopulate() {
        if (asyncPopulate.count < defaultIterations) {
            konami.populate();
            asyncPopulate.count++;
            window.setTimeout(asyncPopulate, defaultInterval);
        }
    }

    function reset() {
        started = false;
        count = 0;
        return;
    }

    function stop() {
        $(".konami").remove();
        $(".konami-background").animate({ width: "0px" }, null, null, function () { $(".konami-background").remove(); });
    }
}(window.konami = window.konami || {}, jQuery));
