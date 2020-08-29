const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    message: { type: String, required: true },
    name: { type: String, required: true },
});

module.exports = mongoose.model('History', schema);