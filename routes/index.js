var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/feeds', db.getAllFeeds);
router.post('/feeds', db.insertFeeds);


module.exports = router;
