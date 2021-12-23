$(document).ready(function () {
    // how many projects to display
    // const COUNT = 4;

    function readUserFiles() {
        $.ajax('http://localhost:3000/read-user-files', {
            type: "GET",
            contentType: "application/json; charset=utf-8"
        })
            .done(function (res) { convertToForm(res); })
    }

    // fills form with data from userData
    // probably unnecessary, move this logic to readUserFiles done()
    function convertToForm(userData) {
        Object.entries(userData).forEach(([key, value]) => {
            if (value.length) Object.values(value).forEach(project => generateForm(project, $(`#projects`)));
            else generateForm(value, $(`#${key}`))
        });
    }

    function generateForm(data, element) {
        const id = element[0].id;
        console.log("Building form - ", data, element)

        for (const [key, value] of Object.entries(data)) {
            console.log("key == ", key, "appending to == ", element);
            $('<label/>', {
                text: key.toUpperCase(),
                for: `${id}-${key}-input`
            }).appendTo(element);

            if (key === 'desc' || key === 'summary') {
                $('<textarea/>', {
                    text: value,
                    class: 'u-full-width',
                    id: `${id}-${key}-input`
                }).appendTo(element);
            } else {
                $('<input/>', {
                    type: 'text',
                    value: value,
                    class: 'u-full-width',
                    id: `${id}-${key}-input`
                }).appendTo(element);
            }
        }
    }

    // Transfer this logic to universal function above:

    // function projectsForm(projects) {        
    //     let i = 0;
    //     const labels = {
    //         'name': 'Project Name',
    //         'desc': 'Project Description',
    //         'link': 'Deployed Link',
    //         'repo': 'GitHub Repository',
    //         'tools': 'Tech Stack Used'
    //     }
    //         $('<hr/>').appendTo('#projects');
    // }

    readUserFiles();
});
