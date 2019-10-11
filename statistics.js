var statistics = {
  numofDemocrates: 0,
  numofRepublicans: 0,
  numofIndependants: 0,
  totalNums: 0,

  votesofDemocrates: 0,
  votesofRepublicans: 0,
  votesofIndependants: 0,
  totalVotes: 0
};

var members = data.results[0].members;

function getNum() {
  var tbody = document.getElementById("glance");

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

  statistics.votesofDemocrates = voteD / numD;
  statistics.votesofRepublicans = voteR / numR;
  statistics.votesofIndependants = voteI / numI;

  statistics.totalNums = numD + numR + numI;
  statistics.totalVotes = (voteD + voteR + voteI) / statistics.totalNums;

  statistics.votesofDemocrates =
    Math.floor(statistics.votesofDemocrates * 100) / 100; //takes the long number and shortend it to 2 num after komma
  statistics.votesofRepublicans =
    Math.floor(statistics.votesofRepublicans * 100) / 100;
  statistics.votesofIndependants =
    Math.floor(statistics.votesofIndependants * 100) / 100;
  statistics.totalVotes = Math.floor(statistics.totalVotes);
  //   console.log(statistics.votesofDemocrates);
  //   console.log(statistics);

  var rowD = document.createElement("tr"); //creates the row
  var colnamD = document.createElement("td"); //creates the cell in row
  var colnumD = document.createElement("td"); //..
  var colvotD = document.createElement("td"); //..
  colnamD.innerHTML = "Democrates"; //names the first cell
  colnumD.innerHTML = statistics.numofDemocrates; //puts value in the second cell
  colvotD.innerHTML = statistics.votesofDemocrates; //puts value in the third cell
  rowD.appendChild(colnamD); //says that first cell belongs to first row
  rowD.appendChild(colnumD); //says that second cell belongs to first row
  rowD.appendChild(colvotD); //says that third cell belongs to first row
  tbody.appendChild(rowD); //says that first row belongs to tbody element with the id above listed

//   console.log(rowD);

  var rowR = document.createElement("tr");
  var colnamR = document.createElement("td");
  var colnumR = document.createElement("td");
  var colvotR = document.createElement("td");
  colnamR.innerHTML = "Republicans";
  colnumR.innerHTML = statistics.numofRepublicans;
  colvotR.innerHTML = statistics.votesofRepublicans;
  rowR.appendChild(colnamR);
  rowR.appendChild(colnumR);
  rowR.appendChild(colvotR);
  tbody.appendChild(rowR);

  var rowI = document.createElement("tr");
  var colnamI = document.createElement("td");
  var colnumI = document.createElement("td");
  var colvotI = document.createElement("td");
  colnamI.innerHTML = "Independance";
  colnumI.innerHTML = statistics.numofIndependants;
  colvotI.innerHTML = statistics.votesofIndependants;
  rowI.appendChild(colnamI);
  rowI.appendChild(colnumI);
  rowI.appendChild(colvotI);
  tbody.appendChild(rowI);

  var rowT = document.createElement("tr");
  var colnamT = document.createElement("td");
  var colnumT = document.createElement("td");
  var colvotT = document.createElement("td");
  colnamT.innerHTML = "Total";
  colnumT.innerHTML = statistics.totalNums;
  colvotT.innerHTML = statistics.totalVotes;
  rowT.appendChild(colnamT);
  rowT.appendChild(colnumT);
  rowT.appendChild(colvotT);
  tbody.appendChild(rowT);
}
getNum();

var dataVotes = [];

function getPercentage() {
  for (var i = 0; i < members.length; i++) {
    dataVotes.push({
      fullName:
        members[i].last_name +
          "," +
          members[i].first_name +
          " " +
          members[i].middle_name || "",
      numMissedVotes: members[i].missed_votes,
      perMissedVotes: members[i].missed_votes_pct
    });
  }
  dataVotes.sort(function(a, b) {
    return a.value - b.value;
  });
  console.log(dataVotes);
}
getPercentage();
