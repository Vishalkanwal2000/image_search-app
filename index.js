const asccesKey = "PyPDeTdzy8SzdYraEeTBaqPa_9yZ7ZJb-fIjqkcYsmQ";

const formEl = document.querySelector("form");

const inputEl = document.getElementById("serch");

const searchResults = document.querySelector(".search-results");

const showMore = document.getElementById("show_more");

let imputData = "";
let page = 1;

async function searchImage() {
  imputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${imputData}&client_id=${asccesKey}`;

  const response = await fetch(url);
  const deta = await response.json();

  const results = deta.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }
  results.map((result) => {
    const imagewrapper = document.createElement("div");
    imagewrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");

    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imagewrapper.appendChild(image);
    imagewrapper.appendChild(imageLink);
    searchResults.appendChild(imagewrapper);
  });

  page++;

  if (page > 1) {
    showMore.style.display = "block";
  }
}
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;

  searchImage();
});

showMore.addEventListener("click", () => {
  searchImage();
});
