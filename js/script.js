// INITIALISE CONSTANTS
const userAccount = localStorage.getItem("userAccount");


// MAIN CODE
$(document).ready(function () {
    $("#account-button").on("click", function () {
        if (userAccount == null) {
            window.location.assign("login.html");
        }
        else {
            window.location.assign("account.html")
        }
    });
});