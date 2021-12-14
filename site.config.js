const projects = require('./src/data/projects');

module.exports = {
    title: `${process.env.NAME} | Portfolio`,
    description: '',
    sourceDir: './src',
    destDir: './public',
    name: process.env.NAME,
    summary: process.env.SUMMARY,
    email: process.env.EMAIL,
    github: process.env.GITHUB,
    linkedin: process.env.LINKEDIN,
    projects
}