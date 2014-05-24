var nconf = require('nconf');
nconf.file('./configuration/settings.dev.json');

var Sequelize = require('sequelize');

// initialize database connection
var sequelize = new Sequelize(nconf.get('connectionString'), 
  { dialect : 'postgres',
  omitNull: true
}
);

// load models
var models = [
  'user',
  'game'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

//console.log(module.exports['game']);

module.exports['user'].hasOne(module.exports['game'], {foreignKey : 'whitePlayerUserId'});
module.exports['user'].hasOne(module.exports['game'], {foreignKey : 'blackPlayerUserId'});
module.exports['game'].belongsTo(module.exports['user']);

// describe relationships
// (function(m) {
// 	var artistsAlbums = sequelize.Relations.artistsAlbums = sequelize.define('artistsAlbums', {});
// 	m.genre.belongsTo(m.artist, {joinTableModel: artistsAlbums});
// 	m.artist.hasMany(m.album, {joinTableModel: artistsAlbums});
//})(module.exports);

// export connection
//console.log(models.artist);
module.exports.sequelize = sequelize;