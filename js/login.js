// INITIALISE CONSTANTS
const userAccount = localStorage.getItem("userAccount");
const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";

// MAIN CODE
$(document).ready(function () {
    let submitButton = $("#loginSubmit");
    let errorMsg = $("#errorMessage");
    let spinner = $("#spinner");

    
    // WHEN USER CLICKS LOG IN BUTTON
    submitButton.on("click", function (e) {
        e.preventDefault();

        let uEmail = $("#loginEmail").val();
        let uPwd = $("#loginPassword").val();
        
        errorMsg.hide();
        spinner.css('display', 'block');

        ajaxFuncGET().done(function (response) {
            spinner.css('display', 'none');

            let accountExists = false;
            response.map(account => {
                let responseEmail = account.email;
                let responsePwd = account.password

                if (uEmail === responseEmail && uPwd === responsePwd) {
                    localStorage.setItem("userAccount", responseEmail);
                    window.location.assign("account.html");
                    accountExists = true;
                }
            });

            if (!accountExists) {
                errorMsg.show();
                errorMsg.html("Wrong username or password?");
                errorMsg.css("color", "red");
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