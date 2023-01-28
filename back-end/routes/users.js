var express = require('express');
var router = express.Router();

/* GET users listing. */                    // This was a default path I haven't deleted yet
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
