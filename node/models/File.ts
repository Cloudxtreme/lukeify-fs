import * as r from "rethinkdb";
import {ConnectOptions} from "rethinkdb";
const config = require('../config.json');

const FILES_TABLE = 'files';

/**
 * @class File
 */
export default class File {

    /**
     *
     * @returns {}
     */
    private static conn() {
        let dbConnection : ConnectOptions = config.database;
        return r.connect(dbConnection);
    }

    /**
     *
     * @returns {Promise<number>}
     */
    public static async countFiles() : Promise<number> {
        let conn = await this.conn();
        return await r.db(config.dbName).table(FILES_TABLE).count().run(conn);
    }

    /**
     *
     * @param position
     * @param requested
     * @returns {Promise<any>}
     */
    public static async getFilesFromPosition(position: number, requested: number) {
        let conn = await this.conn();
        let cursor = await r.db(config.dbName).table(FILES_TABLE).run(conn);
        return await cursor.toArray();
    }

    /**
     *
     * @param filter
     * @returns {Promise<any>}
     */
    public static async getFiles(filter) {
        let conn = await this.conn();
        let cursor = await r.db(config.dbName).table(FILES_TABLE).filter(filter).run(conn);
        return await cursor.toArray();
    }

    /**
     *
     * @param name
     * @returns {Promise<void>}
     */
    public static async getFile(name: string) {

    }

    /**
     *
     * @param files
     * @returns {Promise<void>}
     */
    public static async addFiles(files) {
        let conn = await this.conn();
        let results = await r.db(config.dbName).table(FILES_TABLE).insert(files, {
            return_changes: true
        }).run(conn);

        return results.changes.map(f => f.new_val);
    }

    /**
     *
     * @param name
     * @param details
     * @returns {Promise<void>}
     */
    public static async updateFile(name: string, details) {

    }

    public static async deleteFile(name: string) {

    }
}
