var nconf = require('nconf');
nconf.file('./configuration/settings.dev.json');

var Sequelize = require('sequelize');

// initialize database connection
console.log(nconf.get('connectionString'));
var sequelize = new Sequelize(nconf.get('connectionString'), 
  { dialect : 'postgres',
  omitNull: true
}
);

// load models
var models = [
  'user'
  //'game'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});
console.log('dedeedede d dkjwd wjked ewjkdew djkew');

// describe relationships
// (function(m) {
// 	var artistsAlbums = sequelize.Relations.artistsAlbums = sequelize.define('artistsAlbums', {});
// 	m.genre.belongsTo(m.artist, {joinTableModel: artistsAlbums});
// 	m.artist.hasMany(m.album, {joinTableModel: artistsAlbums});
//})(module.exports);

// export connection
//console.log(models.artist);
module.exports.sequelize = sequelize;