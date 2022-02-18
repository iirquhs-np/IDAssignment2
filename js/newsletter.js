$(document).ready(function () {
    $("")
    var jsondata = {"field1": "xyz","field2": "abc"};
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://comzone-9f7d.restdb.io/rest/newsletter",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "6208844f34fd62156585842e",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
});