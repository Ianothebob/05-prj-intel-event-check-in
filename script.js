const form = document.getElementById("checkInForm");
const name = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const progressBar = document.getElementById("progressBar");
const attendeeCount = document.getElementById("attendeeCount");
const attendeeList = document.getElementById("attendeeList");
const teamNames = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables"
};
let storageObj = JSON.parse(localStorage.getItem("attendeeCounts")) || {
  total: 0,
  water: [],
  zero: [],
  power: []
};
const maxCount = 50;
const teamIds = ["water", "zero", "power"];

for (let i = 0; i < teamIds.length; i++) {
  if (!Array.isArray(storageObj[teamIds[i]])) {
    storageObj[teamIds[i]] = [];
  }
}

function updateAttendanceDisplay() {
  attendeeCount.textContent = storageObj.total;
  progressBar.style.width = `${Math.min(storageObj.total / maxCount * 100, 100)}%`;
  attendeeList.textContent = "";

  for (let i = 0; i < teamIds.length; i++) {
    const team = teamIds[i];
    const teamAttendees = storageObj[team];
    const teamCounter = document.getElementById(`${team}Count`);
    teamCounter.textContent = teamAttendees.length;

    for (let j = 0; j < teamAttendees.length; j++) {
      const attendeeRow = document.createElement("li");
      const attendeeName = document.createElement("span");
      const attendeeTeam = document.createElement("span");

      attendeeRow.className = "attendee-row";
      attendeeName.className = "attendee-name";
      attendeeTeam.className = `attendee-team ${team}`;
      attendeeName.textContent = teamAttendees[j];
      attendeeTeam.textContent = teamNames[team];
      attendeeRow.appendChild(attendeeName);
      attendeeRow.appendChild(attendeeTeam);
      attendeeList.appendChild(attendeeRow);
    }
  }

  if (attendeeList.children.length === 0) {
    const emptyRow = document.createElement("li");
    emptyRow.className = "attendee-empty";
    emptyRow.textContent = "No attendees checked in yet.";
    attendeeList.appendChild(emptyRow);
  }
}

updateAttendanceDisplay();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (storageObj.total >= maxCount) {
    alert("Maximum attendee count reached!");
    return;
  }

  const attendeeName = name.value.trim();
  const team = teamSelect.value;
  storageObj[team].push(attendeeName);
  storageObj.total++;

  updateAttendanceDisplay();
  localStorage.setItem("attendeeCounts", JSON.stringify(storageObj));
  form.reset();
});