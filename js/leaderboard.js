// INITIALISE CONSTANTS
// const userAccount = localStorage.getItem("userAccount"); // TO TRACK OWN REWARDS
const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";

$(document).ready(function () {
    ajaxFuncGET().done(function (response) {
        let content = "";


        let leaderboardArray = [];
        for (let i = 0; i < response.length && i < 10; i++) {
            let fullName = response[i].firstName + ' ' + response[i].lastName;

            leaderboardArray[i] = {
                id: response[i]._id,
                name: fullName,
                points: response[i].points
            }
        }

        leaderboardArray.sort(function (a, b) {return b.points - a.points})

        for (let i = 0; i < leaderboardArray.length && i < 10; i++) {
            let id = leaderboardArray[i].id;
            let name = leaderboardArray[i].name;
            let points = leaderboardArray[i].points;

            content = `${content}
                            <tr id='${id}'>
                                <td>${name}</td>
                                <td>${points}</td>`
        }

        $("#leaderboard tbody").html(content);
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