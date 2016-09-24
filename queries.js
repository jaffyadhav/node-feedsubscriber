var promise = require('bluebird'),
    _ = require('underscore');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/feed_db';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllFeeds: getAllFeeds,
  insertFeeds: insertFeeds,
};

function getAllFeeds(req, res, next) {
  db.any('select * from feed_data')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL feeds'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function insertFeeds(req, res, next) {
  var defaultObj = {
        id: null,
        title: null,
        content: null,
        permalinkUrl: null,
        published: null,
        updated: null
      },
      feedItems = req.body.items;
  db.tx(function (t) {
    var queries = feedItems.map(function (l) {
      l = _.extend(defaultObj, l);
      return t.none('insert into feed_data(feed_id, title, content, link, published, updated)' +
         'values(${id}, ${title}, ${content}, ${permalinkUrl}, ${published}, ${updated})', l);
      });
      return t.batch(queries);
    })
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Feeds Received'
        });
    })
    .catch(function (err) {
      console.log(err)
      return next(err);
    });
}
