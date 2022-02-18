// INITIALISE CONSTANTS
const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";
const promoCode = JSON.parse(localStorage.getItem('promoCode'));
let userCart = JSON.parse(localStorage.getItem('userCart'));

$(document).ready(function () {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: countryISO4217
    });

    $("#deliverySameDay-label").each(function () {
        let currentPrice = $(this).attr("data-price");
        let newPrice = formatter.format(currentPrice * conversionRate);
        $(this).html(`Same Day Delivery (+ ${newPrice})`);
    })

    let subtotal = 0;
    userCart.forEach(cartObj => {
        subtotal += cartObj[2];
    });
    let deliveryMethodID = $('input[name=deliveryMethod]:checked').attr("id");
    let deliveryPrice = 0;
    if (deliveryMethodID === "delivery--same-day") {
        $("#checkout-delivery").html(formatter.format(38 * conversionRate));
        deliveryPrice = 38;
    }
    else {
        $("#checkout-delivery").html(formatter.format(0));
    }
    if (promoCode !== null){
        $(".promos").show();
        $("#promo-name").html("Discount (" + promoCode.code + ")");
        $("#checkout-discount").html(formatter.format(-promoCode.discount));
        $("#checkout-subtotal").html(formatter.format(subtotal * conversionRate));
        $("#checkout-total").html(formatter.format((subtotal + deliveryPrice - promoCode.discount) * conversionRate));
    }
    else {
        $(".promos").hide();
        $("#checkout-subtotal").html(formatter.format(subtotal * conversionRate));
        $("#checkout-total").html(formatter.format((subtotal + deliveryPrice) * conversionRate));
    }




    $(document).on("click", ".delivery-method", function () {
        let deliveryMethodID = $('input[name=deliveryMethod]:checked').attr("id");
        let deliveryPrice = 0;
        if (deliveryMethodID === "delivery--same-day") {
            $("#checkout-delivery").html(formatter.format(38 * conversionRate));
            deliveryPrice = 38;
        }
        else {
            $("#checkout-delivery").html(formatter.format(0));
        }
        if (promoCode !== null){
            $(".promos").show();
            $("#promo-name").html("Discount (" + promoCode.code + ")");
            $("#checkout-discount").html(formatter.format(-promoCode.discount));
            $("#checkout-subtotal").html(formatter.format(subtotal * conversionRate));
            $("#checkout-total").html(formatter.format((subtotal + deliveryPrice - promoCode.discount) * conversionRate));
        }
        else {
            $(".promos").hide();
            $("#checkout-subtotal").html(formatter.format(subtotal * conversionRate));
            $("#checkout-total").html(formatter.format((subtotal + deliveryPrice) * conversionRate));
        }
    });

    if (userAccount !== null) {
        ajaxFuncGET().done(function (response) {
            response.map(acc => {
                if (userAccount === acc._id) {
                    $("#firstName").val(acc.firstName);
                    $("#lastName").val(acc.lastName);
                    $("#email").val(acc.email);
                }
            });
        });
    }

    $("#complete-order").on("click", function (e) {
        e.preventDefault();
        let errorMsg = $("#errorMessage");
        let spinner = $("#spinner");
        errorMsg.css("display", "none");
        spinner.css("display", "block");

        if (userAccount === null) {
            errorMsg.html("Please log in to an account.");
            errorMsg.css("color", "red");
            spinner.css("display", "none");
            errorMsg.css("display", "block");
        }
        else {
            let firstName = $("#firstName").val();
            let email = $("#email").val();
            let address = $("#address").val();
            let address2 = $("#address2").val();
            let zip = $("#zip").val();
            let country = "Singapore";
            let city = "Singapore";
            let deliveryMethod = $('input[name=deliveryMethod]:checked').attr("id");
            let ccName = $("#cc-name").val();
            let ccNumber = $("#cc-number").val();
            let ccExpiration = $("#cc-expiration").val();
            let ccCVV = $("#cc-cvv").val();
            let code;
            if (promoCode !== null) {
                let code = promoCode.code;
            }

            ajaxFuncGET().done(function (response) {
                let accValid = false;
                response.map(acc => {
                    if (acc.email === email) {
                        accValid = true;
                        if (firstName !== "" && lastName !== "" && address !== "" && zip !== "" &&
                            ccName !== "" && ccNumber !== "" && ccExpiration !== "" && ccCVV !== "") {
                            let data = {
                                "accID": acc._id,
                                "email": email,
                                "address1": address,
                                "address2:": address2,
                                "zip": zip,
                                "promo-code": code,
                                "delivery-method": deliveryMethod,
                                "card-name": ccName,
                                "card-number": ccNumber,
                                "card-expiration": ccExpiration,
                                "card-cvv": ccCVV,
                                "orderJSON": userCart
                            }

                            let settings = {
                                "async": true,
                                "crossDomain": true,
                                "url": "https://comzone-9f7d.restdb.io/rest/orders",
                                "method": "POST",
                                "headers": {
                                    "content-type": "application/json",
                                    "x-apikey": APIKEY,
                                    "cache-control": "no-cache"
                                },
                                "processData": false,
                                "data": JSON.stringify(data)
                            }

                            $.ajax(settings).done(function () {
                                localStorage.removeItem("userCart");
                                localStorage.removeItem("promoCode");
                                errorMsg.hide();
                                window.location.assign("account.html");
                            });
                        } else {
                            errorMsg.html("All fields must be provided.");
                            errorMsg.css("color", "red");
                            spinner.hide();
                            errorMsg.show();
                        }
                    }
                });
                if (!accValid) {
                    errorMsg.html("Email does not exist. Please create an account.");
                    errorMsg.css("color", "red");
                    spinner.css("display", "none");
                    errorMsg.css("display", "block");
                }
            });
        }





    })
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