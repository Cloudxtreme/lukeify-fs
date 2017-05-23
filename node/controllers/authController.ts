import * as express from 'express';
const config = require('../config.json');

/**
 * @class AuthController
 */
export default class AuthController {

    /**
     * Provided the authentication token in the `key` field of the request body matches that of the application key, we
     * should return 200 OK to the user. If the key provided is incorrect, return 401 Unauthorized.
     *
     * @param req {express.Request} The express request instance.
     * @param res {express.Response} The express response instance.
     */
    public static auth(req: express.Request, res: express.Response) : void {
        let appKey: string = config.key;
        if (req.body.key && appKey === req.body.key) {
            return res.status(200).end();
        } else {
            return res.status(401).end();
        }
    }
}