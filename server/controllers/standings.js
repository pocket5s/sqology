var express = require('express')
  , router = express.Router()
  , db = require('../db')
  , Standing = require('../models/standing')


router.get('/all', function(req, res) {
  Standing.all( function( err, rows ) {
    if( !err ) {
      res.send( rows )
    }
    else {
      res.send( {msg:'Error'} );
    }
  });
});

module.exports = router
