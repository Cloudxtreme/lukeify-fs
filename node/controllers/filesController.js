const File = require('../models/File');

/**
 * Return the count of files, or an error.
 *
 * @param req
 * @param res
 */
module.exports.count = async function(req, res) {
    try {
        let count = await File.countFiles();
        return res.json({ count: count });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

/**
 * Return an index of some files, or an error.
 *
 * @param req
 * @param res
 */
module.exports.index = async function(req, res) {
    try {
        let files = await File.getFiles(req.params.position, req.params.requested);
        return res.json({ files: files });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

/**
 * Add a file document to the database and return the documents inserted.
 *
 * @param req
 * @param res
 */
module.exports.put = async function(req, res) {
    let files = req.files.map(f => {
        return {
            name: f.filename.split(".")[0],
            filename: f.filename,
            createdAt: new Date(),
            size: f.size,
            originalName: f.originalname
        }
    });

    try {
        let addFileResponse = await File.addFiles(files);
        return res.json({ files: addFileResponse });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};