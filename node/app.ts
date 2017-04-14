import * as path from 'path';
import * as express from 'express';
import * as bodyParser  from 'body-parser';
import * as  r from 'rethinkdb';
import {ConnectOptions} from "rethinkdb";
import routes from "./routes/routes";
import storageDirService from './services/StorageDirService';
const config = require('./config.json');

const app : express.Express = express();

/**
 * Configure database. If the database and table does not exist, create it first.
 */
let initializeDb = async function() {
    let dbConnectionOptions : ConnectOptions = config.database;
    let conn    = await r.connect(dbConnectionOptions);
    let result  = await r.dbList().contains(config.dbName).do(databaseExists => {
        return r.branch(databaseExists, { dbs_created: 0 }, r.dbCreate(config.dbName));
    }).run(conn);

    // If we're not in production, or we're in production and we just created a database, we want to
    if (process.env.NODE_ENV !== 'production' || (process.env.NODE_ENV === "production" && result.dbs_created === 1)) {

        if (process.env.NODE_ENV !== 'production' && result.dbs_created === 0) {
            let outcome = await r.db(config.dbName).tableDrop('files').run(conn);
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
app.use('/', routes);
app.use('/', express.static(storageDirService.get()));

/**
 * Run server
 */
app.listen(3001, () => {});