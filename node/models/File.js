const config = require('../config.json');
const r = require('rethinkdb');

const FILES_TABLE = 'files';

/**
 *
 * @returns {Promise.<*>}
 */
module.exports.countFiles = async function() {
    let conn = await r.connect(config.database);
    return await r.db(config.dbName).table(FILES_TABLE).count().run(conn);
};

/**
 *
 * @param position
 * @param requested
 * @returns {Promise.<*>}
 */
module.exports.getFilesFromPostion = async function(position, requested) {
    let conn = await r.connect(config.database);
    let cursor = await r.db(config.dbName).table(FILES_TABLE).run(conn);
    return await cursor.toArray();
};

/**
 * Returns all files.
 *
 * @param filter
 * @returns {Promise.<void>}
 */
module.exports.getFiles = async function(filter) {
    let conn = await r.connect(config.database);
    let cursor = await r.db(config.dbName).table(FILES_TABLE).filter(filter).run(conn);
    return await cursor.toArray();
};

module.exports.getFile = function(name) {

};

/**
 *
 * @param files
 * @returns {Promise.<*>}
 */
module.exports.addFiles = async function(files) {
    let conn = await r.connect(config.database);
    let results = await r.db(config.dbName).table(FILES_TABLE).insert(files, {
        return_changes: true
    }).run(conn);

    return results.changes.map(f => f.new_val);
};

module.exports.updateFile = function(name, details) {

};

module.exports.deleteFile = function(name) {

};
