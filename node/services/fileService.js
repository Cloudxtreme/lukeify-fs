const path = require('path');
const r = require('rethinkdb');
const randomstring = require('randomstring');
const config = require('../config.json');

let storageDir = process.env.NODE_ENV === 'production' ? config.directory : path.join(__dirname, config.mockDirectory);

/**
 *
 */
module.exports.random = function() {
    // filename state
    let state = {
        currentChars: 3,
        attempts: 0,
        maxAttempts: 10
    };

    async function recurseToFindFilename() {
        if (state.attempts < state.maxAttempts) {
            let newFilename = randomstring.generate(state.currentChars);
            let conn = await r.connect(config.database);
            let result = await r.db(config.dbName)
                        .table('files')
                        .get(newFilename)
                        .run(conn);
            if (result) {
                return recurseToFindFilename();
            } else {
                return newFilename;
            }
        } else {
            state.currentChars++;
            state.attempts = 0;
            return recurseToFindFilename();
        }
    }

    return recurseToFindFilename();
};

module.exports.extension = function(mime) {
    switch (mime) {
        case "image/jpeg" || "image/jpg":
            return ".jpg";
        case "image/png":
            return ".png";
        case "image/gif":
            return ".gif";
        default:
            return "";
    }
};