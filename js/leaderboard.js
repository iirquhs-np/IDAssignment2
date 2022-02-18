// INITIALISE CONSTANTS
// const userAccount = localStorage.getItem("userAccount"); // TO TRACK OWN REWARDS
const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";

$(document).ready(function () {
    ajaxFuncGET().done(function (response) {
        let content = "";

        let leaderboardArray = [];
        for (let i = 0; i < response.length; i++) {
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
            let rankIcon = "";
            let name = leaderboardArray[i].name;
            let points = leaderboardArray[i].points;
            
            if (i == 0) {
                rankIcon = "<img src=\"assets/img/rewards/leaderboard-first.png\"/>"
            }
            else if (i == 1) {
                rankIcon = "<img src=\"assets/img/rewards/leaderboard-second.png\"/>"
            }
            else if (i == 2) {
                rankIcon = "<img src=\"assets/img/rewards/leaderboard-third.png\"/>"
            }
            else {
                rankIcon = i+1;
            }

            content = `${content}
                            <tr id='${id}'>
                                <td class="text-center" style="width: 50px;">${rankIcon}</td>
                                <td class="align-middle">${name}</td>
                                <td>${points} <img src="assets/img/rewards/ang-bao.png" width="35px" height="35px"></td>
                            </tr>`
        }

        $("#leaderboard tbody").html(content);
        $("#spinner").hide();
        $("#leaderboard").show();
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