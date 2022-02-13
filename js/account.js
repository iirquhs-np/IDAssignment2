const userLoggedIn = localStorage.getItem('userLoggedIn');
const site = "https://comzone.shuqri.xyz/";
// const site = "http://localhost:63342/IDAssignment2/"; // FOR DEBUGGING

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

    }
})

