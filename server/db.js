var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : '192.168.2.15',
  user     : 'sqology',
  password : 'sqishard',
  database : 'sqology',
  supportBigNumbers : true
});

module.exports = pool
