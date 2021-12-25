const fs = require('fs');
const assert = require('assert');
const {
    mockState,
    test_rrssb1,
    test_rrssb2,
    test_rrssb3
} = require('./test.config')
const RRSSB = require('../src/data/rrssb');
const { getRRSSButtons } = require('../scripts/utils');
const { store } = require('../scripts/reducer');

store.dispatch({ type: 'READ_USER_DATA' });

describe('reducer', function () {
    describe('#READ_USER_DATA', function () {
        it('should return "true" if store name matches mock data', function () {
            assert.equal(store.getState().summary.name, mockState.summary.name);
        })
        it('should return "true" if store description matches mock data', function () {
            assert.equal(store.getState().summary.desc, mockState.summary.desc);
        })
        it('should return "true" if store occupation matches mock data', function () {
            assert.equal(store.getState().summary.occupation, mockState.summary.occupation);
        })
        it('should return "true" if store location matches mock data', function () {
            assert.equal(store.getState().summary.location, mockState.summary.location);
        })
    })
});

mockState.summary.name = "Jack Skellington";
mockState.summary.occupation = "Pumpkin Mayor",
mockState.summary.location = "Halloween Town",

store.dispatch({
    summary: {
        name: "Jack Skellington",
        occupation: "Pumpkin Mayor",
        location: "Halloween Town"
    },
    type: 'UPDATE_SUMMARY'
});

describe('reducer', function () {
    describe('#UPDATE_SUMMARY', function () {
        it('should return "true" if store name matches mock data', function () {
            assert.equal(store.getState().summary.name, mockState.summary.name);
        })
        it('should return "true" if store occupation matches mock data', function () {
            assert.equal(store.getState().summary.occupation, mockState.summary.occupation);
        })
        it('should return "true" if store location matches mock data', function () {
            assert.equal(store.getState().summary.location, mockState.summary.location);
        })
    })
});

mockState.projects.push({
    name: 'example project',
    repo: 'https://github.com/example/repo.git',
    desc: 'An example project hosted at GitHub.',
    tools: 'Node.js'
})

store.dispatch({
    projects: [
        {
        name: 'example project',
        repo: 'https://github.com/example/repo.git',
        desc: 'An example project hosted at GitHub.',
        tools: 'Node.js'
        }
    ],
    type: 'UPDATE_PROJECTS'
});

describe('reducer', function () {
    describe('#UPDATE_PROJECTS', function () {
        it('should return "true" if project name matches mock data', function () {
            assert.equal(store.getState().projects[0].name, mockState.projects[0].name);
        })
        it('should return "true" if project repo matches mock data', function () {
            assert.equal(store.getState().projects[0].repo, mockState.projects[0].repo);
        })
        it('should return "true" if project description matches mock data', function () {
            assert.equal(store.getState().projects[0].desc, mockState.projects[0].desc);
        })
    })
});

// utils tests

// describe('RRSSB', function () {
//     describe('#getRRSSButtons', function () {
//         it('should return "true" if the HTML strings match', function () {
//             assert.equal(getRRSSButtons(test_rrssb1),
//                 RRSSB.linkedin("linkedin-link") + RRSSB.facebook("facebook-link") + RRSSB.github("github-link"));
//         });
//         it('should return "true" if the HTML strings match', function () {
//             assert.equal(getRRSSButtons(test_rrssb2),
//                 RRSSB.email("address") + RRSSB.twitter("twitter-link") + RRSSB.reddit("reddit-link"));
//         });
//         it('should return "true" if the HTML strings match', function () {
//             assert.equal(getRRSSButtons(test_rrssb3), RRSSB.youtube("youtube-link"));
//         });
//     })
// })

// build tests

// describe('build.js'), function() {
// it('should return "true" if preview build page matches public build page', function () {
//     assert.equal();
//     })
// }