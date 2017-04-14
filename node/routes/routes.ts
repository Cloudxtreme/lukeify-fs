import * as path from 'path';
import * as express from 'express';
import {Router} from 'express';
import files from '../controllers/filesController';
import auth from '../controllers/authController';
import uploads from '../services/UploadsService';

/**
 * Routing table.
 *
 * @param app   An instance of express that is passed into the routing table.
 */
const app: Router = Router();

/**
 * Application entry.
 */
app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

/**
 * System authentication.
 */
app.post('/api/auth', (req: express.Request, res: express.Response) => {
    return auth.auth(req, res);
});

/**
 * Get filecount
 */
app.get('/api/filecount', (req: express.Request, res: express.Response) => {
    return files.count(req, res);
});

/**
 * Get files
 */
app.get('/api/files/:position/:requested', (req: express.Request, res: express.Response) => {
    return files.index(req, res);
});

/**
 * Put file
 */
app.put('/api/files', uploads.upload().array('files'), (req: express.Request, res: express.Response) => {
    return files.put(req, res);
});

export default app;