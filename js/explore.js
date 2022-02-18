
$(document).ready(function() {
    // Checks cart
    let userCart;
    if (localStorage.getItem('userCart') != null) {
        userCart = JSON.parse(localStorage.getItem('userCart'));
    }
    else {
        userCart = [];
    }

    // Checks RAPID
    $("#rapidATC").on("click", function() {
        let desktopConfiguration = {
            "name": "rapid",
            "warranty": "3 Years Parts Warranty (1st Year Onsite Pickup and Return)",
            "chassis": "RAPID Mesh High Airflow Tempered Glass Chassis",
            "cpu": "Intel® Core™ i3-10105F | 4.4 GHZ | 4 Cores 8 Threads",
            "motherboard": "GIGABYTE B560M DS3H",
            "gpu": "ZOTAC GTX 1650 OC 4GB",
            "thermal_compound": "ZOTAC GTX 1650 OC 4GB",
            "ram": "8GB KLEVV Performance 3200 MHz (8 x 1)",
            "cpu_cooling_system": "Intel / AMD stock cooling fan",
            "primary_ssd": "512GB Samsung NVME M.2 SSD (R 3500 | W 2900)",
            "secondary_ssd": "None",
            "hdd": "None",
            "chassis_fans": "COMZONE S1 ARGB Fans x 4",
            "psu": "800W FSP HYDRO PRO 80+ Bronze Certified PSU",
            "wireless_lan": "None",
            "os": "None"
        };
        let cart = [desktopConfiguration, 1, 1225];
        userCart.push(cart);
        localStorage.setItem("userCart", JSON.stringify(userCart));
        window.location.assign("cart.html");
    });

    // Checks FORGE15S
    $("#forge15sATC").on("click", function() {
        let laptopConfiguration = {
            "name": "forge15s",
            "warranty": "2 Years Parts Warranty (Carry In)",
            "cpu": "Intel® Core™ i5-12500H Processor (12 Cores)",
            "gpu": "NVIDIA GEFORCE RTX 3050 4GB",
            "display": "15.6\" FHD 144Hz Wide View Angle Display (1920 x 1080)",
            "ram": "8GB DDR4 3200 MHz (8 x 1)",
            "thermal_compound": "NVIDIA GEFORCE RTX 3050 4GB",
            "keyboard": "RGB Tactile Hybrid Silent Keyboard with 15 Color Options (Single Zone)",
            "ssd": "512GB Samsung PM991 NVME SSD",
            "wireless_lan": "INTEL AX201 + Bluetooth (Wi-Fi 6)",
            "os": "None",
            "dead_pixel_policy": "None",
            "professional_color_calibration": "COMZONE Color Calibration Service"
        };
        let cart = [laptopConfiguration, 1, 1425];
        console.log(cart);

        userCart.push(cart);
        console.log(userCart);
        localStorage.setItem("userCart", JSON.stringify(userCart));
        window.location.assign("cart.html");
    });
});