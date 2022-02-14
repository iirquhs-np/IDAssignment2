// INITIALISE CONSTANTS
const userAccount = localStorage.getItem("userAccount");
const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";

// MAIN CODE
$(document).ready(function () {
    // INITIALISING SELECTORS
    let displayOverview = $("#display-overview");
    let displayGreeting = $("#display-greeting");
    let displayPoints = $("#display-points");
    let displayLogout = $("#display-logout");
    let displayEmail = $("#display-email");

    // HIDE ACCOUNT OVERVIEW DIV
    displayOverview.hide();

    if (userAccount == null) {
        // IF USER ACCOUNT IS NOT PRESENT, ASK USER TO LOG IN.
        window.location.replace("login.html");
    } else {
        displayLogout.on("click", function () {
            localStorage.clear();
            window.location.assign("index.html");
        });

        // IF USER ACCOUNT IS PRESENT, SHOW ACCOUNT DETAILS
        ajaxFuncGET().done(function (response) {
            displayOverview.show();

            response.map(account => {
                if (account.email === userAccount) {
                    let name = account.firstName + " " + account.lastName;
                    let points = account.points;
                    let email = account.email;

                    displayGreeting.html("Hi, " + name + "!");

                    displayEmail.html(email);
                    displayPoints.html(points);
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