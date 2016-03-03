var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var app = module.exports = express();
app.use(bodyParser.json());

var routes = require('./routes.json');
app.post('/configure', function (req, res) {
  var body = req.body;
  routes[body.path] = body;
  res.sendStatus(204);

  console.log('Registered response', body);
});

app.post('/clear', function (req, res) {
  routes = {};
  res.sendStatus(204);

  console.log('Cleared responses');
});

app.use(function (req, res, next) {
  if (!routes[req.path]) { return next(); }
  var response = routes[req.path];
  if (response.statusCode) {
    res.status(response.statusCode);
  }

  var body = {};
  _.forEach(response.body, function (value, key) {
    if (typeof value === 'string') {
      body[key] = _.template(value)(req);
    } else {
      body[key] = value;
    }
  });

  res.json(body);
  console.log('Replied to', req.path, 'with', body);
});

if (process.env.MOCK_API === 'running') {
  var port = process.env.PORT || 3100;
  app.listen(port);
  console.log('Listening on', port);
}
