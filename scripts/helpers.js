const RRSSB = require('../src/data/rrssb');

const getCurrentDateTimeStr = () => {
    const today = new Date();
    const date = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
    const hours = today.getHours();
    if (hours > 12) {
        return `${date} ${hours - 12}:${today.getMinutes()}PM`;
    } else {
        return `${date} ${hours}:${today.getMinutes()}AM`;
    }
}

const getRRSSButtons = (contactMethods) => {
    let buttonHTML = '';
    for (const [platform, link] of Object.entries(contactMethods)) {
        if (link && RRSSB[platform]) buttonHTML += RRSSB[platform](link);
        else console.log('ERROR: Could not recognize social media.');
    }
    return buttonHTML;
}

module.exports = { getCurrentDateTimeStr, getRRSSButtons };