const File = require('../models/file');

/**
 * Return the count of files, or an error.
 *
 * @param req
 * @param res
 */
module.exports.count = function(req, res) {
    File.countFiles().then(count => {
        return res.json({ count: count });
    }).catch(err => {
        return res.status(500).json({ error: err.message });
    });
};

/**
 * Return an index of some files, or an error.
 *
 * @param req
 * @param res
 */
module.exports.index = function(req, res) {
    File.getFiles(req.params.position, req.params.requested).then(files => {
        return res.json({ files: files });
    }).catch(err => {
        return res.status(500).json({ error: err.message });
    });
};

/**
 * Add a file document to the database.
 *
 * @param req
 * @param res
 */
module.exports.put = function(req, res) {

};