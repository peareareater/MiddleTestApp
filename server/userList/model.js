const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('UserList', schema);