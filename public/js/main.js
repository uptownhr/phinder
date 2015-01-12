$(document).ready(function() {
    $('.make_default').click( function(e){
        e.preventDefault();
        var id = $(this).data('id');
        $.get('/set/profile-image/' + id, function(res){
            //update profile image url
            $('.profile_image').attr('src', res.profile_image.images.low_resolution.url);
        });
    });

    $('.skip').click( function(e){
        e.preventDefault();
        var id = $(this).data('id');
        $.get('/skip/' + id);
    });

    $('.like').click( function(e){
        e.preventDefault();
        var id = $(this).data('id');
        $.get('/like/' + id);
    });
});
