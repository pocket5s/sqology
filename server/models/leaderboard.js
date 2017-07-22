var db = require('../db')

exports.all = function( cb ) {
  db.getConnection(function(err, conn) {
    var sql = " \
      select c.id as userId, c.name as comp_name, avg( i.total + m.total + (d.total/10)) as score \
      from competitors c \
      left join iasca_scores i on i.competitor_id = c.id \
      left join meca_scores m on m.competitor_id = c.id \
      left join distances d on d.competitor_id = c.id \
      group by userId, comp_name \
      order by score desc \
    "
    conn.query(sql, function(err, rows, fields) {
      conn.release();
      if (!err) {
        cb( null, rows );
      }
      else {
        console.log('Error while performing Query.', err);
        cb( err );
      }
    })
  });
}

exports.topFive = function( cb ) {
  db.getConnection(function(err, conn) {
    var sql = " \
      select c.id as userId, c.name as comp_name, avg( i.total + m.total + (d.total/10)) as score \
      from competitors c \
      left join iasca_scores i on i.competitor_id = c.id \
      left join meca_scores m on m.competitor_id = c.id \
      left join distances d on d.competitor_id = c.id \
      group by userId, comp_name \
      order by score desc \
      limit 5 \
    "
    conn.query(sql, function(err, rows, fields) {
      conn.release();
      if (!err) {
        cb( null, rows );
      }
      else {
        console.log('Error while performing Query.', err);
        cb( err )
      }
    })
  });

}
