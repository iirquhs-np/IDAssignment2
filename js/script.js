// GLOBAL JAVASCRIPT CODE

var formatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD'
});

// INITIALISE CONSTANTS
const userAccount = localStorage.getItem("userAccount");
//const country = localStorage.getItem("country");

// MAIN CODE
$(document).ready(function () {

    /*// POSSIBLE COUNTRY SELECTOR
    let countryName = "";
    let flag = ""
    let country = "SGP";
    if (country === "SGP"){
        flag = `<span class="flag-icon flag-icon-sgp me-1" aria-label="Singapore"></span>`;
    }
    else if (country === "MY") {
        flag = `<span class="flag-icon flag-icon-mys me-1" aria-label="Malaysia"></span>`;
    }
    else if (country === "AU") {
        flag = `<span class="flag-icon flag-icon-aus me-1" aria-label="Australia"></span>`;
    }

    let countrySelector =  `<button class="btn btn-sm btn-secondary dropdown-toggle" type="button" id="countrySelectorButton" data-bs-toggle="dropdown" aria-expanded="false">
                                ${flag}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="countrySelectorButton">
                                <li><a class="dropdown-item" href="#"><span class="flag-icon flag-icon-sgp me-1" aria-label="Singapore"></span>Singapore</a></li>
                                <li><a class="dropdown-item" href="#"><span class="flag-icon flag-icon-mys me-1" aria-label="Malaysia"></span>Malaysia</a></li>
                                <li><a class="dropdown-item" href="#"><span class="flag-icon flag-icon-aus me-1" aria-label="Australia"></span>Australia</a></li>
                            </ul>`
    $("#country-dropdown").html(countrySelector);*/

    // Check amt of items in cart.
    let cartQty = 0;
    let userCart = JSON.parse(localStorage.getItem('userCart'));
    if (userCart !== null) {
        userCart.forEach(cartObj => {
            cartQty += cartObj[1];
        });
    }
    $("#cart-qty").html("Cart(" + cartQty + ")");
    // IF USER CLICKS ON ACCOUNT BUTTON
    $("#account-button").on("click", function () {
        if (!window.location.pathname.includes("configuration")) {
            if (userAccount == null) {
                window.location.assign("login.html");
            } else {

                window.location.assign("account.html");
            }
        } else {
            if (userAccount == null) {
                window.location.assign("../login.html");
            } else {
                window.location.assign("../account.html");
            }
        }
    });

    // SOCIAL MEDIA FOOTER BUTTONS
    $(".social-facebook").on("click", function () {
        window.open("https://www.facebook.com/makeitnp/");
    });
    $(".social-google").on("click", function () {
        window.open("https://goo.gl/maps/oqLvC57pu5BBTZGK7/");
    });
    $(".social-linkedin").on("click", function () {
        window.open("https://www.linkedin.com/school/school-of-infocomm-technology-ngee-ann-polytechnic/");
    });
    $(".social-instagram").on("click", function () {
        window.open("https://www.instagram.com/makeitnp/");
    });
    $(".social-twitter").on("click", function () {
        window.open("https://twitter.com/makeitnp");
    });

    // BACK TO TOP BUTTON
    //Get the button
    let myButton = $("#btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            myButton.css("display", "block");
        } else {
            myButton.css("display", "none");
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    myButton.on("click", backToTop);

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

});

$('#checkout-process .nav-tab').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })