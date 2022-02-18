$(document).ready(function () {
    $("#newsletter-submit").on("click", function(e) {
        e.preventDefault();

        let email = $("#newsletter-field").val();
        let errorMsg = $("#newsletter-error");

        errorMsg.hide();

        if (email === "") {
            errorMsg.html("No email present!");
            errorMsg.css("color", "red");
            errorMsg.show();
        }
        else {
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let emailValid = emailRegex.test(email);

            if (!emailValid) {
                errorMsg.html("Value is not an email!");
                errorMsg.css("color", "red");
                errorMsg.show();
            }
            else {
                let jsonData = {
                    "email": email
                }

                let settings = {
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
                    "data": JSON.stringify(jsonData)
                }

                $.ajax(settings).done(function () {
                    $("#newsletter-field").val("");
                });
            }
        }


    });

});