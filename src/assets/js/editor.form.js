$(document).ready(function () {

    function generateSection(data, element) {
        const id = element[0];
        
        for (const [key, value] of Object.entries(data)) {
            $('<label/>', {
                text: key.toUpperCase(),
                for: `${id}-${key}-input`
            }).appendTo(`#${element}`);

            if (key === 'description') {
                $('<textarea/>', {
                    text: value,
                    name: `${element}-${key}`,
                    class: 'u-full-width',
                    id: `${id}-${key}-input`
                }).appendTo(`#${element}`);
            } else {
                $('<input/>', {
                    type: 'text',
                    value: value,
                    name: `${element}-${key}`,
                    class: 'u-full-width',
                    id: `${id}-${key}-input`
                }).appendTo(`#${element}`);
            }
        }
    }

    function generateForm(data, element) {

        if (element == 'projects') {
            for (const project of Object.values(data)) {
                generateSection(project, element)
            }
            $('<hr/>').appendTo('#projects');
        }

        else generateSection(data, element);
    }

    function getUserData() {
        $.ajax('http://localhost:3000/read-user-data', {
            type: "GET",
            contentType: "application/json; charset=utf-8"
        })
            .done(function (userData) {
                Object.entries(userData).forEach(([heading, content]) => generateForm(content, heading))
            });
    }

    getUserData();

});
