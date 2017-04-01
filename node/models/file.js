const config = require('../config.json');
const r = require('rethinkdb');

const FILES_TABLE = 'files';

/**
 * Count the number of files present.
 *
 * @returns {Promise}
 */
module.exports.countFiles = function() {
    return new Promise((resolve, reject) => {
        r.connect(config.database).then(conn => {
            return r.db(config.dbName)
                .table(FILES_TABLE)
                .count()
                .run(conn);
        })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
};

/**
 * Get all the files in the database.
 * @returns {Promise}
 */
module.exports.getFiles = function(position, requested) {
    return new Promise((resolve, reject) => {
        r.connect(config.database).then(conn => {
            return r.db(config.dbName).table(FILES_TABLE).run(conn);
        }).then(cursor => {
            return cursor.toArray();
        })
        .then((results) => resolve(results))
        .catch(err => reject(err));
    });
};

module.exports.getFile = function(name) {
    return new Promise((resolve, reject) => {

    });
};

module.exports.addFile = function(details) {
    return new Promise((resolve, reject) => {

    });
};

module.exports.updateFile = function(name, details) {
    return new Promise((resolve, reject) => {

    });
};

module.exports.deleteFile = function(name) {
    return new Promise((resolve, reject) => {

    });
};
