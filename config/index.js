const config = require('./config');
const pgp = require("pg-promise")();

// Create connection string
var connectionString = 'postgres://' + 
    config.username + ':' + 
    config.password + '@' + 
    config.host + ':' + 
    config.port + '/' + 
    config.dbname;

// Connect to db
var db = pgp(connectionString);

// Return db connection
module.exports = db;