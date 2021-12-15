const projects = require('./src/data/projects');

module.exports = {
    title: `${process.env.NAME} | Portfolio`,
    description: '',
    sourceDir: './src',
    destDir: './public',
    name: process.env.NAME,
    occupation: process.env.OCCUPATION,
    summary: process.env.SUMMARY,
    contactMethods: {
        email: process.env.EMAIL,
        github: process.env.GITHUB || null,
        linkedin: process.env.LINKEDIN || null,
    },
    projects
}