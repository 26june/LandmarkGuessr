// Get references to the HTML elements
let stopwatch = document.getElementById("stopwatch");
let startBtn = document.getElementById("start-btn");

// Initialize variables
let timeoutId = null; // This will store the ID returned by setTimeout()
let ms = 0; // Milliseconds counter
let sec = 0; // Seconds counter
let min = 0; // Minutes counter

// Function to calculate and format the elapsed time
function calculateElapsedTime() {
  // Calculate the total elapsed seconds
  let elapsedSecs = sec + min * 60;

  // Return the formatted string "MM:SS:ms"
  return (
    min.toString().padStart(2, "0") +
    ":" +
    sec.toString().padStart(2, "0") +
    ":" +
    ms.toString().padStart(2, "0")
  );
}

// Function to save the elapsed time as an object in Local Storage
function saveElapsedTimeToLocalStorage() {
  // Retrieve the previously saved times from Local Storage, or initialize an empty array if none exist
  let elapsedTimes = JSON.parse(localStorage.getItem("elapsedTimes") || "[]");

  // Create an object with the current elapsed time and the current date/time
  let elapsedTime = {
    time: calculateElapsedTime(),
    date: new Date().toLocaleString(),
  };

  // Add the new object to the array
  elapsedTimes.push(elapsedTime);

  // Save the updated array back to Local Storage
  localStorage.setItem("elapsedTimes", JSON.stringify(elapsedTimes));
}

// Function to start the stopwatch
function start() {
  // Disable the start button to prevent multiple starts
  startBtn.disabled = true;

  // Schedule a function to run after a delay (10 milliseconds in this case)
  timeoutId = setTimeout(function () {
    // Parse the current values to ensure they are integers
    ms = parseInt(ms);
    sec = parseInt(sec);
    min = parseInt(min);

    // Increment the milliseconds counter
    ms++;

    // If milliseconds reach 100, increment the seconds counter and reset milliseconds
    if (ms == 100) {
      sec = sec + 1;
      ms = 0;
    }
    // If seconds reach 60, increment the minutes counter and reset seconds
    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }

    // Format the values to ensure they are always two digits
    if (ms < 10) ms = "0" + ms;
    if (sec < 10) sec = "0" + sec;
    if (min < 10) min = "0" + min;

    // Update the stopwatch display
    stopwatch.innerHTML = min + ":" + sec + ":" + ms;

    // Call the start function recursively to keep the stopwatch running
    start();
  }, 10); // The delay is 10 milliseconds
}

// Function to pause the stopwatch
function pause() {
  // Cancel the scheduled function, effectively pausing the stopwatch
  clearTimeout(timeoutId);

  // Re-enable the start button
  startBtn.disabled = false;

  // Log the elapsed time to the console
  let elapsedTime = "Elapsed Time: " + calculateElapsedTime();
  console.log(elapsedTime);

  // Save the elapsed time to Local Storage
  saveElapsedTimeToLocalStorage(elapsedTime);
}

// Function to reset the stopwatch
function reset() {
  // Reset counters to zero
  ms = 0;
  sec = 0;
  min = 0;

  // Cancel the scheduled function
  clearTimeout(timeoutId);

  // Reset the stopwatch display
  stopwatch.innerHTML = "00:00:00";

  // Re-enable the start button
  startBtn.disabled = false;

  // Log the elapsed time to the console (which will be "00:00:00" since it's reset)
  let elapsedTime = "Elapsed Time: " + calculateElapsedTime();
  console.log(elapsedTime);

  // Save the elapsed time to Local Storage
  saveElapsedTimeToLocalStorage(elapsedTime);
}

// Function to display the saved times from Local Storage as a scoreboard
function displayScoreboard() {
  // Retrieve the saved times from Local Storage
  let elapsedTimes = JSON.parse(localStorage.getItem("elapsedTimes") || "[]");

  // Get a reference to the scoreboard div
  let scoreboardDiv = document.getElementById("scoreboard");
  scoreboardDiv.innerHTML = ""; // Clear any previous entries

  // Loop through each saved time and display it on the scoreboard
  elapsedTimes.forEach((entry) => {
    let entryDiv = document.createElement("div");
    entryDiv.innerHTML = `${entry.date} - ${entry.time}`;
    scoreboardDiv.appendChild(entryDiv);
  });
}

// Call the displayScoreboard function to show the saved times when the page loads
displayScoreboard();
