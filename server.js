// require dotenv so that I can use the .env fil
require('dotenv').config();

// Import the Express module
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const Log = require('./models/log');
const jsxViewEngine = require('jsx-view-engine');

const bodyParser = require('body-parser');

const Log = require('./models/logs');
const logRoutes = require('./controllers/logs');

  app.use('/logs', logRoutes);

app.use(bodyParser.json());

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

//   // I - INDEX - dsiplays a list of all logs
// app.get('/logs/', async (req, res) => {
//     // res.send(logs);
//     try {
//         const foundLogs = await Log.find({});
//         res.status(200).render('logs/Index', {logs: foundLogs});
//     } catch (err) {
//         res.status(400).send(err);
//     }
    
// });

// N - NEW - allows a user to log new entry
// app.get('/logs/new', (req, res) => {
//     res.render('logs/New');
// });

// D - DELETE - PERMANENTLY removes log from the database
// app.delete('/logs/:id', async (req, res) => {
//     // res.send('deleting...');
//     try {
//         const deletedLog = await Log.findByIdAndDelete(req.params.id);
//         console.log(deletedLog);
//         res.status(200).redirect('/logs');
//     } catch (err) {
//         res.status(400).send(err);
//     }
// })

// U - UPDATE - makes the actual changes to the database based on the EDIT form
// app.put('/logs/:id', async (req, res) => {
//     if (req.body.shipIsBroken === 'on') {
//         req.body.shipIsBroken = true;
//     } else {
//         req.body.shipIsBroken = false;
//     }

//     try {
//         const updatedLog = await Log.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true },
//         );
//         console.log(updatedLog);
//         res.status(200).redirect(`/logs/${req.params.id}`);
//     } catch (err) {
//         res.status(400).send(err);
//     }
//  })

// C - CREATE - update our data store
// app.post('/logs', async (req, res) => {
//     if(req.body.shipIsBroken === 'on') { //if checked, req.body.shipIsBroken is set to 'on'
//         req.body.shipIsBroken = true;
//     } else {  //if not checked, req.body.readyToEat is undefined
//         req.body.shipIsBroken = false;
//     }

//     try {
//         const createdLog = await Log.create(req.body);
//         res.status(200).redirect('/logs');
//     } catch (err) {
//         res.status(400).send(err);
//     }
    // logs.push(req.body);
    // console.log(logs);
    // console.log(req.body)
    // res.send('data received');
    //  *** We will add this back in later
    //  ***
    // res.redirect('/logs'); // send user back to /logs
// })

// E - EDIT - allow the user to provide the inputs to change the log
// app.get('/logs/:id/edit', async (req, res) => {
//     try {
//         const foundLog = await Log.findById(req.params.id);
//         console.log('foundLog');
//         console.log(foundLog)
//         res.status(200).render('logs/Edit', {log: foundLog});
//     } catch (err) {
//         res.status(400).send(err);
//     }
// })

// S - SHOW - show route displays details of an individual log
// app.get('/logs/:id', async (req, res) => {
//     // res.send(logs[req.params.indexOfLogsArray]);
//     try {
//         const foundLog = await Log.findById(req.params.id);
//         res.render('logs/Show', {log: foundLog});
//     } catch (err) {
//         res.status(400).send(err);
//     }

// })

  app.listen(port, () => {
    console.log('listening');
});