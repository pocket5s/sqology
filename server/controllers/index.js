var express = require('express')
  , router = express.Router()

router.use('/events', require('./events'))
router.use('/standings', require('./standings'))

module.exports = router
