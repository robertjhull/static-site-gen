const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const build = require('./scripts/build');
const config = require('./site.config');

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/gui/index.html'));
});

app.get('/preview', (req, res) => {
    build(Object.assign({}, config, { layout: 'preview', destDir: './preview' }))
        .then((success) => {
            res.sendFile(path.join(__dirname, '/src/preview/index.html'))
        })
        .catch((err) => console.log(err))
});

app.post('/build', (req, res) => {
    build(config)
        .then((success) => {
            res.send("Successfully built!");
        })
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});