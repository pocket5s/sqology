var express = require('express')
  , router = express.Router()
  , db = require('../db')
  , Leaderboard = require('../models/leaderboard')

router.get('/', function(req, res) {
  Leaderboard.topFive( function( err, rows ) {
    if( !err ) {
      res.send( rows )
    }
    else {
      res.send( {msg:'Error'} );
    }
  });
});

router.get('/all', function(req, res) {
  Leaderboard.all( function( err, rows ) {
    if( !err ) {
      res.send( rows )
    }
    else {
      res.send( {msg:'Error'} );
    }
  });
});

module.exports = router
