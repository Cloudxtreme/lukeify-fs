const multer = require('multer');
const config = require('../config.json');
const storageDir = require('./storageDir');
const fileService = require('./fileService');

let storageSettings = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, storageDir.get());
    },
    filename: async function(req, file, cb) {
        let filename = await fileService.random() + fileService.extension(file.mimetype);
        cb(null, filename);
    },
    fileFilter: function(req, file, cb) {
        cb(null, req.header('App-Key') === config.key);
    }
});

module.exports.upload = function() {
    return multer({ storage: storageSettings });
};