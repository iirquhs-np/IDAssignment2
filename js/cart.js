const APIKEY = "6208844f34fd62156585842e";

$(window).on("load", function () {
    let content = "";
    let userCart = JSON.parse(localStorage.getItem('userCart'));
    getCartDetails(userCart, content);

    if (localStorage.getItem("promoCode") !== null) {
        let promoCode = JSON.parse(localStorage.getItem('promoCode'));
        $("#promo-code").val(promoCode.code);
    }

    $("#check-out").on("click", function() {
        let promoCode = $("#promo-code").val();
        let errorMsg = $("#errorMessage");
        let spinner = $("#spinner");

        errorMsg.css("display", "none");
        spinner.css("display", "block");

        if (promoCode === "") {
            localStorage.removeItem("promoCode");
            window.location.assign("checkout.html");
        }
        else {
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://comzone-9f7d.restdb.io/rest/promo-codes",
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": APIKEY,
                    "cache-control": "no-cache"
                }
            }

            $.ajax(settings).done(function (response) {
                let promoExists = false;
                response.map(obj => {
                    let code = obj.code;
                    if (promoCode === code) {
                        let discount = obj.discount;
                        let promoList = {
                            "code": code,
                            "discount": discount
                        };
                        spinner.css("display", "none");
                        localStorage.setItem("promoCode", JSON.stringify(promoList));
                        promoExists = true;
                        window.location.assign("checkout.html");
                    }
                })
                if (!promoExists) {
                    errorMsg.html("Promo code does not exist!");
                    errorMsg.css("color", "red");
                    errorMsg.css("display", "block");
                    spinner.css("display", "none");
                }
            });
        }



    })

    $(document).on('click','.cart-minus-button', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();

        userCart = JSON.parse(localStorage.getItem('userCart'));
        let id = Number($(this).index(".cart-minus-button"));
        let qty = userCart[id][1];

        if (qty === 1) {
            userCart.splice(id, 1);
            console.log(userCart);
        }
        else {
            let price = userCart[id][2] / qty;
            userCart[id][1] -= 1;
            userCart[id][2] -= price;
        }
        localStorage.setItem("userCart", JSON.stringify(userCart));
        getCartDetails(userCart, content);
    });

    $(document).on('click','.cart-plus-button', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();

        userCart = JSON.parse(localStorage.getItem('userCart'));
        let id = Number($(this).index(".cart-plus-button"));
        let qty = userCart[id][1];

        let itemPrice = userCart[id][2] / qty;
        userCart[id][1] += 1; // Add 1 quantity
        userCart[id][2] += itemPrice; // Add "1 item" price to total

        localStorage.setItem("userCart", JSON.stringify(userCart));
        getCartDetails(userCart, content);
    });


});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getCartDetails(userCart, content) {
    let formatter = new Intl.NumberFormat('en-SG', {
        style: 'currency',
        currency: countryISO4217
    });
    if (userCart === null || userCart.length === 0) {
        $("#cart-table").hide();
        $("#cart-empty-text").show();
    } else {
        $("#cart-table").show();
        let i = 1
        userCart.forEach(cartObj => {
            let item = cartObj[0];
            let quantity = cartObj[1];
            let price = formatter.format(cartObj[2] * conversionRate);
            let itemContent = `<strong>${item.name.toUpperCase()}</strong><br>`
            let firstVal = true;
            for (const [key, value] of Object.entries(item)) {
                if (firstVal) {
                    firstVal = false
                } else {
                    if (value !== "None") {
                        itemContent += `- ${value}<br>`
                    } else {
                        let sectionName = key.replace(/_/g, ' ');
                        sectionName = sectionName.split(" ").map(capitalize).join(" ");
                        if (sectionName.includes("Lan")) {
                            sectionName = sectionName.replace("Lan", "LAN");
                        } else if (sectionName.includes("Ssd")) {
                            sectionName = sectionName.replace("Ssd", "SSD");
                        } else if (sectionName.includes("Hdd")) {
                            sectionName = sectionName.replace("Hdd", "HDD");
                        } else if (sectionName.includes("Os")) {
                            sectionName = sectionName.replace("Os", "OS");

                        }
                        itemContent += `- No ${sectionName}<br>`
                    }
                }
            }
            for (let i = 1; i < item.length; i++) {
                itemContent += `- ${item[i]}<br>`
            }
            content = `${content}
                            <tr id='cart-${i}'>
                                <td>${itemContent}</td>
                                <td><i id="cart-minus-${i}" class="cart-minus-button fas fa-minus-circle me-2"></i>${quantity}<i id="cart-plus-${i}" class="cart-plus-button fas fa-plus-circle ms-2"></i></td>
                                <td>${price}</td>`

            i++;
        });
        $("#cart-table tbody").html(content);

        let value = 0;
        for (let i = 1; i < $("tr").length; i++) {
            let cartVal = $("#cart-" + i + " td")[2].textContent;
            cartVal = Number(cartVal.replace(/[^0-9.-]+/g, ""));
            value += cartVal;
        }
        $("#cart-subtotal").html(formatter.format(value));
        $("#cart-total").html(formatter.format(value ));
    }

}