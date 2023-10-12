let moveY = 16;

let svgNode = document.getElementById("navMap");

let mapPinsId = {
  home: "#homePin",
  game: "#gamePin",
  leaderboard: "#leaderboardPin",
};

let mapPinsHref = {
  home: "../home.html",
  game: "../game.html",
  leaderboard: "../scoreboard.html",
};

function hoverPoint(pins) {
  anime({
    targets: mapPinsId[pins],
    easing: "easeInOutSine",
    translateY: [-moveY, 0, -moveY / 2, 0],
  });
}

function clickPoint(clickLocation) {
  let newNode = document.querySelector(`${mapPinsId[clickLocation]}`);
  console.log(newNode);
  svgNode.appendChild(newNode);
  console.log(svgNode);

  anime({
    targets: `${mapPinsId[clickLocation]} g:nth-child(2) circle`,
    easing: "easeInOutSine",
    duration: 1000,
    scale: 100,
    fill: "#1e2124",
  });

  setTimeout(() => {
    window.location.href = mapPinsHref[clickLocation];
  }, 1000);
}
