const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const build = require('./scripts/build');
const { store } = require('./scripts/reducer');

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/editor/index.html'));
});

app.get('/preview', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/editor/preview/index.html'));
});

app.get('/read-user-data', (req, res) => {
    store.dispatch({ type: 'READ_USER_DATA' });
    res.send(store.getState());
});

app.get('/add-project', (req, res) => {
    store.dispatch({ type: 'ADD_PROJECT' });
    res.send(store.getState());
})


app.get('/delete-project', (req, res) => {
    store.dispatch({ type: 'DELETE_PROJECT' });
    res.send(store.getState());
})

app.post('/preview-changes', function (req, res) {
    const { summary, projects, contactMethods } = store.getChanges(req.body);
    store.dispatch({ type: 'UPDATE_USER_DATA', summary, projects, contactMethods });
    build(store.getState(), { preview: true })
        .then((success) => {
            res.send("Preview built.");
        })
        .catch((err) => console.log(err));
});

app.get('/build', (req, res) => {
    store.dispatch({ type: 'WRITE_USER_DATA' });
    build(store.getState())
        .then((success) => {
            res.send("Successfully built.");
        })
        .catch((err) => console.log(err));
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});