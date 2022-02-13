const userLoggedIn = localStorage.getItem('userLoggedIn');
var site = '';
if (window.location.host === 'comzone.shuqri.xyz') {
    site = window.location.origin + '/';
} else {
    site = window.location.origin + '/IDAssignment2/';
}

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
        if (window.location === site + "account.html") {
            window.location.assign(site + "login.html");
        }

    }
})

