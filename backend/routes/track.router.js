const express = require('express')
const path = require('path')
const trackRouter = express.Router();
const fs = require('fs');

const dirname = path.resolve()

// Route for tracking the pixel
trackRouter.get('/track', (req, res) => {
    const email = req.query.email || 'Unknown email';
    const timestamp = new Date().toISOString();

    // Log the tracking info (can store in DB or log file)
    console.log(`Tracking pixel request for: ${email} at ${timestamp}`);

    // Respond with a transparent 1x1 pixel GIF
    const pixelPath = path.join(dirname,'backend', 'assets' , 'pixel.gif');
    console.log(pixelPath)
    fs.readFile(pixelPath, (err, data) => {
        if (err) {
            res.status(500).send('Error loading pixel');
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'image/gif',
            'Content-Length': data.length
        });
        res.end(data);
    });
});

module.exports = { trackRouter }