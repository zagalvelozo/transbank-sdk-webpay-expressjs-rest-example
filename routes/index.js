var express = require('express');
var router = express.Router();


router.get('/search', function(req, res) {
  let query = req.query.q;
  res.send({ query: query });
});

module.exports = router;
