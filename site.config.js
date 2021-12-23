const path = require('path');
const projects = require('./src/data/projects');

module.exports = {
    config: {
        srcDir: path.join(__dirname, './src'),
        publicDir: path.join(__dirname, './public'),
        previewDir: path.join(__dirname, './preview'),
        preview: false,
        layout: 'default',
        title: `${process.env.NAME} | Portfolio`,
        description: '',
        summary: {
            name: process.env.NAME,
            occupation: process.env.OCCUPATION,
            location: process.env.LOCATION,
            summary: process.env.SUMMARY,
        },
        contactMethods: {
            email: process.env.EMAIL,
            github: process.env.GITHUB || null,
            linkedin: process.env.LINKEDIN || null,
        },
        projects

    }
}