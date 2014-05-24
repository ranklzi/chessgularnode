'use strict';

var express = require('express'),
    nconf = require('nconf'),
    favicon = require('static-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    config = require('./config'),
    routes = require('./routes.js'),
    db = require('./../models'),
    users = require('../dal/users.js'),
    session      = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    flash    = require('connect-flash');

    var pass = require('./pass');
/**
 * Express configuration
 */
module.exports = function(app) {
  var env = app.get('env');
  nconf.file('./Configuration/settings.json');

  if ('development' === env) {
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.set('views', config.root + '/app/views');
  }

  if ('production' === env) {
    app.use(compression());
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  }

  app.set('view engine', 'html');
  app.engine('html', require('ejs').renderFile);
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(cookieParser()) // required before session.
  app.use(session({ secret: 'keyboard cat', name: 'sid', cookie: { secure: true }}))
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash()); // use connect-flash for flash messages stored in session
  
  routes(app);
  
  

  // Error handler - has to be last
  if ('development' === app.get('env')) {
    app.use(errorHandler());
  }
};