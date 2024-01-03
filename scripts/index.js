// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({placeholderQuestions});

const playbnt = document.getElementById("play");

playbnt.addEventListener("click", () => {
  window.location.href = "/round-1.html";
});
