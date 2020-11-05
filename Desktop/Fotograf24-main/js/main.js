$(document).ready(function () {

    $(".subarea").each(function (i) {
        $(this).attr("id", "subarea" + i).hover(function() {
            $("#subarea" + i).css("opacity", "0.4");
        }, function() {
            $("#subarea" + i).css("opacity", "1");
        })

        $("#subarea" + i).hover(function() {
            $("#area_" + i).css({
                "color": "rgba(0, 0, 0, 0.623)", 
                "text-decoration": "underline"});
        }, function() {
            $("#area_" + i).css({
                "color": "black", 
                "text-decoration": "none"});
        })
    })

    $(".region_link_list").each(function(i) {
        $("#area_" + i).hover(function() {
            $("#subarea" + i).css("opacity", "0.4");
        }, function() {
            $("#subarea" + i).css("opacity", "1");
        })
    })

});