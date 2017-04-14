import * as multer from 'multer';
import * as express from 'express';
import storageDirService from "./StorageDirService";
import fileService from './FileService';
const config = require('../config.json');

/**
 *
 */
export default class UploadsService {

    /**
     *
     * @returns {multer.Instance}
     */
    public static upload() : multer.Instance {
        let storageSettings : multer.DiskStorageOptions = {
            destination: function(req, file, cb) {
                cb(null, storageDirService.get());
            },
            filename: async function(req, file, cb) {
                let filename = await fileService.random() + fileService.extension(file.mimetype);
                cb(null, filename);
            }
        };

        let multerDiskStorage : multer.StorageEngine = multer.diskStorage(storageSettings);

        let multerSettings : multer.Options = {
            storage: multerDiskStorage,
            fileFilter: function(req: express.Request, file: Express.Multer.File, cb) {
                cb(null, req.header('App-Key') === config.key);
            }
        };

        return multer(multerSettings);
    }
}