// INITIALISE CONSTANTS
const dbURL = "https://comzone-9f7d.restdb.io/rest/contact-support";
const APIKEY = "6208844f34fd62156585842e";


$(document).ready(function () {
    $("#contact-cancel").on("click", function (e) {
        e.preventDefault();
        $("#contact-form")[0].reset();
    })

    $("#contact-send").on("click", function (e) {
        e.preventDefault();
        let cName = $("#contact-name").val();
        let cEmail = $("#contact-email").val();
        let cContactNo = $("#contact-contact-no").val();
        let cMessage = $("#contact-message").val();

        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailValid = emailRegex.test(cEmail);

        if (cName !== null && emailValid && $.isNumeric(cContactNo) && cMessage !== null) {
            console.log("fields not null");

            let data = {
                name: cName,
                email: cEmail,
                contactNo: cContactNo,
                message: cMessage
            };

            ajaxFuncPOST(data).done(function (response) {
                console.log("completed");
                console.log(response);
                $("#contact-form")[0].reset();
            });
        }
        else {
            $(".modal-title").html("Error!");
            $(".modal-body").html("Fields are not valid!");
            $("#defaultModal").modal("show");
        }



    });
});

function ajaxFuncPOST(data) {
    return $.ajax({
        "async": true,
        "crossDomain": true,
        "url": dbURL,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(data)
    });
}