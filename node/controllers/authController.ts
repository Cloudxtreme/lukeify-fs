import * as express from 'express';
const config = require('../config.json');

/**
 *
 */
export default class AuthController {

    /**
     *
     * @param req
     * @param res
     */
    public static auth(req: express.Request, res: express.Response) : void {
        let appKey: string = config.key;
        if (req.body.key && appKey === req.body.key) {
            return res.status(200).end();
        } else {
            return res.status(400).end();
        }
    }
}