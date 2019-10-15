var lastname = Meier,
  Thun,
  Bauer;
var firstname = Sue,
  Rolf,
  Ben;
var middlename = May,
  Nino;
var fullname = name.lastname[i] + name.firstname[i] + name.middlename[i];

console.log(fullname[1]);

// // var name = function(fullname)
// var glance = "glance";
// leastTab = "leastEngaged";
// mostTab = "mostEngaged";
// leastLoyal = "leastEngagedLoyal";
// mostLoyal = "mostEngagedLoyal";
// newData = [];
// // newSortData = [];
// cutNewData = [];
// resultsData = [];
// lowAttendance = [];
// highAttendance = [];
// lowLoyalty = [];
// highLoyalty = [];

// // least
// // var sort = "least";
// // most
// // var sort = "most";

// //¡¡¡¡¡ GETTING ONLY THE PROPERTIES/DATA I WILL NEED IN A NEW ARRAY/OBJ ¡¡¡¡¡¡¡//
// // !!!!!! FOR USING THIS ON BOTH USE NEUTRAL NAMES -NO LEAST NOR MOST!!!!! //
// function getDataArray(arrObject) {
//   for (var i = 0; i < members.length; i++) {
//     if (members[i].middle_name === null) {
//       members[i].middle_name = " ";
//     }
//     arrObject.push({
//       fullName: members[i].last_name +
//         "," +
//         members[i].first_name +
//         " " +
//         members[i].middle_name || " ",
//       numMissedVotes: members[i].missed_votes,
//       perMissedVotes: members[i].missed_votes_pct
//     });
//   }
//   console.log("GetData Erfolg");
// }
// getDataArray(newData);

// function doublesOut(arrObject, keyvalueA, keyvalueB) {
//   arrObject.sort(function (x, y) {
//     return y[keyvalueA] - x[keyvalueB]; //sorts double nums out
//   });
//   // console.log(newData);
// }
// doublesOut(newData, newData[i].numMissedVotes, newData[i].perMissedVotes);

// function sortArray(sortierungNach, cutNewData) {
//   for (var i = 0; i < newData.length - 1; i += 1) {
//     if (newData[i].sortierungNach != newData[i + 1].sortierungNach) {
//       //runs through my out-sorted newData and pushes highest to lowest in cutnewData//
//       cutNewData.push(newData[i].sortierungNach); //and pushes highest to lowest in cutnewData
//     }
//   }
//   console.log(cutNewData);
//   // console.log(cutNewData.length)
// }
// sortArray(cutNewData);

// function cutsOff(cuttingoff, resultsData) {
//   for (var i = 0; i < cutNewData.length; i++) {
//     if (cutNewData[i].cuttingoff >= cutnewData[9]) {
//       //runs again through my sorted newData and
//       resultsData.push(cutNewData[i]); //only pushes higher num than my 10TH in arr into resultsnewData
//     }
//   }
//   console.log(resultsData);
//   // console.log(tbody)
// }
// cutsOff();

// //¡¡¡ CREATING THE TABLE ¡¡¡//

// function buildTable() {
//   for (var i = 0; i < resultsData.length; i++) {
//     var row = document.createElement("tr");
//     var col1 = document.createElement("td");
//     var col2 = document.createElement("td");
//     var col3 = document.createElement("td");

//     col1.innerHTML = resultsData[i].fullName;
//     col2.innerHTML = resultsData[i].numMissedVotes;
//     col3.innerHTML = resultsData[i].perMissedVotes;

//     row.appendChild(col1);
//     row.appendChild(col2);
//     row.appendChild(col3);
//     tbody.appendChild(row);
//   }
//   console.log(row);
// }
// buildTable();