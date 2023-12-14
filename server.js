// Import the Express module
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// create a newroute in your server.js- be sure to follow the Restful convention
app.get('/new', (req, res) => {
    res.send('new');
  });