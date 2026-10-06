const form = document.getElementById("checkInForm");
const name = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const progressBar = document.getElementById("progressBar");
const attendeeCount = document.getElementById("attendeeCount");
//track attendance
let storageObj = JSON.parse(localStorage.getItem("attendeeCounts")) || {total: 0, water: 0, zero: 0, power: 0 };
let count = storageObj.total || 0;
const maxCount = 50;
//Handle submit event
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const attendeeName = name.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;
  console.log(`Attendee Name: ${attendeeName}, TeamID: ${team}`);
  
  attendeeCount.textContent = ++(storageObj.total);
  console.log(`Check-in Count: ${count}`);

  //update progress bar
  const percent = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percent;

  const teamCounter = document.getElementById(`${team}Count`);
  storageObj[team] = (storageObj[team] || 0) + 1;
  teamCounter.textContent = storageObj[team];

  const message = `Welcome ${attendeeName} from ${teamName}!`;
  form.reset();

  //save count to localStorage
  localStorage.setItem("attendeeCounts", JSON.stringify(storageObj));
})