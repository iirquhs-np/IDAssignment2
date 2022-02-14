// INITIALISE CONSTANTS
const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";

// CHECK SITE URL
var site = "";
if (window.location.host === "comzone.shuqri.xyz") {
    site = window.location.origin + "/";
} else {
    site = window.location.origin + "/IDAssignment2/";
}

// MAIN CODE
$(window).ready(function () {
    $("#registerSubmit").on("click", function (e) {
        e.preventDefault();
        $("#errorMessage").hide();
        $("#spinner").css("display", "block");

        ajaxFuncGET("GET").done(function (response) {
            $("#spinner").css("display", "none");
            let checkAcc = true;

            response.map(account => {
                if ($("#registerEmail").val() === account.email) {
                    $("#errorMessage").show();
                    $("#errorMessage").html("Account already exists!");
                    $("#errorMessage").css("color", "red");
                    checkAcc = false;
                }
            });

            if (checkAcc) {
                createAccount();
            }
        });
    });
});

// CREATE ACCOUNT
function createAccount() {
    let data = {
        "email": $("#registerEmail").val(),
        "firstName": $("#registerFirstName").val(),
        "lastName": $("#registerLastName").val(),
        "password": $("#registerPassword").val(),
        "dateOfBirth": $("#registerDOB").val(),
        "points": 0
    };

    ajaxFuncPOST(data).done(function () {
        localStorage.setItem("userAccount", $("registerEmail").val());
        window.location.replace(site + "account.html");
    });
}


// AJAX TO ACCESS DATABASE
function ajaxFuncGET() {
    return $.ajax({
        "async": true,
        "crossDomain": true,
        "url": dbURL,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        }
    });
}

function ajaxFuncPOST(m, data) {
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