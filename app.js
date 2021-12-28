const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const build = require('./scripts/build');
const { store, parseFormData } = require('./scripts/reducer');

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'src')));
app.use('/preview', express.static(path.join(__dirname, 'preview')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/editor/index.html'));
});

app.get('/read-user-data', (req, res) => {
    store.dispatch({ type: 'READ_USER_DATA' });
    res.send(store.getState());
});

app.post('/save-and-preview', function (req, res) {
    const { summary, projects, contactMethods } = parseFormData(req.body);
    store.dispatch({ type: 'UPDATE_USER_DATA', summary, projects, contactMethods });
    store.dispatch({ type: 'WRITE_USER_DATA' });
    build(store.getState(), { preview: true })
        .then((success) => {
            res.send("Preview built.");
        })
        .catch((err) => console.log(err));
});

app.post('/build', (req, res) => {
    build(store.getState())
        .then((success) => {
            res.send("Successfully built.");
        })
        .catch((err) => console.log(err));
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});