var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : '192.168.2.15',
  user     : 'sqology',
  password : 'sqishard',
  database : 'sqology'
});

/*
pool.getConnection(function(err, conn) {
  conn.query('SELECT * from competitors LIMIT 2', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
  })
  conn.release();
});
*/

module.exports = pool
