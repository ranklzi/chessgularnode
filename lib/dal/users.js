var models = require('../models');
var Users = models.user;
var bcrypt   = require('bcrypt-nodejs');

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

exports.findByEmail = function(email, done) {
    Users.find({where: {email:email}})
      .success(function(user)
      {
        done(null, user);
      })
      .error(function(error){
        console.log(error);
        done(error, user);
      })
};


// generating a hash
exports.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
exports.validPassword = function(password, user) {
    var pass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    console.log(user.password);
    return bcrypt.compareSync(password, user.password);
};
