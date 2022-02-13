const userLoggedIn = localStorage.getItem('userLoggedIn');
const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";
$('#account-overview').hide()
var site = '';
if (window.location.host === 'comzone.shuqri.xyz') {
    site = window.location.origin + '/';
} else {
    site = window.location.origin + '/IDAssignment2/';
}

$(document).ready(function () {


    if (userLoggedIn == null) { // Account not present
        if (window.location == site + "account.html") {
            window.location.assign(site + "login.html");
        }

    } else {
        // SHOW ACCOUNT DETAILS
        console.log('show account details');
        ajaxFunction("GET").done(function (response) {
            $('#account-overview').show()

            console.log('in ajax');
            console.log(userLoggedIn);
            response.map(account => {
                console.log(account.email);
                if (account.email === userLoggedIn) {
                    let name = account.firstName + ' ' + account.lastName;
                    $('#account-greeting').html('Hi, ' + name + '!');
                    $('#account-points').html('Current points: ' + account.points);
                }
            })
        })




        $('#account-logout').on('click', function () {
            localStorage.removeItem('userLoggedIn');
            console.log('removed account');
            location.assign(site);
        })

    }
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