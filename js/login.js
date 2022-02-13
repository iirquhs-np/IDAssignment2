const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";
var site = '';
if (window.location.host === 'comzone.shuqri.xyz') {
    site = window.location.origin + '/';
} else {
    site = window.location.origin + '/IDAssignment2/';
}

$(document).ready(function () {
    console.log('in login code')
    $("#loginSubmit").on("click", function(e) {
        e.preventDefault();
        $('#errorMessage').hide();
        $('#spinner').css("display", "block");

        ajaxFunction("GET").done(function (response) {
            $('#spinner').css("display", "none");
            let accExists = false;
            response.map(account => {
                if ($("#loginEmail").val() === account.email && $("#loginPassword").val() === account.password) {
                    localStorage.setItem("userLoggedIn", account.email);
                    window.location.assign(site + "account.html");
                    accExists = true;
                }
            })
            if (!accExists) {
                $('#errorMessage').show()
                $('#errorMessage').html('Wrong username or password?');
                $('#errorMessage').css('color', 'red');
                console.log("wrong username or password.")
            }
        })
    })
})

function ajaxFunction (m) {
    return $.ajax({
        "async": true,
        "crossDomain": true,
        "url": dbURL,
        "method": m,
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        }
    })
}