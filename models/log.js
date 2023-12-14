const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    name: { type: String, required: true},
    color: { type: String, required: true},
    readyToEat: Boolean
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;