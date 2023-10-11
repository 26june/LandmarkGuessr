// const nameForm = document.getElementById("nameForm");
// const messageDisplay = document.getElementById("message");
// const loadingDiv = document.getElementById("loading");

// const storedNames = localStorage.getItem("user_name");

// if (storedNames) {
//   messageDisplay.textContent = `Welcome, ${storedNames}!`;
// }

// nameForm.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const nameInput = document.getElementById("name");
//   const userName = nameInput.value;

//   localStorage.setItem("user_name", userName);

//   messageDisplay.textContent = `Welcome, ${userName}!. Ready to Play`;

//   // Hide the name form and show the loading div
//   nameForm.style.display = "none";
//   loadingDiv.style.display = "block";

//   // Simulate a 3-second delay and then redirect to the game page
//   setTimeout(function () {
//     window.location.href = "game.html";
//   }, 3000);

//   // nameInput.value = "";
// });

let moveY = 16;

function hoverPoint(pins) {
  let mapPins = {
    home: "#homePin",
    game: "#gamePin",
    leaderboard: "#leaderboardPin",
  };

  anime({
    targets: mapPins[pins],
    easing: "easeInOutSine",
    translateY: [-moveY, 0, -moveY / 2, 0],
  });
}

function clickPoint(clickLocation) {
  let mapPins = {
    home: "../index.html",
    game: "../game.html",
    leaderboard: "../scoreboard.html",
  };

  window.location.href = mapPins[clickLocation];
}
