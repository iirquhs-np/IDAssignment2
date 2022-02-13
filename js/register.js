const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";
const site = window.location.protocol + '//' + window.location.host + '/';
// const site = "http://localhost:63342/IDAssignment2/"; // FOR DEBUGGING

$(document).ready(function () {
    console.log("in register code...")
    $("#registerSubmit").on("click", function(e) {
        e.preventDefault();
        $('#errorMessage').hide();
        $('#spinner').css("display", "block");

        ajaxFunction("GET").done(function (response) {
            $('#spinner').css("display", "none");
            response.forEach(account => {
                if ($('registerEmail').val != account.email) { // IF ACCOUNT EXISTS
                    console.log("account exists")
                    $('#errorMessage').show()
                    $('#errorMessage').html('Account already exists!');
                    $('#errorMessage').css('color', 'red');
                } else {

                    createAccount();
                }
            })
        })
    })
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