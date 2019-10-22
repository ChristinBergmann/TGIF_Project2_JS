fetch(
    "https://api.propublica.org/congress/v1/115/senate/members.json", {
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
  })

// const members = data.results[0].members;
// console.log(members);

let fullDataList = [];
let allMemberStateList = [];

console.log(allMemberStateList)


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
    option.class = "state"
    option.name = "state"
    option.value = allMemberStateList[i];
    option.innerHTML =
      allMemberStateList[i]
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