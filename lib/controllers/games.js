'use strict';

var models = require('../models'),
    Game = models.game,
    User = models.user;

/**
 * Find game by userId
 */
exports.allActive = function(req, res, next, id) {
  Game.find({ where: Sequelize.or(
      { whitePlayerUserId: id },
      { blackPlayerUserId: id }
    ), include: [User]}).success(function(games) {
      res.json(games);
    }).error(function(error) {
      res.json(500, error);
    });
};
