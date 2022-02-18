// GLOBAL JAVASCRIPT CODE

var formatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: "SGD"
});
// INITIALISE CONSTANTS
const userAccount = localStorage.getItem("userAccount");
const countryISO4217 = localStorage.getItem("countryISO4217");
const conversionRate = localStorage.getItem("conversionRate");
const country = localStorage.getItem("country");

//const country = localStorage.getItem("country");

// MAIN CODE
$(document).ready(function () {

    // CURRENCY CONVERTER
    let baseISO4217;
    if (countryISO4217 === null) {
        baseISO4217 = "SGD";
        localStorage.setItem("countryISO4217", baseISO4217);
        localStorage.setItem("conversionRate", 1);
        localStorage.setItem("country", "Singapore");
        formatter = new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: baseISO4217
        });
        window.location.reload();
    }
    currencyConverter(baseISO4217);
    $("#current-country").html(country);

    cartItemCount();
    socialButtonsFooter();

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

function currencyConverter(baseISO4217) {
    $(document).on('click','.country-apac p', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();



        let id = Number($(this).index(".country-apac p"));
        console.log(id);
        if (id === 0) {
            baseISO4217 = "AUD";
            localStorage.setItem("country", "Australia");
        }
        else if (id === 1) {
            baseISO4217 = "CNY";
            localStorage.setItem("country", "China");
        }
        else if (id === 2) {
            baseISO4217 = "HKD";
            localStorage.setItem("country", "Hong Kong");
        }
        else if (id === 3) {
            baseISO4217 = "INR";
            localStorage.setItem("country", "India");
        }
        else if (id === 4) {
            baseISO4217 = "IDR";
            localStorage.setItem("country", "Indonesia");
        }
        else if (id === 5) {
            baseISO4217 = "JPY";
            localStorage.setItem("country", "Japan");
        }
        else if (id === 6) {
            baseISO4217 = "MYR";
            localStorage.setItem("country", "Malaysia");
        }
        else if (id === 7) {
            baseISO4217 = "NZD";
            localStorage.setItem("country", "New Zealand");
        }
        else if (id === 8) {
            baseISO4217 = "PHP";
            localStorage.setItem("country", "Philippines");
        }
        else if (id === 9) {
            baseISO4217 = "KRW";
            localStorage.setItem("country", "Korea");
        }
        else if (id === 10) {
            baseISO4217 = "SGD";
            localStorage.setItem("country", "Singapore");
        }
        else if (id === 11) {
            baseISO4217 = "TWD";
            localStorage.setItem("country", "Taiwan");
        }
        else {
            baseISO4217 = "SGD";
            localStorage.setItem("country", "Singapore");
        }

        let rate = 1;
        fetch("https://v6.exchangerate-api.com/v6/e7f0a690189854cf3bf42d0a/latest/SGD")
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("conversionRate", data.conversion_rates[baseISO4217]);
                localStorage.setItem("countryISO4217", baseISO4217);
                formatter = new Intl.NumberFormat('en-SG', {
                    style: 'currency',
                    currency: baseISO4217
                });

                window.location.reload();
            });
    });
}

function cartItemCount() {
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
}

function socialButtonsFooter () {
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

}

$('#checkout-process .nav-tab').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
})
