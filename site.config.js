const path = require('path');

module.exports = {
    config: {
        srcDir: path.join(__dirname, './src'),
        publicDir: path.join(__dirname, './public'),
        previewDir: path.join(__dirname, './src/editor/preview'),
        preview: false,
        layout: 'default'
    }
}