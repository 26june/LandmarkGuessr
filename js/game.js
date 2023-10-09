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

function Landmarks(landmarkName, landmarkSrc) {
  this.landmarkName = landmarkName;
  this.landmarkSrc = landmarkSrc;

  allLandmarks.push(this);
}

const allLandmarks = [];

function generateRandom() {
  return Math.floor(Math.random() * allLandmarks.length);
}

function startPageLoad() {
  new Landmarks("France", "../assets/France.jpg");
  new Landmarks("Japan", "../assets/Japan.jpg");
  new Landmarks("Egypt", "../assets/Egypt.jpg");
  new Landmarks("Brazil", "../assets/Brazil.jpg");
  new Landmarks("Philippines", "../assets/Philippines.jpg");
  new Landmarks("Greece", "../assets/Greece.jpg");
  new Landmarks("Italy", "../assets/Italy.jpg");
  new Landmarks("Ukraine", "../assets/Ukraine.jpg");

  currentIndex = generateRandom();

  imgPlaceholder[0].src = allLandmarks[currentIndex].landmarkSrc;
  imgPlaceholder[0].id = imgPlaceholder[0].alt =
    allLandmarks[currentIndex].landmarkName;

  animationImageTarget = `#${allLandmarks[currentIndex].landmarkName}`;

  console.dir(imgPlaceholder[0]);
}

startPageLoad();

function handleStartButton() {
  imgContainer.removeChild(buttonContainer);
  answerForm[0][0].disabled = false;
  answerForm[0][1].disabled = false;

  removeBlur();

  submitButton.addEventListener("submit", handleAnswer);
}

let tries = 0;
const scaling = [10, 5, 3, 2, 1];

function handleAnswer(e) {
  e.preventDefault();
  if (
    e.target[0].value.toLowerCase() ===
    allLandmarks[currentIndex].landmarkName.toLowerCase()
  ) {
    zoomOutImage(scaling[4]);
    correctAnswer();
    console.log("correct answer");
  } else if (tries === 4) {
    zoomOutImage(scaling[4]);
    noMoreAttempts();
    console.log("You have no more tries, the correct answer was france");
  } else {
    e.target[0].value = ""; //clear the text box after the answer
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
  });
}

function zoomOutImage(scaling) {
  anime({
    targets: animationImageTarget,
    scale: scaling / 20,
    easing: "easeInOutExpo",
    duration: 2500,
  });
}

function shakeForm() {
  const moveX = 32;

  anime({
    targets: "body",
    easing: "easeInOutSine",
    translateX: [moveX, -moveX, moveX / 2, -moveX / 2, 0],
  });

  wrongAnswer();
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
