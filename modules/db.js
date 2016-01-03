var mysql = require('mysql');
var connection = mysql.createConnection({
  
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Books_DB'
});

module.exports = connection;
