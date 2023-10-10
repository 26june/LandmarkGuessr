// Get elements
const imgContainer = document.getElementById("imgContainer");
const buttonContainer = document.getElementById("buttonContainer");

const startButton = document.getElementById("startButton");
const submitButton = document.getElementById("submitButton");

const answerForm = document.getElementsByTagName("form");

const imgPlaceholder = document.getElementsByTagName("img");

//Globals
let currentIndex;
let animationImageTarget;
let gameFinished = false;
let oldStartButton;

function Landmarks(landmarkName, landmarkSrc) {
  this.landmarkName = landmarkName;
  this.landmarkSrc = landmarkSrc;

  allLandmarks.push(this);
}

const allLandmarks = [];

function generateRandom() {
  return Math.floor(Math.random() * allLandmarks.length);
}

function pushLandmarks() {
  new Landmarks("France", "../assets/France.jpg");
  new Landmarks("Japan", "../assets/Japan.jpg");
  new Landmarks("Egypt", "../assets/Egypt.jpg");
  new Landmarks("Brazil", "../assets/Brazil.jpg");
  new Landmarks("Philippines", "../assets/Philippines.jpg");
  new Landmarks("Greece", "../assets/Greece.jpg");
  new Landmarks("Italy", "../assets/Italy.jpg");
  new Landmarks("Ukraine", "../assets/Ukraine.jpg");
}

pushLandmarks();
startPageLoad();

function startPageLoad() {
  currentIndex = generateRandom();

  imgPlaceholder[0].src = allLandmarks[currentIndex].landmarkSrc;
  imgPlaceholder[0].id = imgPlaceholder[0].alt =
    allLandmarks[currentIndex].landmarkName;

  imgPlaceholder[0].style.filter = "blur(1px)";
  imgPlaceholder[0].style.scale = "20";

  animationImageTarget = `#${allLandmarks[currentIndex].landmarkName}`;
  console.dir(imgPlaceholder[0]);
}

function gameRestart() {
  //reset everyting
  noMoreAttempts();
  reset();
  gameFinished = false;
  tries = 0;
  imgContainer.appendChild(oldStartButton);
  zoomInImage(animationImageTarget);
  answerForm[0][1].disabled = true;

  if (allLandmarks.length === 1) {
    pushLandmarks();
  } else {
    allLandmarks.splice(currentIndex, 1);
  }

  startPageLoad();
}

function gameEnd() {
  zoomOutImage(scaling[4]);
  pause();
  gameFinished = true;
}

function handleStartButton() {
  oldStartButton = imgContainer.removeChild(buttonContainer);

  answerForm[0][0].disabled = false;
  answerForm[0][1].disabled = false;

  removeBlur();

  submitButton.addEventListener("submit", handleAnswer);
}

let tries = 0;
const scaling = [10, 5, 3, 2, 1];

function handleAnswer(e) {
  e.preventDefault();
  if (gameFinished) {
    e.target[0].value = "";
    gameRestart();
    return;
  }

  if (
    e.target[0].value.toLowerCase() ===
    allLandmarks[currentIndex].landmarkName.toLowerCase()
  ) {
    correctAnswer();
    gameEnd();
    e.target[0].value = "Press Go to Play Again";
  } else if (tries === 4) {
    noMoreAttempts();
    gameEnd();
    e.target[0].value = "Press Go to Play Again";
  } else {
    e.target[0].value = ""; //clear the text box after the answer
    wrongAnswer();
    shakeForm();
    zoomOutImage(scaling[tries]); //zoom out image based on tries
    tries++;
  }
}

//Event listeners
startButton.addEventListener("click", handleStartButton);

//Animations

function removeBlur() {
  anime({
    targets: animationImageTarget,
    easing: "easeInOutExpo",
    update: function (anim) {
      anim.animatables[0].target.style.filter = `blur(${
        ((anim.progress - 100) * -1) / 100
      }px)`;
    },

    complete: function () {
      start();
    },
  });
}

function zoomOutImage(scaling) {
  anime({
    targets: animationImageTarget,
    scale: scaling / 20,
    easing: "easeInOutExpo",
    duration: 2500,
    update: function () {
      answerForm[0][0].disabled = true;
      answerForm[0][1].disabled = true;
    },

    complete: function () {
      //dont enable the text box after zoom if game is finished
      gameFinished
        ? (answerForm[0][1].disabled = false)
        : (answerForm[0][0].disabled = answerForm[0][1].disabled = false);
    },
  });
}

function zoomInImage(imgToZoom) {
  anime({
    targets: imgToZoom,
    scale: 1,
    easing: "linear",
    duration: 1,
  });
}

function shakeForm() {
  const moveX = 32;

  anime({
    targets: "#imgContainer",
    easing: "easeInOutSine",
    translateX: [moveX, -moveX, moveX / 2, -moveX / 2, 0],
  });
}

function wrongAnswer() {
  anime({
    targets: "#imgContainer",
    easing: "linear",
    duration: 500,
    borderColor: ["rgba(255, 0, 0, 0)", "rgba(255, 105, 97, 1)"],
  });
}

function noMoreAttempts() {
  anime({
    targets: "#imgContainer",
    easing: "linear",
    duration: 500,
    borderColor: ["rgba(255, 0, 0, 0)", "rgba(255, 181, 76, 1)"],
  });
}

function correctAnswer() {
  anime({
    targets: "#imgContainer",
    easing: "linear",
    duration: 500,
    borderColor: ["rgba(255, 0, 0, 0)", "rgba(140, 212, 126, 1)"],
  });
}

//Timer Code from Erhan

// Get references to the HTML elements
let stopwatch = document.getElementById("stopwatch");

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

  // Log the elapsed time to the console (which will be "00:00:00" since it's reset)
  let elapsedTime = "Elapsed Time: " + calculateElapsedTime();
  console.log(elapsedTime);

  // Save the elapsed time to Local Storage
  saveElapsedTimeToLocalStorage(elapsedTime);
}
