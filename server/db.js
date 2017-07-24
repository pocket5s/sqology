var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'sqology',
  password : 'sqishard',
  database : 'sqology',
  supportBigNumbers : true
});

module.exports = pool
