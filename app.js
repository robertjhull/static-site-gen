const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const build = require('./scripts/build');

app.use('/', express.static(path.join(__dirname, 'src')));
app.use('/preview', express.static(path.join(__dirname, 'preview')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/gui/index.html'));
});

app.get('/preview/refresh', (req, res) => {
    build({ preview: true })
        .then((success) => {
            res.send("Preview built!");
        })
        .catch((err) => console.log(err));
});

app.post('/build', (req, res) => {
    build()
        .then((success) => {
            res.send("Successfully built!");
        })
        .catch((err) => console.log(err));
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});