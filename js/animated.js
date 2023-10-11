document.addEventListener("DOMContentLoaded", function () {
  const heading = document.getElementById("animated-heading");

  // Get the text content of the h1 element
  const text = heading.textContent;

  // Clear the text inside the h1 element
  heading.textContent = "";

  let charIndex = 0;
  const typeText = () => {
    if (charIndex < text.length) {
      heading.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 100); // Adjust the typing speed (in milliseconds)
    } else {
      // Text animation complete, add the pop-out animation class
      heading.classList.add("pop-out");

      // Add a delay before triggering the blink animation
      setTimeout(() => {
        heading.classList.remove("pop-out");
        heading.classList.add("pop-in");
      }, 500); // Adjust the delay (in milliseconds)
    }
  };

  typeText(); // Start typing animation when the page is loaded
});
