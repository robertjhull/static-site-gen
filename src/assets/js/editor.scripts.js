$(document).ready(function () {
    const SUCCESS = '#1EAEDB';
    const ERROR = '#F04333';

    const statusMessage = (msg, color) => $('#preview-text em').text(msg).css('color', color);

    function preview(e) {
        e.preventDefault();
        const formData = $('#editor-form').serializeArray()
        $.ajax('http://localhost:3000/save-and-preview', {
            type: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
        })
            .done(function (res) {
                $('#preview-iframe').attr('src', '/preview/index.html');
                statusMessage(res, SUCCESS);
            })
            .fail(function (res) { statusMessage(res, ERROR); })
    }

    function build(e) {
        e.preventDefault();
        $.ajax('http://localhost:3000/build', {
            type: "POST",
            contentType: "application/json; charset=utf-8",
        })
            .done(function (res) { statusMessage(res, SUCCESS); })
            .fail(function (res) { statusMessage(res, ERROR); })
        
    }

    $('#build-btn').click(build);
    $('#preview-btn').click(preview);
    $('#tabs').tabs();
})