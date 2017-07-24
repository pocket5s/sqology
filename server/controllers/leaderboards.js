var express = require('express')
  , router = express.Router()
  , db = require('../db')
  , Leaderboard = require('../models/leaderboard')


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
