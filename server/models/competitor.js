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

exports.add = function( data, cb ) {
  var values = [data.name, data.email, data.vehicle, data.zip]
  db.getConnection(function(err, conn) {
    conn.query('INSERT INTO competitors ( name, email, vehicle, zip ) VALUES ( ?,?,?,? )', values, function(err, result) {
      conn.release();
      if( !err ) {
        cb(null, {msg:'OK', name:data.name, id:result.insertId, email:data.email, vehicle:data.vehicle});
      }
      else {
        console.log( err );
        cb(err);
      }
    });
  });
}
