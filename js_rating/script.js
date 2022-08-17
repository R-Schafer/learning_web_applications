const ratings = document.querySelectorAll(".number");
const submit = document.querySelector(".submit");
let rating = "";

function main() {
  // event listeners
  ratings.forEach((rating) =>
    rating.addEventListener("click", handleRatingClick)
  );

  submit.addEventListener("click", handleSubmitClick);
}

function handleRatingClick(e) {
  e.preventDefault();
  // making sure only 1 rating is chosen
  for (let i = 0; i < ratings.length; i++) {
    if (ratings[i].classList.contains("clicked")) {
      ratings[i].classList.remove("clicked");
    }
  }
  e.target.classList.add("clicked");
  rating = e.target.textContent;
}

function handleSubmitClick(e) {
  e.preventDefault();

  if (rating === "") {
    return;
  }
  document.querySelector(".rating-container").classList.add("hidden");
  document.querySelector(".thankyou-container").classList.remove("hidden");
  document.querySelector(
    ".rated"
  ).textContent = `You selected ${rating} out of 5`;
}

main();
