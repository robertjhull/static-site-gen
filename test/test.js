const fs = require('fs');
const assert = require('assert');
const {
    test_site,
    test_rrssb1,
    test_rrssb2,
    test_rrssb3
} = require('./test.config')
const RRSSB = require('../src/rrssb/rrssb');
const { getRRSSButtons } = require('../scripts/helpers');

const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);

describe('RRSSB', function () {
    describe('#getRRSSButtons', function () {
        it('should return "true" if the HTML strings match', function () {
            assert.equal(getRRSSButtons(test_rrssb1),
                RRSSB.linkedin("linkedin-link") + RRSSB.facebook("facebook-link") + RRSSB.github("github-link"));
        });
        it('should return "true" if the HTML strings match', function () {
            assert.equal(getRRSSButtons(test_rrssb2),
                RRSSB.email("address") + RRSSB.twitter("twitter-link") + RRSSB.reddit("reddit-link"));
        });
        it('should return "true" if the HTML strings match', function () {
            assert.equal(getRRSSButtons(test_rrssb3), RRSSB.youtube("youtube-link"));
        });
    })
})

// const expectedPage = fs.readFileSync('./test/test.page.html')

// ejsRenderFile('./test/test.page.ejs', Object.assign({}, config))
//     .then((pageContents) => {
//         return ejsRenderFile(`./src/layout.ejs`, Object.assign({}, config, { body: pageContents }))
//     })
//     .then((demoPage) => {
//         describe('Pages', function () {
//             describe('#Compare HTML', function () {
//                 it('should return "true" if the built HTML matches the expected HTML', function () {
//                     assert.equal(demoPage == expectedPage, true);
//                 });
//             });
//         });
//     })
//     .catch((err) => console.log(err));