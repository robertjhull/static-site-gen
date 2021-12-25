module.exports = {
    test_rrssb1: {
        linkedin: "linkedin-link",
        facebook: "facebook-link",
        github: "github-link"
    },
    test_rrssb2: {
        email: "address",
        twitter: "twitter-link",
        reddit: "reddit-link"
    },
    test_rrssb3: {
        youtube: "youtube-link"
    },

    // mock state object for reducer tests
    mockState: {
        summary: {
            name: "",
            occupation: "",
            location: "",
            summary: "",
        },
        contactMethods: {
            email: "",
            github: "",
            linkedin: "",
        },
        projects: []
    }
}