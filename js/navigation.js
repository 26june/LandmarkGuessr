function toLocation(myDestination) {
  anime({
    targets: "main",
    easing: "linear",
    duration: 500,
    opacity: 0,
  });

  setTimeout(() => {
    window.location.href = myDestination;
  }, 500);
}
