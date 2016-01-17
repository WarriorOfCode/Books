var config = {
  
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Books_DB'
};

module.exports = require('node-mysql-connect')(config);