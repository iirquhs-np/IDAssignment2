const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";
const site = "https://github.shuqri.xyz/IDAssignment2/";
const userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));

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
        if (window.location != site + "login.html") {
            window.location.assign(site + "login.html");
        }
        if (window.location == site + "login.html") {
            console.log('in login code')
            $("#loginSubmit").on("click", function(e) {
                e.preventDefault();
                $('#errorMessage').hide();
                $('#spinner').css("display", "block");
                // idea: create a loading icon beside submit

                $.ajax({
                    "async": true,
                    "crossDomain": true,
                    "url": dbURL,
                    "method": "GET", //[cher] we will use GET to retrieve info
                    "headers": {
                        "content-type": "application/json",
                        "x-apikey": APIKEY,
                        "cache-control": "no-cache"
                    },
                }).done(function (response) {
                    $('#spinner').css("display", "none");
                    let accExists = false;
                    response.map((account => {
                        if ($("#loginEmail").val() === account.email && $("#loginPassword").val() === account.password) {
                            setAccount(account._id, account.name);
                            accExists = true;
                        }
                    }))
                    if (!accExists) {
                        $('#errorMessage').show()
                        $('#errorMessage').html('Wrong username or password?');
                        $('#errorMessage').css('color', 'red');
                        console.log("wrong username or password.")
                    }
                })

            })
        }

    }
    function setAccount(id, name) {
        localStorage.setItem("userLoggedIn", JSON.stringify([id, name]));
        window.location.assign(site + "account.html");

    }

})