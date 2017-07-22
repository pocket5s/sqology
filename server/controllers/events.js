var express = require('express')
  , router = express.Router()
  , db = require('../db')
  , Event = require('../models/event')

router.get('/', function(req, res) {
  Event.all( function(err, rows) {
    res.send( rows );
  });
});

router.get('/scores/:id', function(req, res) {
  var obj = {event_id: parseInt(req.params.id), placings: [], meca:0, iasca:0, distance:0}
  Event.scores( req.params.id, function( err, rows ) {
    if( !err ) { 
      obj.placings = rows;
    }
    else {
      console.log( "ERROR: ", err );
      res.render({msg:'ERROR'})
    }
  });

  console.log( "Found scores, now looking for averages" );
  Event.eventAverages( req.params.id, function( err, data ) {
    if( !err ) {
      obj.meca = data.meca;
      obj.iasca = data.iasca;
      obj.distance = data.distance;
      res.send( obj );
    }
  });

});

router.post( '/addScore', function(req, res) {
  console.log( req.body );
  Event.addScore( req.body, function( err, data ) {
    if( !err ) {
      res.send( {msg:'GOOD!'} );
    }
    else {
      res.send( {msg:err} );
    }
  });
});
module.exports = router
