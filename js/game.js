const imgContainer = document.getElementById("imgContainer");
const buttonContainer = document.getElementById("buttonContainer");

const startButton = document.getElementById("startButton");
const submitButton = document.getElementById("submitButton");

const answerForm = document.getElementsByTagName("form");

function handleStartButton() {
  imgContainer.removeChild(buttonContainer);
  answerForm[0][0].disabled = false;
  answerForm[0][1].disabled = false;

  anime({
    targets: "#france",
    easing: "easeInOutExpo",
    update: function (anim) {
      anim.animatables[0].target.style.filter = `blur(${
        ((anim.progress - 100) * -1) / 100
      }px)`;
    },
  });

  submitButton.addEventListener("submit", handleAnswer);
}

let tries = 0;
const scaling = [10, 5, 3, 2, 1];

function handleAnswer(e) {
  e.preventDefault();
  if (e.target[0].value.toLowerCase() === "france") {
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

//Animations

function zoomOutImage(scaling) {
  anime({
    targets: "#france",
    scale: scaling / 20,
    easing: "easeInOutExpo",
    duration: 2500,
  });
}

function shakeForm() {
  const moveX = 8;

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

startButton.addEventListener("click", handleStartButton);
