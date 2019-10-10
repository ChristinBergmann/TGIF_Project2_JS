var statistics = {

    numofDemocrates: 0,
    numofRepublicans: 0,
    numofIndependants: 0,
    totalNums: 0,

    votesofDemocrates: 0,
    votesofRepublicans: 0,
    votesofIndependants: 0,
    totalVotes: 0,

}

function getNum() {
    var table = document.getElementById("glance");

    var numD = 0;
    var numR = 0;
    var numI = 0;

    var voteD = 0;
    var voteR = 0;
    var voteI = 0;

    for (var i = 0; i < members.length; i++) {
        if (members[i].party === "D") {
            numD++;
            voteD += members[i].votes_with_party_pct;
        }
        if (members[i].party === "R") {
            numR++;
            voteR += members[i].votes_with_party_pct;
        }
        if (members[i].party === "I") {
            numI++;
            voteI += members[i].votes_with_party_pct;

        }
    }

    statistics.numofDemocrates = numD;
    statistics.numofRepublicans = numR;
    statistics.numofIndependants = numI;

    statistics.votesofDemocrates = (voteD / numD);
    statistics.votesofRepublicans = (voteR / numR);
    statistics.votesofIndependants = (voteI / numI);

    statistics.totalNums = numD + numR + numI;

    statistics.totalVotes = (voteD + voteR + voteI) / (statistics.totalNums);

    console.log(statistics);

}
getNum();

var dataVotes = [];

function getPercentage() {
    for (var x = 0; x < members.length; x++) {
        dataVotes.push({

            }

        )

    }



}