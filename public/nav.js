$(document).ready(function () {
    
    $('.hambutton').on('click', function () {
        if($(".nav").hasClass('navShow')) {
            $(".nav").removeClass('navShow');
        } else {
            $(".nav").addClass('navShow');
            
        }
        
    })
});
