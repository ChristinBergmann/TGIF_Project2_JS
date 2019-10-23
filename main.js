let data_option = "";
//---- says when is which DATA to be used
if (document.title === "Senate TGIF" || document.title === "Attendance Senate" || document.title === "Loyalty Senate") {
  data_option = "Senate"
} else {
  data_option = "House"
};


fetch(
    `https://api.propublica.org/congress/v1/115/${data_option}/members.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "cKCio6OjfIRULirFLcBo3ZLp18UOKqZevqv2ePK4"
      }
    })
  .then(response => {
    // console.log(response)
    return response.json()
  })
  .then(data => {
    let members = data.results[0].members;
    console.log(data)

    if (document.title === "Senate TGIF" || document.title === "House TGIF") {
      getData(
        "senate-data",
        fullDataList,
        "fullName",
        "party",
        "state",
        "seniority",
        "votes",
        members
      );
      fillDropdownList();
      createEventListener(members);

    } else {
      getDataGlance(
        members);

      // LEAST ATTENDANCE
      getData2(
        "leastEngaged",
        neededDataList,
        "fullName",
        "numMissedVotes",
        "perMissedVotes",
        members
      );
      // MOST ATTENDANCE
      getData2(
        "mostEngaged",
        neededDataList,
        "fullName",
        "numMissedVotes",
        "perMissedVotes",
        members
      );
      // LEAST LOYAL
      getData2(
        "leastEngagedLoyal",
        neededDataList,
        "fullName",
        "numTotalVotes",
        "perPartyVotes",
        members
      );
      // MOST LOYAL
      getData2(
        "mostEngagedLoyal",
        neededDataList,
        "fullName",
        "numTotalVotes",
        "perPartyVotes",
        members
      );
    }

  })

let fullDataList = [];
let allMemberStateList = [];
// console.log(allMemberStateList)


//------- GLANCE TABLE---------//

function getData(
  tableID,
  arrInput,
  valuekey1,
  valuekey2,
  valuekey3,
  valuekey4,
  valuekey5,
  members
) {

  for (var i = 0; i < members.length; i++) {
    if (document.getElementById(tableID) !== null) {
      for (var i = 0; i < members.length; i++) {
        if (members[i].middle_name === null) {
          members[i].middle_name = " ";
        }
        fullDataList.push({
          fullName: members[i].last_name +
            "," +
            members[i].first_name +
            " " +
            members[i].middle_name || " ",
          party: members[i].party,
          state: members[i].state,
          seniority: members[i].seniority,
          votes: members[i].votes_with_party_pct
        });
      }
      for (var i = 0; i < members.length; i++) {
        if (allMemberStateList.length === 0) {
          allMemberStateList.push(members[i].state);
        } else if (!allMemberStateList.includes(members[i].state)) {
          allMemberStateList.push(members[i].state);
        }
      }
      allMemberStateList.sort(allMemberStateList.state);
      // console.log(allMemberStateList);
    }
    console.log(allMemberStateList)
    buildTable(
      tableID,
      arrInput,
      valuekey1,
      valuekey2,
      valuekey3,
      valuekey4,
      valuekey5
    );
  }
}

function buildTable(
  tableID,
  arrInput,
  valuekey1,
  valuekey2,
  valuekey3,
  valuekey4,
  valuekey5
) {
  // console.log("build Table started");
  // console.log(fullDataList)

  const tbody = document.getElementById(tableID);

  for (var i = 0; i < arrInput.length; i++) {
    row = document.createElement("tr");
    col1 = document.createElement("td");
    col2 = document.createElement("td");
    col3 = document.createElement("td");
    col4 = document.createElement("td");
    col5 = document.createElement("td");

    col1.innerHTML = arrInput[i][valuekey1];
    col2.innerHTML = arrInput[i][valuekey2];
    col3.innerHTML = arrInput[i][valuekey3];
    col4.innerHTML = arrInput[i][valuekey4];
    col5.innerHTML = arrInput[i][valuekey5];

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    tbody.appendChild(row);
  }
}

//----------------FILLS STATES IN DROPODOWN MENU-------------------//

function fillDropdownList() {

  for (var i = 0; i < allMemberStateList.length; i++) {
    // console.log(allMemberStateList.length)
    const select = document.getElementById("state-drop");
    // console.log(select);
    const option = document.createElement("option");
    // console.log(option);
    option.class = "state"
    option.name = "state"
    option.value = allMemberStateList[i];
    console.log(option);
    option.innerHTML = allMemberStateList[i];
    select.appendChild(option);
  }
}


//---------------------------------adds EVENTLISTENER + should change table when selected------------------------------------------//

function createEventListener(members) {

  document.querySelectorAll("input[name=party]").forEach(node => {
    node.addEventListener("change", () => {
      console.log("Hallo");
      filterTable(members);
    });
  });
  document.querySelectorAll("option").forEach(node => {
    node.addEventListener("click", () => {
      filterTable(members);
    });
  });
  console.log(document.querySelectorAll("option"))
}

//--------------------------FILTERS/CHANGES THE SENATORS TABLE when SELECTED (CLEARS ALSO ALWAYS IN THE BEGINNING)-----------------//

function filterTable(members) {
  console.log("______FILTER____")
  document.getElementById("senate-data").innerHTML = "";

  //----checked---CheckboxesParty:
  const checkedBoxes = Array.from(
    document.querySelectorAll("input[name=party]:checked")
  );
  const checkedBoxesValues = checkedBoxes.map(node => node.value);
  console.log(checkedBoxesValues);
  //----selected---StateFilter:
  const selectedState = Array.from(
    document.querySelectorAll("option:checked")
  );
  const selectedStateValue = selectedState.map(node => node.value);
  console.log(selectedStateValue);


  //---------------------update Table via set Filters--------------------//

  const filteredMembersList = [];

  for (var i = 0; i < fullDataList.length; i++) {
    if (checkedBoxesValues.length === 0 && selectedStateValue.length === 0) {
      filteredMembersList.push(fullDataList[i])
    }
    if (checkedBoxesValues.length === 0 && selectedStateValue.length > 0 && selectedStateValue.includes(fullDataList[i].state)) {
      filteredMembersList.push(fullDataList[i])
    }
    if (checkedBoxesValues.length > 0 && checkedBoxesValues.includes(fullDataList[i].party) && selectedState.length === 0) {
      filteredMembersList.push(fullDataList[i])
    }
    if (checkedBoxesValues.length > 0 && checkedBoxesValues.includes(fullDataList[i].party) && selectedStateValue.length > 0 && selectedStateValue.includes(fullDataList[i].state)) {
      filteredMembersList.push(fullDataList[i])
    }
  }

  fullDataList = [];

  getData(
    "senate-data",
    filteredMembersList,
    "fullName",
    "party",
    "state",
    "seniority",
    "votes",
    members
  );
}


//--------------!!!!!-------------!!!!---TRANSFERED STATISTIC JS---!!!!---------------!!!!!!----------------//


let statistics = {
  numofDemocrates: 0,
  numofRepublicans: 0,
  numofIndependants: 0,
  totalNums: 0,

  votesofDemocrates: 0,
  votesofRepublicans: 0,
  votesofIndependants: 0,
  totalVotes: 0
};

function getDataGlance(members) {
  var tbody = document.getElementById("glance");
  numD = 0;
  numR = 0;
  numI = 0;
  voteD = 0;
  voteR = 0;
  voteI = 0;

  for (var i = 0; i < members.length; i++) {
    if (members[i].party === "D" && members[i].votes_with_party_pct >= 0) {
      numD++;
      voteD += members[i].votes_with_party_pct;
    }
    if (members[i].party === "R" && members[i].votes_with_party_pct >= 0) {
      numR++;
      voteR += members[i].votes_with_party_pct;
    }
    if (members[i].party === "I" && members[i].votes_with_party_pct >= 0) {
      numI++;
      voteI += members[i].votes_with_party_pct;
    }
  }

  statistics.numofDemocrates = numD;
  statistics.numofRepublicans = numR;
  statistics.numofIndependants = numI;

  statistics.votesofDemocrates = voteD / numD;
  statistics.votesofRepublicans = voteR / numR;

  if (voteI > 0 && numI > 0) {
    statistics.votesofIndependants = voteI / numI
  };

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
  rowD.appendChild(colnumD); //..second
  rowD.appendChild(colvotD); //..
  tbody.appendChild(rowD); //says that first row belongs to tbody element with the id above listed

  console.log(rowD);

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

let neededDataList = [];

function getData2(tableID, arrInput, valuekey1, valuekey2, valuekey3, members) {
  console.log("getData started");

  if (document.getElementById(tableID) !== null) {
    const fullDataList = [];
    neededDataList = [];

    for (var i = 0; i < members.length; i++) {
      if (members[i].middle_name === null) {
        members[i].middle_name = " ";
      }
      fullDataList.push({
        fullName: members[i].last_name +
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
    // console.log("cleanedup Length" + length);

    for (var i = 0; i < sortedList.length; i++) {
      // console.log(sortedList[i]);

      // (var grenze = length *0.1) 
      if (i < length * 0.1) {
        arrInput.push(sortedList[i]);
      } else if (i === length * 0.1) {
        sortedList[i][valuekey3] === sortedList[i - 1][valuekey3];
        arrInput.push(sortedList[i]); // TAKES JUST THE NUMS I NEED of the 10% plus the ones with same value of the last!!!!
      }
    }
  }
  // console.log(arrInput);
  buildTable2(tableID, arrInput, valuekey1, valuekey2, valuekey3);
  // console.log("getData ended");
}

//!! GENERATED FUNC TO SORT by Ascendance and Descendance!! //   

function sortingOrder(tableID, arrInput, valuekey3) {
  // console.log("sorting Order started");

  var resultSort = arrInput.sort(function (x, y) {
    if (tableID === "leastEngaged" || tableID === "mostEngagedLoyal") {
      return y[valuekey3] - x[valuekey3];
    } else {
      return x[valuekey3] - y[valuekey3];
    }
  });
  // console.log("sorting Order ended");
  return resultSort;
}

function getLenghtbyKey(arrInput, valuekey3) {
  // console.log("getting length num by the key started");
  var valueNum = [];

  for (var i = 0; i < arrInput.length; i++) {
    console.log(arrInput[i][valuekey3]);
    if (valueNum.length === 0) {
      valueNum.push(arrInput[i][valuekey3]);
    } else if (!valueNum.includes(arrInput[i][valuekey3])) {
      valueNum.push(arrInput[i][valuekey3]);
    }
  }
  // console.log("getting length num by the key ended");
  return valueNum.length;
}

//¡¡¡-----------CREATING THE TABLE--------¡¡¡//

function buildTable2(tableID, arrInput, valuekey1, valuekey2, valuekey3) {
  // console.log("build Table started");

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
  // console.log("build Table ended");
}