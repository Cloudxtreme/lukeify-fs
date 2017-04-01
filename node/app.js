/**
 * Requires
 */
const path = require('path');
const fs = require('fs');
let config = require('./config.json');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const r = require('rethinkdb');
const filenameService = require('./services/filename');

/**
 * Configure database. If the database and table does not exist, create it first.
 */
r.connect(config.database, function(err, conn) {
    if (err) throw err;

    r.dbList().contains('lukeifyfs')
        .do(databaseExists => {
            return r.branch(databaseExists, { dbs_created: 0}, r.dbCreate('lukeifyfs'))
        }).run(conn, (err, result) => {
            if (result.dbs_created === 1) {
                r.db('lukeifyfs').tableCreate('files', {
                    primaryKey: 'name'
                }).run(conn);
            }
        });
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
const upload = multer({ dest: storageDir });

/**
 * Setup JSON body parsing and support for static directories.
 */
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, '../dist/static')));
app.use('/', express.static(storageDir));

/**
 * Import routing table.
 */
let routes = require("./routes/routes.js")(app);

/**
 * Run server
 */
app.listen(3001, function() {

});