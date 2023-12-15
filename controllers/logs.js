const express = require('express');
const router = express.Router();
 const Log = require('../models/log');

// create a new route in your server.js- be sure to follow the Restful convention
// router.get('/', (req, res) => {
//     res.send('This is my logs route');
//   });

  

// C - CREATE - update our data store
router.post('/logs', async (req, res) => {
    if(req.body.shipIsBroken === 'on') { //if checked, req.body.shipIsBroken is set to 'on'
        req.body.shipIsBroken = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.shipIsBroken = false;
    }

    try {
        const createdLog = await Log.create(req.body);
        res.status(200).redirect('/logs');
    } catch (err) {
        res.status(400).send(err);
    }
    // logs.push(req.body);
    // console.log(logs);
    // console.log(req.body)
    // res.send('data received');
    //  *** We will add this back in later
    //  ***
    // res.redirect('/logs'); // send user back to /logs
})

// I - INDEX - dsiplays a list of all logs
router.get('/', async (req, res) => {
    // res.send(logs);
    try {
        const foundLogs = await Log.find({});
        res.status(200).render('logs/Index', {logs: foundLogs});
    } catch (err) {
        res.status(400).send(err);
    }
    
});
// N - NEW - allows a user to log new entry
router.get('/new', (req, res) => {
    res.render('logs/New');
});

// D - DELETE - PERMANENTLY removes log from the database
router.delete('/', async (req, res) => {
    // res.send('deleting...');
    try {
        const deletedLog = await Log.findByIdAndDelete(req.params.id);
        console.log(deletedLog);
        res.status(200).redirect('/logs');
    } catch (err) {
        res.status(400).send(err);
    }
})

// U - UPDATE - makes the actual changes to the database based on the EDIT form
router.put('/', async (req, res) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }

    try {
        const updatedLog = await Log.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
        console.log(updatedLog);
        res.status(200).redirect(`/logs/${req.params.id}`);
    } catch (err) {
        res.status(400).send(err);
    }
 })

 // E - EDIT - allow the user to provide the inputs to change the log
router.get('/', async (req, res) => {
    try {
        const foundLog = await Log.findById(req.params.id);
        console.log('foundLog');
        console.log(foundLog)
        res.status(200).render('logs/Edit', {log: foundLog});
    } catch (err) {
        res.status(400).send(err);
    }
})

// S - SHOW - show route displays details of an individual log
router.get('/log', async (req, res) => {
    // res.send(logs[req.params.indexOfLogsArray]);
    try {
        const foundLog = await Log.findById(req.params.id);
        res.render('logs', {log: foundLog});
    } catch (err) {
        res.status(400).send(err);
    }

})


module.exports = router;
