//changes text at button
function changeBtn() {
  let toggle = document.getElementById("toggleBtn");
  if (toggle.value == "Show more..") toggle.value = "Show less..";
  else toggle.value = "Show more..";
}
