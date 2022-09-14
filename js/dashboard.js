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

function check_progress() {


    const progressBar = document.getElementById("progress-bar");
    let statusVal = 0;
    let id = null;
    let speed = 50;

    id = setInterval(() => {
        updateProgressBar();
    }, speed);

    function updateProgressBar() {
        const isMaxVal = statusVal === 100;

        if (isMaxVal) {
            clearInterval(id);
            statusVal = 0;

            //TODO:
            $(".res").text("Your System has been checked completely. Currently, There is no threat. Keyo is protecting you✨.");
            return;

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