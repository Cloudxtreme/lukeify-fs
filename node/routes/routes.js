const path      = require('path');
const files     = require('../controllers/files');
const auth      = require('../controllers/auth');

/**
 * Routing table.
 *
 * @param app   An instance of express that is passed into the routing table.
 */
module.exports = function(app) {

    /**
     * Application entry.
     */
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });

    /**
     * System authentication.
     */
    app.post('/api/auth', (req, res) => {
        return auth.auth(req, res);
    });

    /**
     * Get filecount
     */
    app.get('/api/filecount', (req, res) => {
        return files.count(req, res);
    });

    /**
     * Get files
     */
    app.get('/api/files/:position/:requested', (req, res) => {
        return files.index(req, res);
    });

    /**
     * Put file
     */
    app.put('/api/files', (req, res) => {
        return files.put(req, res);
    });
};