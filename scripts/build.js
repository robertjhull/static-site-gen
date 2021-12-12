const fse    = require('fs-extra');
const path   = require('path');
const config = require('../site.config');

const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);
const glob          = promisify(require('glob'));

const SRC_PATH    = './src';
const PUBLIC_PATH = './public';

// delete old build in '../public' and copy assets from '../src'
fse.emptyDirSync(PUBLIC_PATH);
console.log("Emptied ./public folder");
fse.copy(`${SRC_PATH}/assets`, `${PUBLIC_PATH}/assets`);
console.log("Copied over assets folder from ./src");

// searches dir for .ejs files and assembles to html
glob('**/*.ejs', { cwd: `${SRC_PATH}/pages` })
    .then((files) => {
        files.forEach(file => {
            const fileData = path.parse(file);
            const destPath = path.join(PUBLIC_PATH, fileData.dir);
            console.log(`Constructing ${fileData.name}.html...`);
            
            fse.ensureDir(destPath)
                .then(() => {
                    return ejsRenderFile(`${SRC_PATH}/pages/${file}`, Object.assign({}, config));
                })
                .then((pageContents) => {
                    return ejsRenderFile(`${SRC_PATH}/layout.ejs`, Object.assign({}, config, { body: pageContents }));
                })
                .then((layoutContents) => {
                    return fse.writeFile(`${PUBLIC_PATH}/${fileData.name}.html`, layoutContents);
                })
                .catch((err) => console.log(err));
        });
        console.log("Finished.")
    })
    .catch((err) => console.log(err));