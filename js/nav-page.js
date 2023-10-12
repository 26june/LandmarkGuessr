let moveY = 16;

let mapPinsId = {
  home: "#homePin",
  game: "#gamePin",
  leaderboard: "#leaderboardPin",
};

let mapPinsHref = {
  home: "../index.html",
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
  anime({
    targets: mapPinsId[clickLocation],
    easing: "easeInOutSine",
    duration: 1000,
  });

  setTimeout(() => {
    window.location.href = mapPinsHref[clickLocation];
  }, 0);
}
