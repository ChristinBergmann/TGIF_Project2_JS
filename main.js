var members = data.results[0].members;
console.log(members.length);
console.log(members);

function addDATA() {
  var tbody = document.getElementById("senate-data");

  for (var i = 0; i < members.length; i++) {
    if (members[i].middle_name === null) {
      members[i].middle_name = "";
    }
    var fullName =
      members[i].last_name +
        "," +
        members[i].first_name +
        " " +
        members[i].middle_name || "";
    var party = members[i].party;
    var state = members[i].state;
    var seniority = members[i].seniority;
    var votes = members[i].votes_with_party_pct;

    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    var col2 = document.createElement("td");
    var col3 = document.createElement("td");
    var col4 = document.createElement("td");
    var col5 = document.createElement("td");

    col1.innerHTML = fullName;
    col2.innerHTML = party;
    col3.innerHTML = state;
    col4.innerHTML = seniority;
    col5.innerHTML = votes;

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    tbody.appendChild(row);
  }
}
addDATA();
