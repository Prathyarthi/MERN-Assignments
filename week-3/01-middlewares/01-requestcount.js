const express = require('express');

const app = express();
let requestCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable

app.use(function requestCountMiddleware(req,res,next) {
  requestCount = requestCount + 1;
  next();
})

app.get('/user', function (req, res) {
  res.status(200).json({ name: 'john' });
  res.send(requestCount);
});

app.post('/user', function (req, res) {
  res.status(200).json({ msg: 'created dummy user' });
  res.send(requestCount);
});

app.get('/requestCount', function (req, res) {
  res.status(200).json({ requestCount });
  res.send(requestCount);
});


module.exports = app;