// INITIALISE CONSTANTS
const userAccount = localStorage.getItem("userAccount");
const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";

// HIDE ACCOUNT OVERVIEW DIV
$("account-overview").hide();

// CHECK SITE URL
var site = "";
if (window.location.host === "comzone.shuqri.xyz") {
    site = window.location.origin + "/";
} else {
    site = window.location.origin + "/IDAssignment2/";
}

// MAIN CODE
$(window).ready(function () {
    if (userAccount == null) {
        // IF USER ACCOUNT IS NOT PRESENT, ASK USER TO LOG IN.
        console.log("REDIRECTING TO LOGIN.HTML")
        window.location.replace("login.html");
    } else {
        // IF USER ACCOUNT IS PRESENT, SHOW ACCOUNT DETAILS
        ajaxFuncGET().done(function (response) {
            console.log("SHOWING ACCOUNT DETAILS...")
            $("#account-overview").show();

            response.map(account => {
                if (account.email === userAccount) {
                    let name = account.firstName + " " + account.lastName;
                    $("#account-greeting").html("Hi, " + name + "!");
                    $("account-points").html("Current points: " + account.points);
                }
            });
        });
    }
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