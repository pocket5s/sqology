var db = require('../db')

exports.names = function( cb ) {
  db.getConnection(function(err, conn) {
    conn.query('SELECT id, name, zip FROM competitors ORDER BY name ASC', function(err, rows) {
      conn.release();
      if( !err ) {
        cb(null, rows);
      }
      else {
        console.log( err );
        cb(err);
      }
    });
  });
}

