const path = require('path');
const config = require('../config.json');

module.exports.get = function() {
    return process.env.NODE_ENV === 'production' ? config.directory : path.join(__dirname, config.mockDirectory);
};