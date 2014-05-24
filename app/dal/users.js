var models = require('../models');
var Users = models.user;

exports.getUsers = function(req, res) {
    Users.all()
      .success(function(users)
      {
        res.json(users);
      })
      .error(function(error){
        console.log(error);
        res.json(error);
      })
};

exports.authenticateUser = function(req, res) {
    Users.all({where: {username:req.params.username}})
      .success(function(users)
      {
        res.json(artistsAlbums);
      })
      .error(function(error){
        console.log(error);
        res.json(error);
      })
};