/*
displays users instagram photos 
*/
exports.photos = function(req, res) {
    res.render('photo/photos', {
        title: 'Account Management'
    });
}