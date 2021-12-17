const projects = require('./src/data/projects');

module.exports = {
    title: `${process.env.NAME} | Portfolio`,
    description: '',
    sourceDir: './src',
    destDir: './preview',
    layout: 'preview',
    name: process.env.NAME,
    occupation: process.env.OCCUPATION,
    location: process.env.LOCATION,
    summary: process.env.SUMMARY,
    contactMethods: {
        email: process.env.EMAIL,
        github: process.env.GITHUB || null,
        linkedin: process.env.LINKEDIN || null,
    },
    projects
}