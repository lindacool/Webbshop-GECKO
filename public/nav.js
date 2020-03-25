$(document).ready(function () {

    $('.hamburger-button').on('click', function () {
        if ($(".nav-container").hasClass('nav-show')) {
            $('body').css('overflow', 'visible');
            $(".nav-container").removeClass('nav-show');
            $('.cover').removeClass('opacity-cover');
        } else {
            $(".nav-container").addClass('nav-show');
            $('.cover').addClass('opacity-cover');
        }

    })

    console.log($('hej'))

});