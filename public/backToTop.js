$(document).ready(function () {

    $("#back-to-top-btn").on("click", function () {
        var y = $(window).scrollTop(); //your current y position on the page
        $(window).scrollTop(0);
    });


});