const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const { build } = require('./scripts/build');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/editor/index.html'));
});

app.get('/preview', (req, res) => {
    res.sendFile(path.join(__dirname, '/preview/main.html'));
});

app.post('/build', (req, res) => {
    console.log('/build pinged');
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});