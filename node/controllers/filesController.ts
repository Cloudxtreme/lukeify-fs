import * as express from 'express';
import * as multer from 'multer';
import File from "../models/File";

/**
 *
 */
export default class FilesController {

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<Response>}
     */
    public static async count(req: express.Request, res: express.Response) : Promise<express.Response> {
        try {
            let count = await File.countFiles();
            return res.json({ count: count });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<Response>}
     */
    public static async index(req: express.Request, res: express.Response) : Promise<express.Response> {
        try {
            let position: number = Number.parseInt(req.params.position);
            let requested: number = Number.parseInt(req.params.requested);

            let files = await File.getFilesFromPosition(position, requested);
            return res.json({ files: files });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    public static async put(req: Express.Request, res: express.Response) {
        /*let files = req.files.map(f => {
            return {
             name: f.filename.split(".")[0],
             filename: f.filename,
             createdAt: new Date(),
             size: f.size,
             originalName: f.originalname
             }
        });

        try {
            let addFileResponse = await File.addFiles(files);
            return res.json({ files: addFileResponse });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }*/
    }
}