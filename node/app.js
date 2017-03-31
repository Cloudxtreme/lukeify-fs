/**
 * Requires
 */
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
let config = require('./config.json');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const r = require('rethinkdb');
const filenameService = require('./services/filename');

/**
 * Configure database
 */
let connection = null;
r.connect({host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

/**
 * Setup file uploading and support
 * @type {multer}
 */
const multer = require('multer');
let storageDir = process.env.NODE_ENV === 'production' ? config.directory : path.join(__dirname, config.mockDirectory);

let storageSettings = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, storageDir);
    },
    filename: function(req, file, cb) {
        cb(null, filenameService.randomFilenameForFile());
    }
});


/**
 * Setup JSON body parsing and support for static directories.
 */

const upload = multer({ dest: storageDir });

app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, '../dist/static')));
app.use('/', express.static(storageDir));

/**
 * Home route
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/**
 * System authentication
 */
app.post('/api/auth', (req, res) => {
    if (req.body.key && config.key === req.body.key) {
        return res.status(200).end();
    } else {
        return res.status(400).end();
    }
});

/**
 * Upload files
 */
app.put('/api/upload', (req, res) => {

});

/**
 * Count the number of files and return the result
 */
app.get('/api/filecount', (req, res) => {
    fs.readdir(storageDir, (err, files) => {
        if (err) {
            return res.status(500).end();
        }
        return res.json({
            // Return all files that aren't directories or hidden dot files
            fileCount: files.filter(i => !(/(^|\/)\.[^\/\.]/g).test(i)).length
        });
    });
});

/**
 * Fetch a set of files, organized by date of last modified, descending.
 */
app.get('/api/files/:position/:requested', (req, res) => {

});

/**
 * Run server
 */
app.listen(3001, function() {

});