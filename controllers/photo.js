/*
displays users instagram photos 
*/
exports.profilePhotos = function(req, res) {
    if (req.user.photos.length == 0) {
        var token = _.find(req.user.tokens, {
            kind: 'instagram'
        });
        ig.use({
            client_id: secrets.instagram.clientID,
            client_secret: secrets.instagram.clientSecret
        });
        ig.use({
            access_token: token.accessToken
        });
        async.parallel({
            /*searchByUsername: function(done) {
             ig.user_search('richellemead', function(err, users, limit) {
             done(err, users);
             });
             },
             searchByUserId: function(done) {
             ig.user('175948269', function(err, user) {
             done(err, user);
             });
             },
             popularImages: function(done) {
             ig.media_popular(function(err, medias) {
             done(err, medias);
             });
             },*/
            myRecentMedia: function(done) {
                ig.user_self_media_recent(function(err, medias, pagination, limit) {
                    done(err, medias);
                });
            }
        }, function(err, results) {
            if (err) return next(err);
            console.log(results);
            req.user.photos = results.myRecentMedia;
            req.user.save();

            res.render('api/instagram', {
                title: 'Instagram API',
                /*usernames: results.searchByUsername,
                 userById: results.searchByUserId,
                 popularImages: results.popularImages,*/
                images: results.myRecentMedia
            });
        });
    }else{
        res.render('photo/profile-photos', {
            title: 'Available Photos',
            images: req.user.photos
        });
    }
}


// add id to users liked array
exports.liked = function(req, res){
    var id = req.params.id;
    var code = 404;
    var data = 'id not sent';
    if(id){
        console.log(req.user.liked);
        req.user.liked.addToSet(id);
        req.user.save( function(err,saved){
            if(err){
                code = 400;
                data = err;
            }else{
                code = 200;
                data = saved;
            }
        });

        res.status(code).send(data);
    }else{
        res.status(code).send(data);
    }
}

// add id to users skipped array
exports.skipped = function(req, res){
    var id = req.params.id;
    var code = 404;
    var data = 'id not sent';
    if(id){
        console.log('id sent', id);
        req.user.skipped.addToSet(id);
        req.user.save( function(err,saved){

            if(err){
                console.log('err',err);
                code = 400;
                data = err;
            }else{
                console.log('should save');
                code = 200;
                data = saved;
            }
            res.status(code).send(data);
        });
    }else{
        res.status(code).send(data);
    }


}

exports.clearSkipped = function(req, res){
    req.user.skipped = [];
    req.user.save( function(err,saved){
        res.redirect('/');
    });
}

var ajaxResponse = function(err,saved){
    if(err){
        code = 400;
    }
}