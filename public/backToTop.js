$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('#back-to-top-btn').fadeIn()
        } else {
            $('#back-to-top-btn').fadeOut()
        }
    });

    $('#back-to-top-btn').click(function () {
        $('body').animate({
            scrollTop: 0
        }, 800);
    });
});