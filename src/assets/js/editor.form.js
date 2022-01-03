$(document).ready(function () {

    Object.defineProperty(String.prototype, 'capitalize', {
        value: function() {
          return this.charAt(0).toUpperCase() + this.slice(1);
        },
        enumerable: false
      });

    function generateSection(data, element, idx = 0) {
        const id = element[0];
        
        for (const [key, value] of Object.entries(data)) {
            $('<label/>', {
                text: key.capitalize(),
                for: `${id}-${key}-input`
            }).appendTo(`#${element}`);

            if (key === 'description' || key === 'images') {
                $('<textarea/>', {
                    text: value,
                    name: `${element}-${key}-${idx}`,
                    class: 'u-full-width',
                    id: `${id}-${key}-input`
                }).appendTo(`#${element}`);
            } else {
                $('<input/>', {
                    type: 'text',
                    value: value,
                    name: `${element}-${key}-${idx}`,
                    class: 'u-full-width',
                    id: `${id}-${key}-input`
                }).appendTo(`#${element}`);
            }
        }
    }

    function generateForm(data, element) {

        if (element == 'projects') {
            let idx = 0;
            for (const project of Object.values(data)) {
                generateSection(project, element, idx);
                $('<hr/>').appendTo('#projects');
                idx++;
            }
            $('<button />', {
                text: 'Delete -',
                id: 'delete-project-btn'
            }).appendTo('#projects');
            $('#delete-project-btn').click(deleteProject)

            $('<button />', {
                text: 'Add +',
                id: 'add-project-btn'
            }).appendTo('#projects');
            $('#add-project-btn').click(addProject)
        }

        else generateSection(data, element);
    }

    function getUserData() {
        $.ajax('http://localhost:3000/read-user-data', {
            type: "GET",
            contentType: "application/json; charset=utf-8"
        })
            .done(function (userData) {
                refreshForm(userData);
            });
    }

    function addProject(e) {
        e.preventDefault();
        $.ajax('http://localhost:3000/add-project', {
            type: "GET",
            contentType: "application/json; charset=utf-8"
        })
            .done(function (userData) {
                refreshForm(userData);
            })
    }

    function deleteProject(e) {
        e.preventDefault();
        $.ajax('http://localhost:3000/delete-project', {
            type: "GET",
            contentType: "application/json; charset=utf-8"
        })
            .done(function (userData) {
                refreshForm(userData);
            })
    }

    function refreshForm(data) {
        $('#summary').empty();
        $('#projects').empty();
        $('#contactMethods').empty();
        Object.entries(data).forEach(([heading, content]) => generateForm(content, heading))
    }

    getUserData();
});
