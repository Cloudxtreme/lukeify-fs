const config    = require('../config.json');

module.exports.auth = function(req, res) {
    if (req.body.key && config.key === req.body.key) {
        return res.status(200).end();
    } else {
        return res.status(400).end();
    }
}