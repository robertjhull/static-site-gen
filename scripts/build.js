require('dotenv-safe').config();

const fse = require('fs-extra');
const path = require('path');
const { config } = require('../site.config');
const { promisify } = require('util');
const { getCurrentDateTimeStr, getRRSSButtons, prepareBuildDir } = require('./utils');
const ejsRenderFile = promisify(require('ejs').renderFile);
const glob = promisify(require('glob'));

function build(options = {}) {
    return new Promise((resolve, reject) => {
        
        const { srcDir, layout, preview, contactMethods } = Object.assign({}, config, options);

        const currentDateTime = getCurrentDateTimeStr();
        const rrssButtons = getRRSSButtons(contactMethods);

        const targetDir = preview ? config.previewDir : config.publicDir;

        prepareBuildDir(srcDir, targetDir);
        
        // searches /pages for .ejs files and assembles to .html
        glob('**/*.ejs', { cwd: `${srcDir}/pages` })
            .then((files) => {
                files.forEach(file => {
                    const fileName = path.parse(file).name;
                    console.log("Building %s.html in %s...", fileName, targetDir);
                    
                    fse.ensureDir(targetDir)
                        .then(() => {
                            return ejsRenderFile(`${srcDir}/pages/${file}`,
                                Object.assign({}, config, { rrssButtons }));
                        })
                        .then((pageContents) => {
                            return ejsRenderFile(`${srcDir}/layouts/${layout}.ejs`,
                                Object.assign({}, config, { pageContents, currentDateTime }));
                        })
                        .then((page) => {
                            return fse.writeFile(`${targetDir}/${fileName}.html`, page);
                        })
                        .catch((err) => console.log(err));
                });
                console.log("Finished.");
                resolve("Success");
            })
            .catch((err) => reject(new Error(err)));
    })
}

module.exports = build;