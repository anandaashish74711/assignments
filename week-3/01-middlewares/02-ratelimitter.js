const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();

let numberOfRequestsForUser = {};

app.use(function(req, res, next) {
  const userId = req.headers['user-id'];

  // Initialize the request count for the user if it doesn't exist
  numberOfRequestsForUser[userId] = numberOfRequestsForUser[userId] || 0;

  if (numberOfRequestsForUser[userId] <= 5) {
    // Increment the request count for the user
    numberOfRequestsForUser[userId]++;
    next();
  } else {
    res.status(404).send('Not Found'); // Change to 404 for blocking
  }
});

setInterval(() => {
  numberOfRequestsForUser = {};
}, 1000);

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.listen(3000);

module.exports = app;
