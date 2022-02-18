// INITIALISE CONSTANTS
const mainDB = "https://comzone-9f7d.restdb.io/rest/laptop-parts";
const APIKEY = "6208844f34fd62156585842e";


$(document).ready(function () {
    let formatter = new Intl.NumberFormat('en-SG', {
        style: 'currency',
        currency: countryISO4217
    });

    $('#cart').scrollToFixed({
        marginTop: 50,
    });

    let userCart;
    if (localStorage.getItem('userCart') != null) {
        userCart = JSON.parse(localStorage.getItem('userCart'));
    }
    else {
        userCart = [];
    }

    let path = window.location.pathname;
    let page = path.split("/").pop().replace('.html','');

    let priceDB = "https://comzone-9f7d.restdb.io/rest/config-base-price";
    let basePrice = 0;
    ajaxFuncGET(priceDB).done(function (response) {
        response.map(obj => {
            if (obj.system === page) {
                basePrice = obj.basePrice;
            }
        });

        ajaxFuncGET(mainDB).done(function (response) {
            configurator(response, page, basePrice);
            $(".price-slashed").each(function () {
                let currentPrice = $(this).attr("data-price");
                currentPrice = Number(currentPrice.replace(/[^0-9.-]+/g,""));
                let newPrice = formatter.format(currentPrice * conversionRate);
                $(this).html(`<del><emphasis>${newPrice}</emphasis></del>`);
            });
            $(".price").each(function () {
                let currentPrice = $(this).attr("data-price");
                currentPrice = Number(currentPrice.replace(/[^0-9.-]+/g,""));
                let newPrice = formatter.format(currentPrice * conversionRate);
                $(this).html(`<strong>${newPrice}</strong>`);
            })
            let price = formatter.format((basePrice + getSubtotal()) * conversionRate);
            $("#subtotal").html(`<strong>${price}</strong>`);
        });
    });

    $(document).on("click", function () {
        let price = formatter.format((basePrice + getSubtotal()) * conversionRate);
        $("#subtotal").html(`<strong>${price}</strong>`);
    });

    // WHEN CLICK ADD TO CART
    $("#addToCartButton").on("click", function () {
        addItemToCart(userCart, basePrice, page);
    });

});

function addItemToCart(userCart, basePrice, page) {
    let finalPrice = basePrice + getSubtotal();

    $("#addToCartButton").on("click", function () {
        let warrantyName = $('input[name=warranty]:checked')[0].value;
        let cpuName = $('input[name=cpu]:checked')[0].value;
        let gpuName = $('input[name=gpu]:checked')[0].value;
        let displayName = $('input[name=display]:checked')[0].value;
        let ramName = $('input[name=ram]:checked')[0].value;
        let thermalCompoundName = $('input[name=thermal-compound]:checked')[0].value;
        let keyboardName = $('input[name=keyboard]:checked')[0].value;
        let ssdName = $('input[name=ssd]:checked')[0].value;
        let wirelessLANName = $('input[name=wireless-lan]:checked')[0].value;
        let osName = $('input[name=os]:checked')[0].value;
        let deadPixelPolicyName = $('input[name=dead-pixel-policy]:checked')[0].value;
        let professionalColorCalibrationName = $('input[name=professional-color-calibration]:checked')[0].value;

        let desktopConfiguration = {
            "name": page,
            "warranty": warrantyName,
            "cpu": cpuName,
            "gpu": gpuName,
            "display": displayName,
            "ram": ramName,
            "thermal_compound": thermalCompoundName,
            "keyboard": keyboardName,
            "ssd": ssdName,
            "wireless_lan": wirelessLANName,
            "os": osName,
            "dead_pixel_policy": deadPixelPolicyName,
            "professional_color_calibration": professionalColorCalibrationName
        };
        let cart = [desktopConfiguration, 1, finalPrice];
        console.log(cart);

        userCart.push(cart);
        console.log(userCart);
        localStorage.setItem("userCart", JSON.stringify(userCart));
        window.location.assign("../cart.html");

    });
}


function getSubtotal() {

    let warranty = Number($('input[name=warranty]:checked').attr("data-price"));
    let cpu = Number($('input[name=cpu]:checked').attr("data-price"));
    let gpu = Number($('input[name=gpu]:checked').attr("data-price"));
    let display = Number($('input[name=display]:checked').attr("data-price"));
    let ram = Number($('input[name=ram]:checked').attr("data-price"));
    let thermalCompound = Number($('input[name=thermal-compound]:checked').attr("data-price"));
    let keyboard = Number($('input[name=keyboard]:checked').attr("data-price"));
    let ssd = Number($('input[name=ssd]:checked').attr("data-price"));
    let wirelessLAN = Number($('input[name=wireless-lan]:checked').attr("data-price"));
    let os = Number($('input[name=os]:checked').attr("data-price"));
    let deadPixelPolicy = Number($('input[name=dead-pixel-policy]:checked').attr("data-price"));
    let professionalColorCalibration = Number($('input[name=professional-color-calibration]:checked').attr("data-price"));

    return warranty + cpu + gpu + display + ram + thermalCompound + keyboard + ssd + wirelessLAN + os +
        deadPixelPolicy + professionalColorCalibration;
}

function configurator(response, page, basePrice) {
    let newSection = "";
    let i = 1;
    let sectionList = [];


    response.map(part => {sectionList.push(part.section.toLowerCase())});

    let cleanedSectionList = new Set(sectionList);

    cleanedSectionList.forEach(section => {
        let sectionID = section.replace(/\s+/g, '-')
        let i = 1;
        let content = "";
        response.map(part => {
            if (page === part.system.toLowerCase()) {
                let sectionName = part.section.toLowerCase();
                if (sectionName === section) {
                    let system = part.system.toLowerCase();
                    let specs = part.specification;
                    let price = part.price;
                    let discountBool = part.discounted;
                    let checkedBool = part.checked.toLowerCase();
                    let stockAmt = part.stock;


                    // IF ITEM IS DEFAULT OPTION
                    let checked = "";
                    if (checkedBool === "true") {
                        checked = " checked";
                    }
                    else {
                        checked = "";
                    }

                    // CHECK ITEM HAS DISCOUNT
                    let priceContents = "";
                    let discountPrice = part.discount;
                    if (discountBool === "true") {
                        priceContents = `<div style="display: flex; justify-content: left; align-items: center; margin-bottom: -17px;">
                                            <p class="text-dark mt-1 price-slashed" data-price="${price}" style="line-height: 10px;"><del><emphasis></del></p>
                                            <p id="${sectionID}-${i}-price" data-price="${discountPrice}" class="ps-2 text-primary mt-1 price"><strong></strong></p>
                                        </div>`
                    }
                    else {
                        priceContents = `<p id="${sectionID}-${i}-price" class="text-primary mt-1 price" data-price="${price}" style="line-height: 10px;"><strong></strong></p>`
                    }

                    // CHECK IF ITEM IN STOCK
                    let specsContents = "";
                    if (stockAmt > 0 || stockAmt === -1) {
                        specsContents = specs;
                    }
                    else {
                        checked = " disabled";
                        specsContents =    `<div style="display: flex; justify-content: left; align-items: center; margin-bottom: -17px;">
                                            <p><del>${specs}</del></p>
                                            <p class="ps-2 text-danger"><strong>Out of stock</strong></p>
                                        </div>`;
                    }
                    if (discountBool === "true") {
                        content = `${content}
                                    <div class="form-check">
                                        <input class="form-check-input ${system}" type="radio" name="${sectionID}" id="${sectionID}-${i}" value="${specs}"${checked} data-price="${discountPrice}">
                                        <label for="${sectionID}-${i}" class="form-check-label">
                                            ${specsContents}
                                            ${priceContents}
                                        </label>
                                    </div>`
                    }
                    else {
                        content = `${content}
                                    <div class="form-check">
                                        <input class="form-check-input ${system}" type="radio" name="${sectionID}" id="${sectionID}-${i}" value="${specs}"${checked} data-price="${price}">
                                        <label for="${sectionID}-${i}" class="form-check-label">
                                            ${specsContents}
                                            ${priceContents}
                                        </label>
                                    </div>`
                    }

                    i++
                }
            }

        });
        $("#" + sectionID).html(content);
    });
    let price = formatter.format((basePrice + getSubtotal()) * conversionRate);
    $("#subtotal").html(`<strong>${price}</strong>`);
    $("#spinner").hide();
    $("#configure-system").show();
}

// AJAX TO ACCESS DATABASE
function ajaxFuncGET(dbURL) {
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