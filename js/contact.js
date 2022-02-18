// INITIALISE CONSTANTS
const dbURL = "https://comzone-9f7d.restdb.io/rest/contact-support";
const APIKEY = "6208844f34fd62156585842e";


$(document).ready(function () {
    // Cancel button
    $("#contact-cancel").on("click", function (e) {
        e.preventDefault();
        $("#contact-name").val("")
        $("#contact-email").val("");
        $("#contact-contact-no").val("");
        $("#contact-message").val("");
    })

    // Send button
    $("#contact-send").on("click", function (e) {
        e.preventDefault();
        let cName = $("#contact-name").val();
        let cEmail = $("#contact-email").val();
        let cContactNo = $("#contact-contact-no").val();
        let cMessage = $("#contact-message").val();

        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailValid = emailRegex.test(cEmail);

        if (cName !== null && emailValid && $.isNumeric(cContactNo) && cMessage !== null) {

            let data = {
                "name": cName,
                "email": cEmail,
                "contact-no": cContactNo,
                "message": cMessage
            };

            console.log(data);

            ajaxFuncPOST(data).done(function (response) {
                console.log("completed");
                console.log(response);
                $(".modal-title").html("Success!");
                $(".modal-body").html("Thank you for your response!");
                $(".modal-body").css("color", "green");
                $("#defaultModal").modal("show");
                $("#contact-name").val("")
                $("#contact-email").val("");
                $("#contact-contact-no").val("");
                $("#contact-message").val("");
            });
        }
        else {
            $(".modal-title").html("Error!");
            $(".modal-body").html("Fields are not valid!");
            $(".modal-body").css("color", "red");
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