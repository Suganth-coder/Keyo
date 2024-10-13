$(function() {
    $(".menu-link").click(function() {
        $(".menu-link").removeClass("is-active");
        $(this).addClass("is-active");
    });
});

$(function() {
    $(".main-header-link").click(function() {
        $(".main-header-link").removeClass("is-active");
        $(this).addClass("is-active");
    });
});

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdowns.forEach((c) => c.classList.remove("is-active"));
        dropdown.classList.add("is-active");
    });
});

$(".search-bar input")
    .focus(function() {
        $(".header").addClass("wide");
    })
    .blur(function() {
        $(".header").removeClass("wide");
    });

$(document).click(function(e) {
    var container = $(".status-button");
    var dd = $(".dropdown");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        dd.removeClass("is-active");
    }
});

$(function() {
    $(".dropdown").on("click", function(e) {
        $(".content-wrapper").addClass("overlay");
        e.stopPropagation();
    });
    $(document).on("click", function(e) {
        if ($(e.target).is(".dropdown") === false) {
            $(".content-wrapper").removeClass("overlay");
        }
    });
});

$(function() {
    $(".status-button:not(.open)").on("click", function(e) {
        $(".overlay-app").addClass("is-active");
    });
    $(".pop-up .close").click(function() {
        $(".overlay-app").removeClass("is-active");
    });
});

$(".status-button:not(.open)").click(function() {
    $(".pop-up").addClass("visible");
    check_progress();
});

$(".pop-up .close").click(function() {
    $(".pop-up").removeClass("visible");
});

const toggleButton = document.querySelector('.dark-light');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

var stop = 0;

function check_progress() {


    const progressBar = document.getElementById("progress-bar");
    $(".res").text("");
    let statusVal = 0;
    let id = null;
    let speed = 50;

    id = setInterval(() => {
        updateProgressBar();
    }, speed);

    function updateProgressBar() {
        const isMaxVal = statusVal === 100;


        if (statusVal == 50) {

            $.get("http://localhost:8080/detect_keylogger", function(data) {
                // Check if keylogger is detected and display the appropriate message
                if (data.is_keylogging) {
                    $(".res").text(`Keylogger detected! Process ID: ${data.pid}, Process Name: ${data.process_name}`);
                    stop = 1;
                } else {
                    $('#result').text("No keylogger detected.");
                }
            });

            // $.get("http://localhost:8080/keyo/status", function(data, status) {

            //     console.log(data.code);
            //     if (data.code == 200) {
            //         $(".res").text("Your System has been affected with keylogger!");
            //         stop = 1;
            //     }
            // });

        }

        if (stop == 1)
            return;

        if (isMaxVal) {
            clearInterval(id);
            statusVal = 0;

            //TODO:
            $(".res").text("Your System has been checked completely. Currently, There is no threat. Keyo is protecting you✨.");

            return setTimeout(() => {
                id = setInterval(() => {
                    updateProgressBar();
                }, speed);
            }, 2000);
        }

        statusVal++;
        progressBar.dataset.status = statusVal + "%";
        progressBar.setAttribute(
            "style",
            `--__progress-bar__status_wh: ${statusVal}%;`
        );
    }
}