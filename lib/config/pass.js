'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('../models'),
    User = models.user,
    UserDal = require('../dal/users');

// Serialize sessions
passport.serializeUser(function(user, done) {
  console.log('serialize user');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }, function (err, user) {
    done(err, user);
  });
});

// Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.find({ where: {email: email} }).success(function(user) {
      if (!user) {
            return done(null, false, {
              'errors': {
                'email': { type: 'Email is not registered.' }
              }
            });
        }

      if (!UserDal.validPassword(password, user)) {
        console.log('failed auth');
        return done(null, false, {
          'errors': {
            'password': { type: 'Password is incorrect.' }
          }
        });
      }
      return done(null, user);

    }).error(function(error) {
      return done(error);
    });
  }));
