$(document).ready(function () {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: countryISO4217
    });
    $(".price-slashed").each(function () {
        let currentPrice = $(this).attr("data-price");
        let newPrice = formatter.format(currentPrice * conversionRate);
        $(this).html(`<del><emphasis>${newPrice}</emphasis></del>`);
    });
    $(".price").each(function () {
        let currentPrice = $(this).attr("data-price");
        let newPrice = formatter.format(currentPrice * conversionRate);
        $(this).html(`<strong>${newPrice}</strong>`);
    })

});