const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";
/*
const site = "https://github.shuqri.xyz/IDAssignment2/";
*/
const site = "http://localhost:63342/IDAssignment2/"; // FOR DEBUGGING
const userLoggedIn = localStorage.getItem('userLoggedIn');

$(document).ready(function () {
    if (userLoggedIn != null) { // ACCOUNT PRESENT
        // SHOW ACCOUNT DETAILS
        console.log("show account details")
        $('#account-logout').on('click', function () {
            localStorage.removeItem('userLoggedIn');
            console.log('removed account');
            location.assign(site);
        })

    } else {
        if (window.location == site + "account.html") {
            window.location.assign(site + "login.html");
        }
        if (window.location == site + "login.html") {
            console.log('in login code')
            $("#loginSubmit").on("click", function(e) {
                e.preventDefault();
                $('#errorMessage').hide();
                $('#spinner').css("display", "block");

                ajaxFunction("GET", null).done(function (response) {
                    $('#spinner').css("display", "none");
                    let accExists = false;
                    response.map((account => {
                        if ($("#loginEmail").val() === account.email && $("#loginPassword").val() === account.password) {
                            localStorage.setItem("userLoggedIn", JSON.stringify([account._id, account.name]));
                            window.location.assign(site + "account.html");
                            accExists = true;
                        }
                    }))
                    if (!accExists) {
                        $('#errorMessage').show()
                        $('#errorMessage').html('Wrong username or password?');
                        $('#errorMessage').css('color', 'red');
                        console.log("wrong username or password.")
                    }
                })
            })
        } else if (window.location == site + "register.html") {
            console.log("in register code...")
            $("#registerSubmit").on("click", function(e) {
                e.preventDefault();
                $('#errorMessage').hide();
                $('#spinner').css("display", "block");

                ajaxFunction("GET").done(function (response) {
                    $('#spinner').css("display", "none");
                    for (let account in response) {
                        if ($('registerEmail').val != account.email) {
                            createAccount();
                            break;
                        } else {
                            console.log("account exists")
                            $('#errorMessage').show()
                            $('#errorMessage').html('Account already exists!');
                            $('#errorMessage').css('color', 'red');
                        }
                    }
                })
            })
        }

    }
})

function createAccount() {

    let data = {
        "email": $('#registerEmail').val(),
        "firstName": $('#registerFirstName').val(),
        "lastName": $('#registerLastName').val(),
        "password": $('#registerPassword').val(),
        "dateOfBirth": $('#registerDOB').val(),
        "points": 0
    }

    console.log(JSON.stringify(data))
    ajaxFunction("POST", data).done(function () {
        localStorage.setItem("userLoggedIn", $('#registerEmail').val());
        window.location.assign(site + "account.html");
    })
}

function ajaxFunction (m, data) {
    if (m === "GET") {
        return $.ajax({
            "async": true,
            "crossDomain": true,
            "url": dbURL,
            "method": m,
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
        })
    } else if (m === "POST") {
        return $.ajax({
            "async": true,
            "crossDomain": true,
            "url": dbURL,
            "method": m,
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(data)
        })
    }
}