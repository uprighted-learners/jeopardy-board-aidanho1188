const year = document.getElementById("copyrightYear");

function updateYear() {
  let currentYear = new Date().getFullYear();
  year.innerHTML = currentYear;
}

updateYear();
