// GLOBAL JAVASCRIPT CODE


// INITIALISE CONSTANTS
const userAccount = localStorage.getItem("userAccount");

// MAIN CODE
$(document).ready(function () {
    // IF USER CLICKS ON ACCOUNT BUTTON
    $("#account-button").on("click", function () {
        if (userAccount == null) {
            window.location.assign("login.html");
        }
        else {
            window.location.assign("account.html")
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

