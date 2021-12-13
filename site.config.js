const projects = require('./src/data/projects');

module.exports = {
    title: `${process.env.NAME} | Portfolio`,
    description: '',
    sourceDir: './src',
    destDir: './public',
    email: process.env.EMAIL,
    github: process.env.GITHUB,
    linkedin: process.env.LINKEDIN,
    projects
}