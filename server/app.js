const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();
const db = require('./db.js');

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/events.json', function(req, res) {
  db.getConnection(function(err, conn) {
    conn.query('SELECT * FROM events ORDER BY event_date DESC', function(err, rows) {
      if( !err ) {
        res.send( rows );
      }
      else {
        console.log( err );
        res.send({msg:'Error'});
      }
    });
  });
});

app.get('/standings.json', function(req, res) {
  db.getConnection(function(err, conn) {
    var sql = " \
      select c.name as comp_name, avg( i.total + m.total + (d.total/10)) as score \
      from competitors c \
      left join iasca_scores i on i.competitor_id = c.id \
      left join meca_scores m on m.competitor_id = c.id \
      left join distances d on d.competitor_id = c.id \
      group by comp_name \
      order by score desc \
      limit 5 \
    "
    conn.query(sql, function(err, rows, fields) {
    if (!err) {
      res.send( rows );
    }
    else
      console.log('Error while performing Query.', err);
    })
    conn.release();
  });
});

app.get('/allstandings.json', function(req, res) {
  db.getConnection(function(err, conn) {
    var sql = " \
      select c.name as comp_name, avg( i.total + m.total + (d.total/10)) as score \
      from competitors c \
      left join iasca_scores i on i.competitor_id = c.id \
      left join meca_scores m on m.competitor_id = c.id \
      left join distances d on d.competitor_id = c.id \
      group by comp_name \
      order by score desc \
    "
    conn.query(sql, function(err, rows, fields) {
    if (!err) {
      res.send( rows );
    }
    else
      console.log('Error while performing Query.', err);
    })
    conn.release();
  });
});

app.get('/eventscores.json', function(req, res) {
  var id = req.query.id;
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
    conn.query(sql, [id], function(err, rows, fields) {
    if (!err) {
      res.send( rows );
    }
    else
      console.log('Error while performing Query.', err);
    })
    conn.release();
  });
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.listen(8000, function() {
  console.log( "Server started..." );
});
//module.exports = app;
