var db = require('../db')

exports.all = function( cb ) {
  db.getConnection(function(err, conn) {
    conn.query('SELECT * FROM events ORDER BY event_date DESC', function(err, rows) {
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

exports.scores = function( id, cb ) {
  console.log( "Looking for score for event ", id );
  db.getConnection(function(err, conn) {
    var sql = " \
      select c.name as comp_name, i.total as iasca, m.total as meca, d.total as distance, d.event_id as event_id, sum( i.total + m.total + (d.total/10)) as score \
      from competitors c \
      left join iasca_scores i on i.competitor_id = c.id \
      left join meca_scores m on m.competitor_id = c.id \
      left join distances d on d.competitor_id = c.id \
      where d.event_id = ? \
      group by comp_name, iasca, meca, distance, event_id \
      order by score desc \
    "
    conn.query(sql, [id], function(err, rows) {
      conn.release();
      if (!err) {
        cb( null, rows )
      }
      else {
        console.log('Error while performing Query.', err);
        cb( err );
      }
    });
  });
}
