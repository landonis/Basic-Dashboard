export function errorHandler(err, req, res, next) {
    console.error('[ERROR]', err.stack || err);
    res.status(500).json({ error: 'Internal Server Error' });
}
