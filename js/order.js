$(document).ready(function () {
    let sku = new URLSearchParams(window.location.search).get("SKU");


    let order = {
        case: "RAPID Mesh High Airflow Tempered Glass Chassis",
        cpu: "Intel Core i3-10105F",
        motherboard: "GIGABYTE B560M DS3H",
    }



    let data = {
        email: "abc@example.com",
        orderJSON: order
    }

    ajaxFuncPOST(data).done(function (response) {

    });
});

function ajaxFuncPOST(data) {
    return $.ajax({
        "async": true,
        "crossDomain": true,
        "url": dbURL,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(data)
    });
}