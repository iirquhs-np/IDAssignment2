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
        response.map(account => {
            if (account._id === userAccount) {
                let name = account.firstName + " " + account.lastName;
                let dob = new Date(account.dateOfBirth);
                let day = dob.getDate();
                let month = dob.getMonth() + 1;
                let year = dob.getFullYear();
                let birthday = day + "/" + month + "/" + year


                spinner.hide();
                overview.show();
                greeting.html(`<strong>Hi, ${name}!</strong>`);
                $("#overview-name").html(name)
                $("#overview-email").html(account.email);
                $("#overview-birthday").html(birthday)
                $("#overview-points").html(account.points);
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
                response.map(account => {
                    if (account._id === userAccount) {
                        $("#chPwd-spinner").hide();
                        if (currentPwd !== account.password) {
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
    let URI = URL + "/" + userAccount
    return $.ajax( {
        "async": true,
        "crossDomain": true,
        "url": "https://comzone-9f7d.restdb.io/rest/user-accounts/" + userAccount,
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