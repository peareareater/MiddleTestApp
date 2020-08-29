const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../user/model'),
    History: require('../history/model')
};