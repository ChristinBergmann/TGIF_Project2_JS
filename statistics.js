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
// var bla = [];
let members = data.results[0].members;
let neededDataList = [];
console.log(members);

function getDataGlance() {
  var tbody = document.getElementById("glance");
  numD = 0;
  numR = 0;
  numI = 0;
  voteD = 0;
  voteR = 0;
  voteI = 0;

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
  colnamD = document.createElement("td"); //creates the cell in row
  colnumD = document.createElement("td"); //..
  colvotD = document.createElement("td"); //..
  colnamD.innerHTML = "Democrates"; //names the first cell
  colnumD.innerHTML = statistics.numofDemocrates; //puts value in the second cell
  colvotD.innerHTML = statistics.votesofDemocrates; //puts value in the third cell
  rowD.appendChild(colnamD); //says that first cell belongs to first row
  rowD.appendChild(colnumD); //says that second cell belongs to first row
  rowD.appendChild(colvotD); //says that third cell belongs to first row
  tbody.appendChild(rowD); //says that first row belongs to tbody element with the id above listed

  //   console.log(rowD);

  var rowR = document.createElement("tr");
  colnamR = document.createElement("td");
  colnumR = document.createElement("td");
  colvotR = document.createElement("td");
  colnamR.innerHTML = "Republicans";
  colnumR.innerHTML = statistics.numofRepublicans;
  colvotR.innerHTML = statistics.votesofRepublicans;
  rowR.appendChild(colnamR);
  rowR.appendChild(colnumR);
  rowR.appendChild(colvotR);
  tbody.appendChild(rowR);

  var rowI = document.createElement("tr");
  colnamI = document.createElement("td");
  colnumI = document.createElement("td");
  colvotI = document.createElement("td");
  colnamI.innerHTML = "Independance";
  colnumI.innerHTML = statistics.numofIndependants;
  colvotI.innerHTML = statistics.votesofIndependants;
  rowI.appendChild(colnamI);
  rowI.appendChild(colnumI);
  rowI.appendChild(colvotI);
  tbody.appendChild(rowI);

  var rowT = document.createElement("tr");
  colnamT = document.createElement("td");
  colnumT = document.createElement("td");
  colvotT = document.createElement("td");
  colnamT.innerHTML = "Total";
  colnumT.innerHTML = statistics.totalNums;
  colvotT.innerHTML = statistics.totalVotes;
  rowT.appendChild(colnamT);
  rowT.appendChild(colnumT);
  rowT.appendChild(colvotT);
  tbody.appendChild(rowT);
}
getDataGlance();

// LEAST ATTENDANCE
getData(
  "leastEngaged",
  neededDataList,
  "fullName",
  "numMissedVotes",
  "perMissedVotes"
);
// MOST ATTENDANCE
getData(
  "mostEngaged",
  neededDataList,
  "fullName",
  "numMissedVotes",
  "perMissedVotes"
);
// LEAST LOYAL
getData(
  "leastEngagedLoyal",
  neededDataList,
  "fullName",
  "numTotalVotes",
  "perPartyVotes"
);
// MOST LOYAL
getData(
  "mostEngagedLoyal",
  neededDataList,
  "fullName",
  "numTotalVotes",
  "perPartyVotes"
);
function getData(tableID, arrInput, valuekey1, valuekey2, valuekey3) {
  console.log("getData started");

  if (document.getElementById(tableID) !== null) {
    const fullDataList = [];
    arrInput = [];

    for (var i = 0; i < members.length; i++) {
      if (members[i].middle_name === null) {
        members[i].middle_name = " ";
      }
      fullDataList.push({
        fullName:
          members[i].last_name +
            "," +
            members[i].first_name +
            " " +
            members[i].middle_name || " ",
        numMissedVotes: members[i].missed_votes,
        perMissedVotes: members[i].missed_votes_pct,
        numTotalVotes: Math.round(
          (members[i].total_votes - members[i].missed_votes) /
            (members[i].votes_with_party_pct / 100)
        ),
        perPartyVotes: members[i].votes_with_party_pct
      });
    }

    let sortedList = sortingOrder(tableID, fullDataList, valuekey3); //using the func outside to sort in ascending order with duplic.
    let length = getLenghtbyKey(fullDataList, valuekey3); //(key is proberty=same thing) using the func to get the length without the duplic.
    console.log("cleanedup Length" + length);

    for (var i = 0; i < sortedList.length; i++) {
      console.log(sortedList[i]);

      // var grenze = length *0.1
      if (i < length * 0.1) {
        arrInput.push(sortedList[i]);
      } else if (i === length * 0.1) {
        sortedList[i][valuekey3] === sortedList[i - 1][valuekey3];
        arrInput.push(sortedList[i]); // TAKES JUST THE NUMS I NEED of the 10% plus the ones with same value of the last!!!!
      }
    }
  }
  console.log(arrInput);
  buildTable(tableID, arrInput, valuekey1, valuekey2, valuekey3);
  console.log("getData ended");
}

//!! GENERATED FUNC TO SORT by Ascendance !! //    // sorts highest to lowest num/value

function sortingOrder(tableID, arrInput, valuekey3) {
  console.log("sorting Order started");

  var resultSort = arrInput.sort(function(x, y) {
    if (tableID === "leastEngaged" || tableID === "mostEngagedLoyal") {
      return y[valuekey3] - x[valuekey3];
    } else {
      return x[valuekey3] - y[valuekey3];
    }
  });

  console.log("sorting Order ended");
  return resultSort;
}

function getLenghtbyKey(arrInput, valuekey3) {
  console.log("getting length num by the key started");

  var valueNum = [];
  for (var i = 0; i < arrInput.length; i++) {
    console.log(arrInput[i][valuekey3]);
    if (valueNum.length === 0) {
      valueNum.push(arrInput[i][valuekey3]);
    } else if (!valueNum.includes(arrInput[i][valuekey3])) {
      valueNum.push(arrInput[i][valuekey3]);
    }
  }
  console.log("getting length num by the key ended");
  return valueNum.length;
}

//¡¡¡ CREATING THE TABLE ¡¡¡//

function buildTable(tableID, arrInput, valuekey1, valuekey2, valuekey3) {
  console.log("build Table started");

  var tbody = document.getElementById(tableID);
  for (var i = 0; i < arrInput.length; i++) {
    row = document.createElement("tr");
    col1 = document.createElement("td");
    col2 = document.createElement("td");
    col3 = document.createElement("td");

    col1.innerHTML = arrInput[i][valuekey1];
    col2.innerHTML = arrInput[i][valuekey2];
    col3.innerHTML = arrInput[i][valuekey3];

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    tbody.appendChild(row);
  }
  console.log("build Table ended");
  console.log();
}
