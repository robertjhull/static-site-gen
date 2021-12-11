const fs = require('fs');
const assert = require('assert');
const config = require('./test.config')

const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);

const expectedPage = fs.readFileSync('./test/test.page.html')

ejsRenderFile('./test/test.page.ejs', Object.assign({}, config))
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