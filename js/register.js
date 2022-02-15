// INITIALISE CONSTANTS
const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";

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
        console.log(uDOB);
        let inputValid = validateInput(uEmail, uPwd, uDOB, errorMsg)
        if (inputValid) {
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
        }

    });
});


// INPUT VALIDATION
function validateInput(email, pwd, dobStr, errorMsg) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailValid = emailRegex.test(email);

    if (emailValid && pwd.length >= 8 && getAge(dobStr) - 16 >= 0) {
        return true;
    }
    else {
        if (!emailValid){
            errorMsg.show();
            errorMsg.html("Email is not in the right format!");
            errorMsg.css("color", "red");
        }
        else if (!(pwd.length >= 8)) {
            errorMsg.show();
            errorMsg.html("Password is too short!");
            errorMsg.css("color", "red");
        }
        else if (!(getAge(dobStr) - 16 >= 0)) {
            errorMsg.show();
            errorMsg.html("You need to be 16 or above!");
            errorMsg.css("color", "red");
        }

    }

    return false;
}

function getAge(dateString)
{
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}

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
        window.location.assign("../account.html");
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