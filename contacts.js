const form = document.getElementById("details");
// get the name and email elements

function handleSubmit(event) {
  event.preventDefault();
  console.log("This button is working!");
  const userName = document.getElementById("name");
  const userEmail = document.getElementById("email");

  let data = {
    name: userName.value,
    email: userEmail.value,
  };
  console.log(data);
}

form.addEventListener("submit", handleSubmit);
