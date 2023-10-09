const imgContainer = document.getElementById("imgContainer");
const startButton = document.getElementById("startButton");
const scaleDown = document.getElementById("scaleDown");

function handleStartButton(e) {
  //   console.log(e);

  imgContainer.innerHTML = "";

  const gameImg = document.createElement("img");
  gameImg.classList.add("paris");
  gameImg.setAttribute("src", "./paris.jpg");

  imgContainer.appendChild(gameImg);
}

let tries = 0;
const scaling = [10, 5, 3, 2, 1];

function handleScaleButton(e) {
  anime({
    targets: ".paris",
    scale: scaling[tries] / 20,
    // easing: "linear",
    easing: "easeInOutExpo",
    duration: 2500,
  });

  tries === 4 ? null : tries++; //stop scaling oncce reached value of 1
}

startButton.addEventListener("click", handleStartButton);

scaleDown.addEventListener("click", handleScaleButton);
