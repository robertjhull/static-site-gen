const assert = require('assert');
const RRSSB = require('../scripts/rrssb');
const { getRRSSButtons } = require('../scripts/utils');
const { store } = require('../scripts/reducer');

// REDUCER TESTS

describe('reducer', function () {
    before(function () {
        store.dispatch({ type: 'READ_USER_DATA', isTest: true, silent: true });
    });

    describe('#READ_USER_DATA', function () {
        it('should return "true" if state contains empty summary object', function () {
            assert.equal(Object.entries(store.getState().summary).length, 0);
        })
        it('should return "true" if state contains empty projects object', function () {
            assert.equal(store.getState().projects.length, 0);
        })
        it('should return "true" if state contains empty contactMethods object', function () {
            assert.equal(Object.entries(store.getState().contactMethods).length, 0);
        })
    });

    describe('#ADD_PROJECT', function () {
        before(function () {
            store.dispatch({ type: 'ADD_PROJECT', silent: true });
            store.dispatch({ type: 'ADD_PROJECT', silent: true });

        })
        it('should return "true" if new blank project was added to state', function () {
            assert.equal(store.getState().projects.length, 2);
        })
    });

    describe('#DELETE_PROJECT', function () {
        before(function () {
            store.dispatch({ type: 'DELETE_PROJECT', silent: true });
        })
        it('should return "true" if most recent project was deleted from state', function () {
            assert.equal(store.getState().projects.length, 1);
        })
    });

    describe('#UPDATE_USER_DATA', function () {
        before(function () {
            store.dispatch({
                summary: {
                    name: "Jack Skellington",
                    occupation: "Pumpkin Mayor",
                    location: "Halloween Town"
                },
                projects: [
                    {
                        name: 'example project',
                        repo: 'https://github.com/example/repo.git',
                        description: 'An example project hosted at GitHub.',
                        tools: 'Node.js'
                    }
                ],
                contactMethods: {
                    github: "https://github.com/example/",
                    linkedin: "https://linkedin.com/user/",
                    email: "test@mail.mail"
                },
                type: 'UPDATE_USER_DATA',
                silent: true
            });
        })
        it('should return "true" if summary name matches expected', function () {
            assert.equal(store.getState().summary.name, "Jack Skellington");
        })
        it('should return "true" if summary occupation matches expected', function () {
            assert.equal(store.getState().summary.occupation, "Pumpkin Mayor");
        })
        it('should return "true" if summary location matches expected', function () {
            assert.equal(store.getState().summary.location, "Halloween Town");
        })
        it('should return "true" if project name matches expected', function () {
            assert.equal(store.getState().projects[0].name, 'example project',);
        })
        it('should return "true" if project repo matches expected', function () {
            assert.equal(store.getState().projects[0].repo, 'https://github.com/example/repo.git');
        })
        it('should return "true" if project description matches expected', function () {
            assert.equal(store.getState().projects[0].description, 'An example project hosted at GitHub.');
        })
        it('should return "true" if project tools matches expected', function () {
            assert.equal(store.getState().projects[0].tools, 'Node.js');
        })
        it('should return "true" if github contact method matches expected', function () {
            assert.equal(store.getState().contactMethods.github, "https://github.com/example/");
        })
        it('should return "true" if linkedin contact method matches expected', function () {
            assert.equal(store.getState().contactMethods.linkedin, "https://linkedin.com/user/");
        })
        it('should return "true" if email contact method matches expected', function () {
            assert.equal(store.getState().contactMethods.email, "test@mail.mail");
        })
    });


});

describe('store', function () {
    describe('#getStateChanges', function () {
        it('should return "true" if state change was read correctly', function () {
            assert.equal(store.getChanges([{ name: "summary-name", value: "Krampus" }]).summary.name, "Krampus");
        })
        it('should return "true" if state change was read correctly', function () {
            assert.equal(store.getChanges([{ name: "summary-location", value: "Halloween Town" }]).summary.location, undefined);
        })
        it('should return "true" if state change was read correctly', function () {
            assert.equal(store.getChanges([{ name: "contactMethods-email", value: "krampus@mail.mail" }]).contactMethods.email, "krampus@mail.mail");
        })
    })
})

// UTILS TESTS

describe('RRSSB', function () {
    describe('#getRRSSButtons', function () {
        it('should return "true" if the HTML strings match', function () {
            assert.equal(getRRSSButtons({
                    linkedin: "linkedin-link",
                    facebook: "facebook-link",
                    github: "github-link"
                }), RRSSB.linkedin("linkedin-link") + RRSSB.facebook("facebook-link") + RRSSB.github("github-link"));
        });
        it('should return "true" if the HTML strings match', function () {
            assert.equal(getRRSSButtons({
                    email: "address",
                    twitter: "twitter-link"
                }), RRSSB.email("address") + RRSSB.twitter("twitter-link"));
        });
        it('should return "true" if the HTML strings match', function () {
            assert.equal(getRRSSButtons({ youtube: "youtube-link" }), RRSSB.youtube("youtube-link"));
        });
    })
})