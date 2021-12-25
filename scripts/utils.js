const RRSSB = require('../src/data/rrssb');
const fse = require('fs-extra');

const getCurrentDateStr = () => {
    const today = new Date();
    return `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
}

const getRRSSButtons = (contactMethods) => {
    let buttonHTML = '';
    for (const [platform, link] of Object.entries(contactMethods)) {
        if (link && RRSSB[platform]) buttonHTML += RRSSB[platform](link);
        else console.log('ERROR: Could not recognize social media.');
    }
    return buttonHTML;
}

const prepareBuildDir = (src, target) => {
    fse.emptyDirSync(target);
    fse.copy(`${src}/assets`, `${target}/assets`);
}

module.exports = { getCurrentDateStr, getRRSSButtons, prepareBuildDir };