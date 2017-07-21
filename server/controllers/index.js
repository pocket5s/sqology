var express = require('express')
  , router = express.Router()

router.use('/events', require('./events'))
router.use('/standings', require('./standings'))
router.use('/leaderboards', require('./leaderboards'))
router.use('/competitors', require('./competitors'))

module.exports = router
