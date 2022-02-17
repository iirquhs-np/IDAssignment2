// INITIALISE CONSTANTS
const dbURL = "https://comzone-9f7d.restdb.io/rest/desktop-parts";
const APIKEY = "6208844f34fd62156585842e";

let formatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD'
});

$(document).ready(function () {

    $('#cart').scrollToFixed({
        marginTop: 50,
    });

    let path = window.location.pathname;
    let page = path.split("/").pop();


    ajaxFuncGET().done(function (response) {
        let newSection = "";
        let i = 1;
        let sectionList = [];


        response.map(part => {sectionList.push(part.section.toLowerCase())});

        let cleanedSectionList = new Set(sectionList);
        cleanedSectionList.forEach(section => {
            let i = 1;
            let content = "";
            response.map(part => {
                if (page === part.system.toLowerCase() + ".html") {
                    let sectionName = part.section.toLowerCase();
                    if (sectionName === section) {
                        let specs = part.specification;
                        let price = formatter.format(part.price);
                        let discountBool = part.discounted;
                        let checkedBool = part.checked;
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
                                            <p class="text-dark" style="line-height: 10px;"><del><emphasis>${price}</del></p>
                                            <p class="ps-2 text-primary"><strong>${discountPrice}</strong></p>
                                        </div>`
                        }
                        else {
                            priceContents = `<p class="text-primary" style="line-height: 10px;"><strong><br>${price}</strong></p>`
                        }

                        // CHECK IF ITEM IN STOCK
                        let specsContents = "";
                        console.log(stockAmt);
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
                            <input class="form-check-input" type="radio" name="${section}" id="${section}-${i}" value="${specs}"${checked}>
                            <label for="${section}-${i}" class="form-check-label">
                                ${specsContents}
                                ${priceContents}
                            </label>
                            </div>`
                        i++
                    }
                }

            });
            let sectionID = section.replace(/\s+/g, '-')
            $("#" + sectionID).html(content);
        });
        $("#spinner").hide();
        $("#configure-system").show();
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