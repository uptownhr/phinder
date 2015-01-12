var User = require('../models/User');
var async = require('async');

/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  async.waterfall([
    function(callback){
      var page = 'home';

      if(req.user){
        page = 'pinder';
      }else{
        console.log(req.user);
      }

      callback(null, page);
    },
    function(page, callback){
      var result = {
        page: page
      };

      if(page=='pinder'){
        var ids = req.user.skipIds();
        console.log('ids',ids);

        User.findOne({ _id: {$nin: ids }}, function(err, user){
          console.log(user);
          result.target_user = user;
          callback(err, result);
        });
      }else{
        callback(null, result);
      }
    }
  ], function(err, result){
    if(err)console.log(err);
    res.render(result.page, {
      title: result.page,
      target_user: result.target_user
    });
  });
};
