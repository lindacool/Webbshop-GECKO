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

    var stickyNavTop = $('.burger-container').offset().top;
    var stickyNav = function(){
    var scrollTop = $(window).scrollTop(); 

        if (scrollTop > stickyNavTop) { 
            $('.burger-container').addClass('sticky');
        } else {
            $('.burger-container').removeClass('sticky'); 
        }
    };

    stickyNav();
    $(window).scroll(function() {
        stickyNav();
    });
    
    console.log($('hej'))
});
