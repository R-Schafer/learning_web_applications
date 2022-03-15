const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));

function toggleOpen(e) {
  console.log("click");
  this.classList.toggle("open");
}
