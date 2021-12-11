const assert = require('assert');
const { promisify } = require('util');
const config = require('../site.config');
const ejsRenderFile = promisify(require('ejs').renderFile);
const fs = require('fs');

const expectedPage = fs.readFileSync('./test/demo.html')

ejsRenderFile('./src/pages/demo.ejs', Object.assign({}, config))
    .then((pageContents) => {
        return ejsRenderFile(`./src/layout.ejs`, Object.assign({}, config, { body: pageContents }))
    })
    .then((demoPage) => {
        describe('Pages', function () {
            describe('#Compare HTML', function () {
                it('should return "true" if the built HTML matches the expected HTML', function () {
                    assert.equal(demoPage == expectedPage, true);
                });
            });
        });
    })
    .catch((err) => console.log(err));