const APIKEY = "fa99bb6b101afbe7582febb04406696509ee5";
const site = "github.shuqri.xyz/";
const userLoggedIn = JSON.parse(localStotrage.getItem('userLoggedIn'));

$(document).ready(function () {
    if (userLoggedIn != null) {
        if (window.location.href === site + "account") {
            window.location = site + "login";
        }
    } else {
        // SHOW ACCOUNT DETAILS
        console.log("show account details")
    }


})