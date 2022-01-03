const RRSSB = require('./rrssb');
const fse = require('fs-extra');

const getCurrentDateStr = () => {
    const today = new Date();
    return `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
}

const getRRSSButtons = (contactMethods) => {
    let buttonHTML = '';
    for (const [platform, link] of Object.entries(contactMethods)) {
        if (!link) continue;

        else if (RRSSB[platform]) {
            buttonHTML += RRSSB[platform](link);
        }
            
        else throw new Error('Could not recognize social media.');
    }
    return buttonHTML;
}

const prepareBuildDir = (src, target) => {
    fse.emptyDirSync(`${target}/assets`);
    fse.copy(`${src}/assets`, `${target}/assets`);
}

module.exports = { getCurrentDateStr, getRRSSButtons, prepareBuildDir };