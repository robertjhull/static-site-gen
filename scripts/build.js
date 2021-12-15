require('dotenv-safe').config();

const fse = require('fs-extra');
const path = require('path');
const config = require('../site.config');
const { promisify } = require('util');
const { getCurrentDateTimeStr, getRRSSButtons } = require('./helpers');
const ejsRenderFile = promisify(require('ejs').renderFile);
const glob = promisify(require('glob'));

// delete old build and copy assets from /src
const { sourceDir, destDir } = config;
fse.emptyDirSync(destDir);
fse.copy(`${sourceDir}/assets`, `${destDir}/assets`);

// searches /pages for .ejs files and assembles to .html
glob('**/*.ejs', { cwd: `${sourceDir}/pages` })
    .then((files) => {
        const currentDateTime = getCurrentDateTimeStr();
        const rrssButtons = getRRSSButtons(config.contactMethods);

        files.forEach(file => {
            const fileName = path.parse(file).name;
            console.log("Building %s.html...", fileName);
            
            fse.ensureDir(destDir)
                .then(() => {
                    return ejsRenderFile(`${sourceDir}/pages/${file}`,
                        Object.assign({}, config, { rrssButtons }));
                })
                .then((pageContents) => {
                    return ejsRenderFile(`${sourceDir}/layout.ejs`,
                        Object.assign({}, config, { pageContents, currentDateTime }));
                })
                .then((layoutContents) => {
                    return fse.writeFile(`${destDir}/${fileName}.html`, layoutContents);
                })
                .catch((err) => console.log(err));
        });
        console.log("Finished.")
    })
    .catch((err) => console.log(err));