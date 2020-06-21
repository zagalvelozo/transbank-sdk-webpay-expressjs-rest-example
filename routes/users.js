var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user = req.query.user || 'superuser';
  res.send({ user: user });
});

module.exports = router;
