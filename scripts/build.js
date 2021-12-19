require('dotenv-safe').config();

const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const { getCurrentDateTimeStr, getRRSSButtons, prepareBuildDir } = require('./utils');
const ejsRenderFile = promisify(require('ejs').renderFile);
const glob = promisify(require('glob'));

function build(config) {
    return new Promise((resolve, reject) => {
        
        const { sourceDir, destDir, layout } = config;

        if (layout == 'default') { prepareBuildDir(destDir); }
        
        // searches /pages for .ejs files and assembles to .html
        glob('**/*.ejs', { cwd: `${sourceDir}/pages` })
            .then((files) => {
                const currentDateTime = getCurrentDateTimeStr();
                const rrssButtons = getRRSSButtons(config.contactMethods);
        
                files.forEach(file => {
                    const fileName = path.parse(file).name;
                    console.log("Building %s.html in %s...", fileName, destDir);
                    
                    fse.ensureDir(destDir)
                        .then(() => {
                            return ejsRenderFile(`${sourceDir}/pages/${file}`,
                                Object.assign({}, config, { rrssButtons }));
                        })
                        .then((pageContents) => {
                            return ejsRenderFile(`${sourceDir}/layouts/${layout}.ejs`,
                                Object.assign({}, config, { pageContents, currentDateTime }));
                        })
                        .then((layoutContents) => {
                            return fse.writeFile(`${destDir}/${fileName}.html`, layoutContents);
                        })
                        .catch((err) => console.log(err));
                });
                console.log("Finished.");
                resolve();
            })
            .catch((err) => reject(new Error(err)));
    })
}

module.exports = build;