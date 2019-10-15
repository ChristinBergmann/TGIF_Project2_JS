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
console.log(members);

// function getNum() {
//   var tbody = document.getElementById("glance");

//   var numD = 0;
//   var numR = 0;
//   var numI = 0;

//   var voteD = 0;
//   var voteR = 0;
//   var voteI = 0;

//   for (var i = 0; i < members.length; i++) {
//     if (members[i].party === "D") {
//       numD++;
//       voteD += members[i].votes_with_party_pct;
//     }
//     if (members[i].party === "R") {
//       numR++;
//       voteR += members[i].votes_with_party_pct;
//     }
//     if (members[i].party === "I") {
//       numI++;
//       voteI += members[i].votes_with_party_pct;
//     }
//   }

//   statistics.numofDemocrates = numD;
//   statistics.numofRepublicans = numR;
//   statistics.numofIndependants = numI;

//   statistics.votesofDemocrates = voteD / numD;
//   statistics.votesofRepublicans = voteR / numR;
//   statistics.votesofIndependants = voteI / numI;

//   statistics.totalNums = numD + numR + numI;
//   statistics.totalVotes = (voteD + voteR + voteI) / statistics.totalNums;

//   statistics.votesofDemocrates =
//     Math.floor(statistics.votesofDemocrates * 100) / 100; //takes the long number and shortend it to 2 num after komma
//   statistics.votesofRepublicans =
//     Math.floor(statistics.votesofRepublicans * 100) / 100;
//   statistics.votesofIndependants =
//     Math.floor(statistics.votesofIndependants * 100) / 100;
//   statistics.totalVotes = Math.floor(statistics.totalVotes);
//   //   console.log(statistics.votesofDemocrates);
//   //   console.log(statistics);

//   var rowD = document.createElement("tr"); //creates the row
//   var colnamD = document.createElement("td"); //creates the cell in row
//   var colnumD = document.createElement("td"); //..
//   var colvotD = document.createElement("td"); //..
//   colnamD.innerHTML = "Democrates"; //names the first cell
//   colnumD.innerHTML = statistics.numofDemocrates; //puts value in the second cell
//   colvotD.innerHTML = statistics.votesofDemocrates; //puts value in the third cell
//   rowD.appendChild(colnamD); //says that first cell belongs to first row
//   rowD.appendChild(colnumD); //says that second cell belongs to first row
//   rowD.appendChild(colvotD); //says that third cell belongs to first row
//   tbody.appendChild(rowD); //says that first row belongs to tbody element with the id above listed

//   //   console.log(rowD);

//   var rowR = document.createElement("tr");
//   var colnamR = document.createElement("td");
//   var colnumR = document.createElement("td");
//   var colvotR = document.createElement("td");
//   colnamR.innerHTML = "Republicans";
//   colnumR.innerHTML = statistics.numofRepublicans;
//   colvotR.innerHTML = statistics.votesofRepublicans;
//   rowR.appendChild(colnamR);
//   rowR.appendChild(colnumR);
//   rowR.appendChild(colvotR);
//   tbody.appendChild(rowR);

//   var rowI = document.createElement("tr");
//   var colnamI = document.createElement("td");
//   var colnumI = document.createElement("td");
//   var colvotI = document.createElement("td");
//   colnamI.innerHTML = "Independance";
//   colnumI.innerHTML = statistics.numofIndependants;
//   colvotI.innerHTML = statistics.votesofIndependants;
//   rowI.appendChild(colnamI);
//   rowI.appendChild(colnumI);
//   rowI.appendChild(colvotI);
//   tbody.appendChild(rowI);

//   var rowT = document.createElement("tr");
//   var colnamT = document.createElement("td");
//   var colnumT = document.createElement("td");
//   var colvotT = document.createElement("td");
//   colnamT.innerHTML = "Total";
//   colnumT.innerHTML = statistics.totalNums;
//   colvotT.innerHTML = statistics.totalVotes;
//   rowT.appendChild(colnamT);
//   rowT.appendChild(colnumT);
//   rowT.appendChild(colvotT);
//   tbody.appendChild(rowT);
// }
// getNum();


// //¡¡¡¡ LEAST  VOTING  CALC by MissedVotes ¡¡¡¡¡¡¡//

// function getPercentage1() {
//   var tbody = document.getElementById("leastEngaged");

//   var leastData = [];
//   var cutLeastData = [];
//   var resultsData = [];

//   // least
//   // var sort = "least";
//   // most
//   // var sort = "most";

//   //¡¡¡¡¡ GETTING ONLY THE PROPERTIES/DATA I WILL NEED IN A NEW ARRAY/OBJ ¡¡¡¡¡¡¡//
//   // !!!!!! FOR USING THIS ON BOTH USE NEUTRAL NAMES -NO LEAST NOR MOST!!!!! //

//   for (var i = 0; i < members.length; i++) {
//     if (members[i].middle_name === null) {
//       members[i].middle_name = " ";
//     };
//     leastData.push({
//       fullName: members[i].last_name +
//         "," +
//         members[i].first_name +
//         " " +
//         members[i].middle_name || " ",
//       numMissedVotes: members[i].missed_votes,
//       perMissedVotes: members[i].missed_votes_pct
//     });
//   }
//   // console.log(newData);

//   leastData.sort(function (x, y) {
//     // if (sort == least) {
//     return y.perMissedVotes - x.perMissedVotes; //sorts double nums out
//     // } else if (sort == most) {
//     //   return x.perMissedVotes - y.perMissedVotes;
//     // });
//   });

//   for (var i = 0; i < leastData.length - 1; i += 1) {
//     if (leastData[i].perMissedVotes != leastData[i + 1].perMissedVotes) { //runs through my out-sorted leastData and pushes highest to lowest in cutnewData//
//       cutLeastData.push(leastData[i].perMissedVotes); //and pushes highest to highest in cutMostData
//     }
//   }
//   console.log(cutLeastData);
//   // console.log(newData.length)

//   for (var i = 0; i < leastData.length; i++) {
//     if (leastData[i].perMissedVotes >= cutLeastData[9]) { //runs again through my sorted newData and
//       resultsData.push(leastData[i]); //only pushes higher num than my 10TH in arr into resultsnewData
//     }
//   }
//   console.log(resultsData);
//   // console.log(tbody)

//   //¡¡¡ CREATING THE TABLE ¡¡¡//

//   function buildTable1() {

//     for (var i = 0; i < resultsData.length; i++) {

//       var row = document.createElement("tr");
//       var col1 = document.createElement("td");
//       var col2 = document.createElement("td");
//       var col3 = document.createElement("td");

//       col1.innerHTML = resultsData[i].fullName;
//       col2.innerHTML = resultsData[i].numMissedVotes;
//       col3.innerHTML = resultsData[i].perMissedVotes;

//       row.appendChild(col1);
//       row.appendChild(col2);
//       row.appendChild(col3);
//       tbody.appendChild(row);
//     }
//     console.log(row);
//   }
//   buildTable1();
// }

// // console.log();
// getPercentage1();



// // ¡¡¡¡¡ MOST VOTING CALC By MISSEDVOTES ¡¡¡¡¡ //

// function getPercentage2() {
//   var tbody = document.getElementById("mostEngaged");

//   var leastData = [];
//   var cutMostData = [];
//   var resultsData = [];

//   // least
//   // var sort = "least";
//   // most
//   // var sort = "most";

//   //¡¡¡¡¡ GETTING ONLY THE PROPERTIES/DATA I WILL NEED IN A NEW ARRAY/OBJ ¡¡¡¡¡¡¡//
//   // !!!!!! FOR USING THIS ON BOTH USE NEUTRAL NAMES -NO LEAST NOR MOST!!!!! //

//   for (var i = 0; i < members.length; i++) {
//     if (members[i].middle_name === null) {
//       members[i].middle_name = " ";
//     };
//     leastData.push({
//       fullName: members[i].last_name +
//         "," +
//         members[i].first_name +
//         " " +
//         members[i].middle_name || " ",
//       numMissedVotes: members[i].missed_votes,
//       perMissedVotes: members[i].missed_votes_pct
//     });
//   }
//   // console.log(newData);

//   leastData.sort(function (x, y) {
//     // if (sort == least) {
//     return x.perMissedVotes - y.perMissedVotes; //sorts double nums out
//     // } else if (sort == most) {
//     //   return x.perMissedVotes - y.perMissedVotes;
//     // });
//   });

//   for (var i = 0; i < leastData.length - 1; i += 1) {
//     if (leastData[i].perMissedVotes != leastData[i + 1].perMissedVotes) { //runs through my out-sorted leastData and pushes highest to lowest in cutnewData//
//       cutMostData.push(leastData[i].perMissedVotes); //and pushes highest to highest in cutMostData
//     }
//   }
//   console.log(cutMostData);
//   // console.log(newData.length)

//   for (var i = 0; i < leastData.length; i++) {
//     if (leastData[i].perMissedVotes >= cutMostData[9]) { //runs again through my sorted newData and
//       resultsData.push(leastData[i]); //only pushes higher num than my 10TH in arr into resultsnewData
//     }
//   }
//   console.log(resultsData);
//   // console.log(tbody)

//   //¡¡¡ CREATING THE TABLE ¡¡¡//

//   function buildTable2() {

//     for (var i = 0; i < resultsData.length; i++) {

//       var row = document.createElement("tr");
//       var col1 = document.createElement("td");
//       var col2 = document.createElement("td");
//       var col3 = document.createElement("td");

//       col1.innerHTML = resultsData[i].fullName;
//       col2.innerHTML = resultsData[i].numMissedVotes;
//       col3.innerHTML = resultsData[i].perMissedVotes;

//       row.appendChild(col1);
//       row.appendChild(col2);
//       row.appendChild(col3);
//       tbody.appendChild(row);
//     }
//     console.log(row);
//   }
//   buildTable2();
// }

// console.log();
// getPercentage2();





///// ¡¡¡¡¡  LOYALTY PAGE ¡¡¡¡¡ ////////


function getPercentage3() {
  var tbody = document.getElementById("leastEngagedLoyal");

  var leastDataLoyal = [];
  var cutLeastDataLoyal = [];
  var resultsDataLoyal = [];

  // least
  // var sort = "least";
  // most
  // var sort = "most";

  //¡¡¡¡¡ GETTING ONLY THE PROPERTIES/DATA I WILL NEED IN A NEW ARRAY/OBJ ¡¡¡¡¡¡¡//
  // !!!!!! FOR USING THIS ON BOTH USE NEUTRAL NAMES -NO LEAST NOR MOST!!!!! //

  for (var i = 0; i < members.length; i++) {
    if (members[i].middle_name === null) {
      members[i].middle_name = " ";
    };
    leastDataLoyal.push({
      fullName: members[i].last_name +
        "," +
        members[i].first_name +
        " " +
        members[i].middle_name || " ",
      numTotalVotes: members[i].total_votes,
      numMissedVotes: members[i].missed_votes,
      perPartyVotes: members[i].votes_with_party_pct
    });
  }
  console.log(leastDataLoyal);

  //   leastDataLoyal.sort(function (x, y) {
  //     return y.total_votes - x.total_votes; //sorts double nums out
  //     ;
  //   });

  //   for (var i = 0; i < leastDataLoyal.length - 1; i += 1) {
  //     if (leastData[i].perMissedVotes != leastDataLoyal[i + 1].perMissedVotes) { //runs through my out-sorted leastData and pushes highest to lowest in cutnewData//
  //       cutLeastDataLoyal.push(leastDataLoyal[i].perMissedVotes); //and pushes highest to highest in cutMostData
  //     }
  //   }
  //   console.log(cutLeastDataLoyal);
  //   // console.log(newData.length)

  //   for (var i = 0; i < leastDataLoyal.length; i++) {
  //     if (leastDataLoyal[i].perMissedVotes >= cutLeastDataLoyal[9]) { //runs again through my sorted newData and
  //       resultsData.push(leastDataLoyal[i]); //only pushes higher num than my 10TH in arr into resultsnewData
  //     }
  //   }
  //   console.log(resultsData);
  //   // console.log(tbody)

  //   //¡¡¡ CREATING THE TABLE ¡¡¡//

  //   function buildTable3() {

  //     for (var i = 0; i < resultsData.length; i++) {

  //       var row = document.createElement("tr");
  //       var col1 = document.createElement("td");
  //       var col2 = document.createElement("td");
  //       var col3 = document.createElement("td");

  //       col1.innerHTML = resultsData[i].fullName;
  //       col2.innerHTML = resultsData[i].numMissedVotes;
  //       col3.innerHTML = resultsData[i].perMissedVotes;

  //       row.appendChild(col1);
  //       row.appendChild(col2);
  //       row.appendChild(col3);
  //       tbody.appendChild(row);
  //     }
  //     console.log(row);
  //   }
  //   buildTable3();
  // }
  // // console.log();
  // getPercentage3();