$(document).ready(function () {
    
    $('.hambutton').on('click', function () {
        if($(".navContainer").hasClass('navShow')) {
            $(".navContainer").removeClass('navShow');
        } else {
            $(".navContainer").addClass('navShow');
        }
        
    })
});
