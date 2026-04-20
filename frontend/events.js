
function openModal() {
  document.getElementById("bookModal").style.display = "block";
}


function closeModal() {
  document.getElementById("bookModal").style.display = "none";
}


window.onclick = function(event) {
  if (event.target === document.getElementById("bookModal")) {
    closeModal();
  }
}
