const img = document.querySelector("img");
const btn = document.querySelector("button");

btn.addEventListener("click", (e) => {
  getCatMeme();
});

async function getCatMeme() {
  try {
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/translate?api_key=TODO&s=cats"
    );
    const data = await response.json();
    img.src = data.data.images.original.url;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getCatMeme();
