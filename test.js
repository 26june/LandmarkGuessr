
// // Function to display the saved times from Local Storage as a scoreboard
// function displayScoreboard() {
//   // Retrieve the saved times from Local Storage
//   let elapsedTimes = JSON.parse(localStorage.getItem("elapsedTimes") || "[]");

//   // Get a reference to the scoreboard div
//   let scoreboardDiv = document.getElementById("scoreboard");
//   scoreboardDiv.innerHTML = ""; // Clear any previous entries

//   // Loop through each saved time and display it on the scoreboard
//   elapsedTimes.forEach((entry) => {
//     let entryDiv = document.createElement("div");
//     entryDiv.innerHTML = `${entry.date} - ${entry.time}`;
//     scoreboardDiv.appendChild(entryDiv);
//   });
// }

// // Call the displayScoreboard function to show the saved times when the page loads
// displayScoreboard();
