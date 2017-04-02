/**
 * Requires
 */
const path = require('path');
let config = require('./config.json');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const r = require('rethinkdb');
const storageDir = require('./services/storageDir');

/**
 * Configure database. If the database and table does not exist, create it first.
 */
let initializeDb = async function() {
    let conn    = await r.connect(config.database);
    let result  = await r.dbList().contains(config.dbName).do(databaseExists => {
                    return r.branch(databaseExists, { dbs_created: 0 }, r.dbCreate(config.dbName));
                }).run(conn);

    // If we're not in production, or we're in production and we just created a database, we want to
    if (process.env.NODE_ENV !== 'production' || (process.env.NODE_ENV === "production" && result.dbs_created === 1)) {

        if (process.env.NODE_ENV !== 'production' && result.dbs_created === 0) {
            var outcome = await r.db(config.dbName).tableDrop('files').run(conn);
        }

        await r.db(config.dbName).tableCreate('files', {
            primaryKey: 'name'
        }).run(conn);
    }
};

try {
    initializeDb();
} catch (e) {

}

/**
 * Setup JSON body parsing and support for static directories.
 */
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, '../dist/static')));
app.use('/', express.static(storageDir.get()));

/**
 * Import routing table.
 */
let routes = require("./routes/routes.js")(app);

/**
 * Run server
 */
app.listen(3001, function() {

});