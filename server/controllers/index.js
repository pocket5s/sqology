var express = require('express')
  , router = express.Router()

router.use('/events', require('./events'))
router.use('/standings', require('./standings'))
router.use('/leaderboards', require('./leaderboards'))

module.exports = router
