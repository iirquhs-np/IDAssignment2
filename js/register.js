// INITIALISE CONSTANTS
const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";

// CHECK SITE URL
let site = "";
if (window.location.host === "id-assignment-2-4bw4h.ondigitalocean.app") {
    site = window.location.origin + "/";
} else {
    site = window.location.origin + "/IDAssignment2/";
}

// MAIN CODE
$(document).ready(function () {
    $("#registerSubmit").on("click", function (e) {
        e.preventDefault();

        // INITIALISING SELECTORS
        let uEmail = $("#registerEmail").val();
        let uFN = $("#registerFirstName").val();
        let uLN = $("#registerLastName").val();
        let uPwd = $("#registerPassword").val();
        let uDOB = $("#registerDOB").val();
        let errorMsg = $("#errorMessage");
        let spinner = $("#spinner");


        errorMsg.hide();
        spinner.css("display", "block");

        ajaxFuncGET("GET").done(function (response) {
            spinner.css("display", "none");
            let checkAcc = true;

            response.map(account => {
                if (uEmail === account.email) {
                    errorMsg.show();
                    errorMsg.html("Account already exists!");
                    errorMsg.css("color", "red");
                    checkAcc = false;
                }
            });

            if (checkAcc) {
                createAccount(uEmail, uFN, uLN, uPwd, uDOB);
            }
        });
    });
});

// CREATE ACCOUNT
function createAccount(email, fn, ln, pwd, dob) {
    let data = {
        "email": email,
        "firstName": fn,
        "lastName": ln,
        "password": pwd,
        "dateOfBirth": dob,
        "points": 0
    };

    ajaxFuncPOST(data).done(function () {
        localStorage.setItem("userAccount", email);
        window.location.assign(site + "account.html");
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