// INITIALISE CONSTANTS
const userAccount = localStorage.getItem("userAccount");
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
    // WHEN USER CLICKS LOG IN BUTTON
    $("loginSubmit").on("click", function (e) {
        e.preventDefault();
        $("#errorMessage").hide();
        $("#spinner").css("display", "block");

        ajaxFuncGET().done(function (response) {
            $("#spinner").css("display", "none");

            let accountExists = false;
            response.map(account => {
                if ($("#loginEmail").val() === account.email && $("#loginPassword").val() === account.password) {
                    localStorage.setItem("userAccount", account.email);
                    window.location.replace(site + "account.html");
                    accountExists = true;
                }
            });

            if (!accountExists) {
                $("#errorMessage").show();
                $("#errorMessage").html("Wrong username or password?");
                $("#errorMessage").css("color", "red");
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