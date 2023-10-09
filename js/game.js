const imgContainer = document.getElementById("imgContainer");
const buttonContainer = document.getElementById("buttonContainer");

const startButton = document.getElementById("startButton");
const submitButton = document.getElementById("submitButton");

function handleStartButton(e) {
  imgContainer.removeChild(buttonContainer);
  anime({
    targets: "#france",
    easing: "easeInOutExpo",
    update: function (anim) {
      anim.animatables[0].target.style.filter = `blur(${
        ((anim.progress - 100) * -1) / 100
      }px)`;

      console.log(anim.animatables[0].target.style.filter);
    },
  });
}

let tries = 0;
const scaling = [10, 5, 3, 2, 1];

function handleAnswer(e) {
  e.preventDefault();
  if (e.target[0].value === "france") {
    console.log("correct answer");
    zoomOutImage(scaling[4]);
  } else if (tries === 4) {
    zoomOutImage(scaling[4]);
    console.log("You have no more tries, the correct answer was france");
  } else {
    e.target[0].value = ""; //clear the text box after the answer
    zoomOutImage(scaling[tries]); //zoom out image based on tries
    tries++;
  }
}

function zoomOutImage(scaling) {
  anime({
    targets: "#france",
    scale: scaling / 20,
    easing: "easeInOutExpo",
    duration: 2500,
  });
}

startButton.addEventListener("click", handleStartButton);
submitButton.addEventListener("submit", handleAnswer);
