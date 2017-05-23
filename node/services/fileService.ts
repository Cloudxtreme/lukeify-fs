import * as r from "rethinkdb";
import * as randomstring from "randomstring";
import {ConnectOptions} from "rethinkdb";
const config = require('../config.json');

/**
 * @class FileService
 */
export default class FileService {

    /**
     *
     * @returns {}
     */
    public static async random() {
        // filename state
        let state = {
            currentChars: 3,
            attempts: 0,
            maxAttempts: 10
        };

        async function recurseToFindFilename() {
            if (state.attempts < state.maxAttempts) {
                let newFilename : string = randomstring.generate(state.currentChars);
                let dbConfig : ConnectOptions = config.database;
                let conn = await r.connect(dbConfig);
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
    }

    /**
     * For a given mimetype, return the extension that matches. Currently handles most image formats.
     *
     * @param mime {string}
     * @returns {string}
     */
    public static extension(mime: string) : string {
        switch (mime) {
            case "image/jpeg" || "image/jpg":
                return ".jpg";
            case "image/png":
                return ".png";
            case "image/gif":
                return ".gif";
            case "image/raw":
                return ".raw";
            default:
                return "";
        }
    };
}