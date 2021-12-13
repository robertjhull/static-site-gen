require('dotenv-safe').config();

const fse = require('fs-extra');
const path   = require('path');
const config = require('../site.config');
const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);
const glob = promisify(require('glob'));
const { getCurrentDateTimeStr } = require('./helpers');

// delete old build in '../public' and copy assets from '../src'
const { sourceDir, destDir } = config.site;
fse.emptyDirSync(destDir);
console.log("Emptied ./public folder");
fse.copy(`${sourceDir}/assets`, `${destDir}/assets`);
console.log("Copied over assets folder from ./src");

const contactInfo = {
    name: process.env.NAME,
    email: process.env.EMAIL,
    github: process.env.GITHUB,
    linkedin: process.env.LINKEDIN
};

// searches dir for .ejs files and assembles to html
glob('**/*.ejs', { cwd: `${sourceDir}/pages` })
    .then((files) => {
        const currentDateTime = getCurrentDateTimeStr();
        console.log("Started new build on %s.", currentDateTime)
        files.forEach(file => {
            const fileData = path.parse(file);
            const destPath = path.join(destDir, fileData.dir);
            console.log("Constructing %s.html...", fileData.name);
            
            fse.ensureDir(destPath)
                .then(() => {
                    return ejsRenderFile(`${sourceDir}/pages/${file}`, config, contactInfo);
                })
                .then((pageContents) => {
                    return ejsRenderFile(`${sourceDir}/layout.ejs`,
                        Object.assign({}, config, { body: pageContents, dateTime: currentDateTime }));
                })
                .then((layoutContents) => {
                    return fse.writeFile(`${destDir}/${fileData.name}.html`, layoutContents);
                })
                .catch((err) => console.log(err));
        });
        console.log("Finished.")
    })
    .catch((err) => console.log(err));