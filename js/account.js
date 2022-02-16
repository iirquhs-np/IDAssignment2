// INITIALISE CONSTANTS
const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";

// MAIN CODE
$(document).ready(function () {
    // INITIALISING SELECTORS
    let spinner = $(".spinner");
    let overview = $("#display-details");
    let greeting = $("#display-greeting");


    // IF USER CLICKS LOG OUT
    $("#logoutButton").on("click", function () {
        localStorage.clear();
        window.location.assign("index.html");
    });

    // SHOW ACCOUNT DETAILS
    ajaxFuncGET().done(function (response) {
        response.map(acc => {
            if (acc._id === userAccount) {
                let name = acc.firstName + " " + acc.lastName;
                let dob = new Date(acc.dateOfBirth);
                let day = dob.getDate();
                let month = dob.getMonth() + 1;
                let year = dob.getFullYear();
                let birthday = day + "/" + month + "/" + year


                spinner.hide();
                overview.show();
                greeting.html(`<strong>Hi, ${name}!</strong>`);
                $("#overview-name").html(name)
                $("#overview-email").html(acc.email);
                $("#overview-birthday").html(birthday)
                $("#overview-points").html(acc.points);
            }
        });
    });

    // CHANGE PASSWORD
    $("#changePasswordSubmit").on("click", function (e) {
        e.preventDefault();
        $("#chPwd-spinner").show();

        let currentPwd = $("#old-password").val();
        let newPwd = $("#new-password").val();
        let confirmPwd = $("#confirm-password").val();
        let errorMsg = $("#errorMessage");

        if (newPwd !== confirmPwd) {
            errorMsg.show();
            errorMsg.html("New password doesn't match!");
            errorMsg.css("color", "red");
        }
        else if (newPwd.length < 8) {
            errorMsg.show();
            errorMsg.html("New password must be at least 8 characters long!");
            errorMsg.css("color", "red");
        }
        else {
            ajaxFuncGET().done(function (response) {
                response.map(acc => {
                    if (acc._id === userAccount) {
                        $("#chPwd-spinner").hide();
                        if (currentPwd !== acc.password) {
                            errorMsg.show();
                            errorMsg.html("Old password doesn't match!");
                            errorMsg.css("color", "red");
                        }
                        else {
                            let data = {
                                "password": newPwd
                            }
                            ajaxFuncPUT(data).done(function (response) {
                                if (response != null) {
                                    errorMsg.show();
                                    errorMsg.html("Password changed successfully!");
                                    errorMsg.css("color", "green");
                                }
                            });
                        }
                    }
                });
            });
        }
    });

    // DELETE ACCOUNT
    $("#deleteAccountButton").on("click", function (e) {
        e.preventDefault();
        let pwd = $("#deleteAccount-password").val();
        let errorMsg = $("#deleteAccount-error");
        let spinner = $("#deleteAccount-spinner");

        errorMsg.hide();
        spinner.show();

        ajaxFuncGET().done(function (response) {
            let passwordValid = false;
            response.map(acc => {
                if (acc.password === pwd) {
                    passwordValid = true;
                    ajaxFuncDELETE().done(function (response) {
                        if (response != null) {
                            errorMsg.show();
                            errorMsg.html("Deleting your account");
                            errorMsg.css("color", "red");
                            localStorage.clear();
                            window.location.assign("index.html");
                        }
                    });
                }
            });

            if (!passwordValid) {
                spinner.hide();
                errorMsg.show();
                errorMsg.html("Wrong password!");
                errorMsg.css("color", "red");
            }
        });
    });
});





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

function ajaxFuncPUT(data) {
    return $.ajax( {
        "async": true,
        "crossDomain": true,
        "url": dbURL + "/" + userAccount,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(data)

    });
}

function ajaxFuncDELETE() {
    return $.ajax({
        "async": true,
        "crossDomain": true,
        "url": dbURL + "/" + userAccount,
        "method": "DELETE",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        }
    })
}