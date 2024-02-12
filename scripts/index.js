const playBnt = document.getElementById("play");

playBnt.addEventListener("click", () => {
  const queryParams = new URLSearchParams({round: '1'});
  const urlWithParams = `/round-1.html?${queryParams.toString()}`;
  window.location = urlWithParams;
});


