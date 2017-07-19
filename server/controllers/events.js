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
  Event.scores( req.params.id, function( err, rows ) {
    if( !err ) { 
      res.send( rows );
    }
    else {
      console.log( "ERROR: ", err );
      res.render({msg:'ERROR'})
    }
  });
    return;
});

module.exports = router
