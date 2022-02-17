// INITIALISE CONSTANTS
const mainDB = "https://comzone-9f7d.restdb.io/rest/desktop-parts";
const APIKEY = "6208844f34fd62156585842e";

$(document).ready(function () {
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
            configurator(response, page, basePrice)
        });
    });


    $(document).on("click", function () {
        let price = formatter.format(basePrice + getSubtotal());
        $("#subtotal").html(`<strong>${price}</strong>`);
    });

    // WHEN CLICK ADD TO CART
    $("#addToCartButton").on("click", function () {
        addItemToCart(userCart, basePrice, page);
    });
});

function addItemToCart(userCart, basePrice, page) {
    let finalPrice = basePrice + getSubtotal();

    let warrantyName = $('input[name=warranty]:checked')[0].value;
    let chassisName = $('input[name=chassis]:checked')[0].value;
    let cpuName =$('input[name=cpu]:checked')[0].value;
    let motherboardName = $('input[name=motherboard]:checked')[0].value;
    let gpuName =$('input[name=gpu]:checked')[0].value;
    let thermalCompoundName = $('input[name=thermal-compound]:checked')[0].value;
    let ramName = $('input[name=ram]:checked')[0].value;
    let cpuCoolerName = $('input[name=cpu-cooling-system]:checked')[0].value;
    let primarySSDName = $('input[name=primary-ssd]:checked')[0].value;
    let secondarySSDName = $('input[name=secondary-ssd]:checked')[0].value;
    let hddName = $('input[name=hdd]:checked')[0].value;
    let chassisFansName = $('input[name=chassis-fans]:checked')[0].value;
    let psuName = $('input[name=psu]:checked')[0].value;
    let wirelessLANName = $('input[name=wireless-lan]:checked')[0].value;
    let osName = $('input[name=os]:checked')[0].value;

    let desktopConfiguration = {
        "name": page,
        "warranty": warrantyName,
        "chassis": chassisName,
        "cpu": cpuName,
        "motherboard": motherboardName,
        "gpu": gpuName,
        "thermal_compound": thermalCompoundName,
        "ram": ramName,
        "cpu_cooling_system": cpuCoolerName,
        "primary_ssd": primarySSDName,
        "secondary_ssd": secondarySSDName,
        "hdd": hddName,
        "chassis_fans": chassisFansName,
        "psu": psuName,
        "wireless_lan": wirelessLANName,
        "os": osName
    };
    let cart = [desktopConfiguration, 1, finalPrice];
    console.log(cart);

    userCart.push(cart);
    console.log(userCart);
    localStorage.setItem("userCart", JSON.stringify(userCart));
    window.location.assign("../cart.html");
}



function getSubtotal() {
    let warranty = $("#" + $('input[name=warranty]:checked')[0].id + "-price")[0].textContent;
    let chassis = $("#" + $('input[name=chassis]:checked')[0].id + "-price")[0].textContent;
    let cpu = $("#" + $('input[name=cpu]:checked')[0].id + "-price")[0].textContent;
    let motherboard = $("#" + $('input[name=motherboard]:checked')[0].id + "-price")[0].textContent;
    let gpu = $("#" + $('input[name=gpu]:checked')[0].id + "-price")[0].textContent;
    let thermalCompound = $("#" + $('input[name=thermal-compound]:checked')[0].id + "-price")[0].textContent;
    let ram = $("#" + $('input[name=ram]:checked')[0].id + "-price")[0].textContent;
    let cpuCooler = $("#" + $('input[name=cpu-cooling-system]:checked')[0].id + "-price")[0].textContent
    let primarySSD = $("#" + $('input[name=primary-ssd]:checked')[0].id + "-price")[0].textContent
    let secondarySSD = $("#" + $('input[name=secondary-ssd]:checked')[0].id + "-price")[0].textContent
    let hdd = $("#" + $('input[name=hdd]:checked')[0].id + "-price")[0].textContent
    let chassisFans = $("#" + $('input[name=chassis-fans]:checked')[0].id + "-price")[0].textContent
    let psu = $("#" + $('input[name=psu]:checked')[0].id + "-price")[0].textContent
    let wirelessLAN = $("#" + $('input[name=wireless-lan]:checked')[0].id + "-price")[0].textContent
    let os = $("#" + $('input[name=os]:checked')[0].id + "-price")[0].textContent

    warranty = Number(warranty.replace(/[^0-9.-]+/g,""));
    chassis = Number(chassis.replace(/[^0-9.-]+/g,""));
    cpu = Number(cpu.replace(/[^0-9.-]+/g,""));
    motherboard = Number(motherboard.replace(/[^0-9.-]+/g,""));
    gpu = Number(gpu.replace(/[^0-9.-]+/g,""));
    thermalCompound = Number(thermalCompound.replace(/[^0-9.-]+/g,""));
    ram = Number(ram.replace(/[^0-9.-]+/g,""));
    cpuCooler = Number(cpuCooler.replace(/[^0-9.-]+/g,""));
    primarySSD = Number(primarySSD.replace(/[^0-9.-]+/g,""));
    secondarySSD = Number(secondarySSD.replace(/[^0-9.-]+/g,""));
    hdd = Number(hdd.replace(/[^0-9.-]+/g,""));
    chassisFans = Number(chassisFans.replace(/[^0-9.-]+/g,""));
    psu = Number(psu.replace(/[^0-9.-]+/g,""));
    wirelessLAN = Number(wirelessLAN.replace(/[^0-9.-]+/g,""));
    os = Number(os.replace(/[^0-9.-]+/g,""));

    
    return warranty + chassis + cpu + motherboard + gpu + thermalCompound +
        ram + cpuCooler + primarySSD + secondarySSD + hdd + chassisFans + psu +
        wirelessLAN + os;


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
                    let price = formatter.format(part.price);
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
                    if (discountBool === "true") {
                        let discountPrice = formatter.format(part.discount);

                        priceContents = `<div style="display: flex; justify-content: left; align-items: center; margin-bottom: -17px;">
                                            <p class="text-dark mt-1" style="line-height: 10px;"><del><emphasis>${price}</del></p>
                                            <p id="${sectionID}-${i}-price" class="ps-2 text-primary mt-1"><strong>${discountPrice}</strong></p>
                                        </div>`
                    }
                    else {
                        priceContents = `<p id="${sectionID}-${i}-price" class="text-primary mt-1" style="line-height: 10px;"><strong>${price}</strong></p>`
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
                    /*
                    content = `${content}
                                <div>
                                    <p>Hi! ${i}</p>
                                </div>`*/
                    content = `${content}

                    <div class="form-check">
                            <input class="form-check-input ${system}" type="radio" name="${sectionID}" id="${sectionID}-${i}" value="${specs}"${checked}>
                            <label for="${sectionID}-${i}" class="form-check-label">
                                ${specsContents}
                                ${priceContents}
                            </label>
                            </div>`
                    i++
                }
            }

        });
        $("#" + sectionID).html(content);
    });
    let price = formatter.format(basePrice + getSubtotal());
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