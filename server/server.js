const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Serve anime.min.js from node_modules
app.use('/static/canvas-confetti', express.static(path.join(__dirname, '../node_modules/canvas-confetti/dist')));

// Serve the HTML, CSS, and JS files from the root directory
app.use(express.static(path.join(__dirname, '../')));

const validCode = '1234Y';
const btcAmount = 0.26;

app.post('/validate-code', (req, res) => {
    const { code, walletAddress } = req.body;
    if (code === validCode) {
        // Logic to transfer BTC (simulated)
        res.json({ success: true, message: '0.26 BTC credited to your wallet!' });
    } else {
        res.json({ success: false, message: 'Invalid code' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});