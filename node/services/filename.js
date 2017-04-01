const fs = require('fs');
const path = require('path');
const randomstring = require('randomstring');
const config = require('../config.json');

let storageDir = process.env.NODE_ENV === 'production' ? config.directory : path.join(__dirname, config.mockDirectory);

/**
 *
 */
module.exports.randomFilenameForFile = function() {
    // filename state
    let state = {
        currentChars: 3,
        attempts: 0,
        maxAttempts: 10,
        success: false
    };

    let recurseToFindFilenameFn = function() {
        if (state.attempts < state.maxAttempts) {

            let filename = randomstring.generate(state.currentChars);



            fs.access(storageDir, fs.constants.F_OK, err => {
                if (err) {
                    attempts++;
                    return recurseToFindFilenameFn();
                }
                return
            });
        } else {
            state.currentChars++;
            state.attempts = 0;
            return recurseToFindFilenameFn();
        }
    };

    return recurseToFindFilenameFn();
};