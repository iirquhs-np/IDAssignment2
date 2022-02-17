$(document).ready(function () {
    let content = "";
    let userCart = JSON.parse(localStorage.getItem('userCart'));
    let i = 1
    userCart.forEach(cartObj => {
        let item = cartObj[0];
        let quantity = cartObj[1];
        let price = formatter.format(cartObj[2]);
        console.log(item.name);
        let itemContent = `<strong>${item.name.toUpperCase()}</strong><br>`
        let firstVal = true;
        for (const [key, value] of Object.entries(item)) {
            if (firstVal){
                firstVal = false
            }
            else{
                if (value !== "None")
                {
                    itemContent += `- ${value}<br>`
                }
                else {
                    let sectionName = key.replace(/_/g, ' ');
                    sectionName = sectionName.split(" ").map(capitalize).join(" ");
                    console.log(sectionName);
                    if (sectionName.includes("Lan")) {
                        sectionName = sectionName.replace("Lan", "LAN");
                        console.log(sectionName);
                    }
                    else if (sectionName.includes("Ssd")) {
                        sectionName = sectionName.replace("Ssd", "SSD");
                        console.log(sectionName);
                    }
                    else if (sectionName.includes("Hdd")) {
                        sectionName = sectionName.replace("Hdd", "HDD");
                        console.log(sectionName);
                    }
                    else if (sectionName.includes("Os")) {
                        sectionName = sectionName.replace("Os", "OS");
                        console.log(sectionName);

                    }
                    itemContent += `- No ${sectionName}<br>`
                }
            }
        }
        for (let i = 1; i < item.length; i++) {

            console.log(item[i]);
            itemContent += `- ${item[i]}<br>`
        }
        content = `${content}
                            <tr id='cart-${i}'>
                                <td>${itemContent}</td>
                                <td>${quantity}</td>
                                <td>${price}</td>`

        i++;
    });
    $("#cart-table tbody").html(content);

    let value = 0;
    for (let i = 1; i < $("#cart-1 td").length; i++) {
        let cartVal = $("#cart-1 td")[2].outerText;
        cartVal = Number(cartVal.replace(/[^0-9.-]+/g,""));
        value += cartVal;
    }
    $("#cart-subtotal").html(formatter.format(value));
    $("#cart-total").html(formatter.format(value));
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
