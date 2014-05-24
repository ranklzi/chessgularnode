var pg = require('pg');
var nconf = require('nconf');

exports.executeResults = function(query, values, callback) {

	nconf.file('./Configuration/settings.json');

	var db = new pg.Client(nconf.get('connectionString'));

	db.connect(function(err) {
  		if(err) {
    		return console.error('could not connect to postgres', err);
  		}
		db.query(query, function(err, result) {
		if(err) {
  			return console.error('error running query', err);
		}
		console.dir(result);
		db.end();
		return result.rows;
		});
	}); 
};