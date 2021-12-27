const path = require('path');
const { summary, projects, contactMethods } = require('./src/data/userData');

module.exports = {
    config: {
        srcDir: path.join(__dirname, './src'),
        publicDir: path.join(__dirname, './public'),
        previewDir: path.join(__dirname, './preview'),
        preview: false,
        layout: 'default',
        summary,
        projects,
        contactMethods
    }
}