const nameForm = document.getElementById("nameForm");
const messageDisplay = document.getElementById("message");

const storedNames = localStorage.getItem("user_name");

if (storedNames) {
  messageDisplay.textContent = `Welcome, ${storedNames}!`;
}

nameForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const userName = nameInput.value;

  localStorage.setItem("user_name", userName);

  messageDisplay.textContent = `Welcome, ${userName}!. Ready to Play`;

  nameInput.value = "";
});
