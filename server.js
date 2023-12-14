// require dotenv so that I can use the .env fil
require('dotenv').config();

// Import the Express module
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Log = require('./models/log');
const jsxViewEngine = require('jsx-view-engine');



// Global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

// ==============Middleware=====================================
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));

// create a new route in your server.js- be sure to follow the Restful convention
app.get('/', (req, res) => {
    res.send('This is my logs route');
  });

  // I - INDEX - dsiplays a list of all logs
app.get('/logs/', async (req, res) => {
    // res.send(logs);
    try {
        const foundLogs = await Log.find({});
        res.status(200).render('logs/Index', {logs: foundLogs});
    } catch (err) {
        res.status(400).send(err);
    }
    
});

  app.listen(port, () => {
    console.log('listening');
});