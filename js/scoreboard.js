document.addEventListener("DOMContentLoaded", function () {
  const leaderboardTableBody = document
    .getElementById("leaderboardTable")
    .querySelector("tbody");
  const elapsedTimes = JSON.parse(localStorage.getItem("elapsedTimes") || "[]");

  elapsedTimes.sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  elapsedTimes.forEach((entry, index) => {
    let row = leaderboardTableBody.insertRow();
    let rankCell = row.insertCell(0);
    let nameCell = row.insertCell(1);
    let timeCell = row.insertCell(2);

    rankCell.textContent = index + 1;
    nameCell.textContent = entry.userName; // Assuming the name is stored in the entry object
    timeCell.textContent = entry.time;
  });

  let trChildren = document.getElementsByTagName("tr");
  // Create a timeline with default parameters
  let animeTimeline = anime.timeline({
    easing: "easeOutExpo",
    duration: 5000,
    delay: anime.stagger(700, { start: 1000 }),
  });

  animeTimeline.add({
    targets: trChildren,
    opacity: 1,
  });
});

// Function to save the elapsed time as an object in Local Storage
function saveElapsedTimeToLocalStorage() {
  // Retrieve the previously saved times from Local Storage, or initialize an empty array if none exist
  let elapsedTimes = JSON.parse(localStorage.getItem("elapsedTimes") || "[]");

  // Get the user's name from localStorage
  let userName = localStorage.getItem("user_name");
  // Create an object with the current elapsed time, the user's name, and the current date/time
  let elapsedTime = {
    name: userName, // Kullanıcının ismini burada ekliyoruz
    time: calculateElapsedTime(),
    date: new Date().toLocaleString(),
  };

  // Add the new object to the array
  elapsedTimes.push(elapsedTime);

  // Save the updated array back to Local Storage
  localStorage.setItem("elapsedTimes", JSON.stringify(elapsedTimes));
}
