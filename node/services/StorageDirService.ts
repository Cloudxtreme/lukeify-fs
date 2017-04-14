import * as path from 'path';
const config = require('../config.json');

/**
 *
 */
export default class StorageDirService {

    /**
     *
     * @returns {string}
     */
    public static get() : string {
        return process.env.NODE_ENV === 'production' ? config.directory : path.join(__dirname, config.mockDirectory);
    }
}