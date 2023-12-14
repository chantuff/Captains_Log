// Import the Express module
const express = require('express');
const app = express();
const PORT = 3000;

// create a newroute in your server.js- be sure to follow the Restful convention
app.get('/', (req, res) => {
    res.send('new');
  });