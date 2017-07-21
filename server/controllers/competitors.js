var express = require('express')
  , router = express.Router()
  , db = require('../db')
  , Competitor = require('../models/competitor')


router.get('/names', function(req, res) {
  Competitor.names( function( err, rows ) {
    if( !err ) { 
      res.send( rows );
    }
    else {
      console.log( "ERROR: ", err );
      res.send({msg:'ERROR'})
    }
  });
});

module.exports = router
