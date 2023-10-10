let startTime;
let timerInterval;

// Function to start the timer
function startTimer() {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);
  document.getElementById("startButton").style.display = "none";
  document.getElementById("endButton").style.display = "inline";
}

// Function to update and display the timer
function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  document.getElementById(
    "timerDisplay"
  ).textContent = `Timer: ${elapsedTime} seconds`;
}

// Function to end the timer and store the time in local storage
function endTimer() {
  clearInterval(timerInterval);
  const currentTime = new Date().getTime();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  localStorage.setItem("timerTime", elapsedTime);
  alert(`Timer ended. Time elapsed: ${elapsedTime} seconds`);
  document.getElementById("startButton").style.display = "inline";
  document.getElementById("endButton").style.display = "none";
}
