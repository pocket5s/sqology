var db = require('../db')

exports.all = function( cb ) {
  db.getConnection(function(err, conn) {
    conn.query('SELECT * FROM events ORDER BY event_date DESC', function(err, rows) {
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

exports.scores = function( id, cb ) {
  console.log( "Looking for score for event ", id );
  db.getConnection(function(err, conn) {
    var sql = " \
      select c.name as comp_name, i.total as iasca, m.total as meca, d.total as distance, d.event_id as event_id, sum( i.total + m.total + (d.total/10)) as score \
      from competitors c \
      left join iasca_scores i on i.competitor_id = c.id AND i.event_id = ? \
      left join meca_scores m on m.competitor_id = c.id AND m.event_id = ? \
      left join distances d on d.competitor_id = c.id AND d.event_id = ? \
      where d.total is not null \
      group by comp_name, iasca, meca, distance, event_id \
      order by score desc \
    "
    conn.query(sql, [id,id,id], function(err, rows) {
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

exports.eventAverages = function( id, cb ) {
  var meca = 0;
  var iasca = 0;
  var distance = 0;
  db.getConnection( function(err, conn) {
    var sql = "SELECT round(avg(total),2) as total FROM meca_scores WHERE event_id = ? AND total > 0"

    conn.query(sql, [id], function(err, rows) {
      meca = rows[0].total;
    });

    sql = "SELECT round(avg(total),2) as total FROM iasca_scores WHERE event_id = ? AND total > 0"
    conn.query(sql, [id], function(err, rows) {
      iasca = rows[0].total;
    });

    sql = "SELECT sum(total * 2) as total FROM distances WHERE event_id = ?"
    conn.query(sql, [id], function(err, rows) {
      distance = rows[0].total;
      cb(null, {iasca:iasca, meca:meca, distance:distance} );
    });

    conn.release();
  });
}

exports.addScore = function( data, cb ) {
  db.getConnection( function(err, conn) {
    var sql = "INSERT INTO meca_scores (event_id, competitor_id, total) VALUES (?,?,?)";
    conn.query(sql, [data.eventId, data.competitorId, data.mecaScore], function(err, rows) {
    });

    sql = "INSERT INTO iasca_scores (event_id, competitor_id, total) VALUES (?,?,?)";
    conn.query(sql, [data.eventId, data.competitorId, data.iascaScore], function(err, rows) {
    });

    sql = "INSERT INTO distances (event_id, competitor_id, total) VALUES (?,?,?)";
    conn.query(sql, [data.eventId, data.competitorId, data.distance], function(err, rows) {
      if( err ) {
        console.log( err );
      }
    });

    conn.release();
    cb(null, null);
  });
}

events.markCompleted = function( data, cb ) {
  db.getConnection( function(err, conn) {
    conn.query( "UPDATE events SET scores_posted = 1 WHERE id = ?", [data.id], function(err, rows) {
      conn.release();
    });
    cb(null, null);
  });
}
