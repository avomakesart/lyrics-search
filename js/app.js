import { API } from "./api.js";

export const searchForm = document.querySelector("#search-form"),
  searchDiv = document.querySelector("#search"),
  messagesDiv = document.querySelector("#messages"),
  resultDiv = document.querySelector("#result");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const artist = document.querySelector("#artist").value,
    song = document.querySelector("#song").value;

  if (artist === "" || song === "") {
    messagesDiv.innerHTML = "Error.... all fields are required";
    messagesDiv.classList.add("error");
    setTimeout(() => {
      messagesDiv.innerHTML = "";
      messagesDiv.classList.remove("error");
    }, 3000);
  } else {
    // the form is correct, consult the API
    const api = new API(artist, song);
    api.getLyrics().then((data) => {
      if (data.respuesta.lyrics) {
        // song already exists
        const letra = data.respuesta.lyrics;
        resultDiv.textContent = letra;
      } else {
        // song does not exist
        messagesDiv.innerHTML =
          "Error.... the song does not exist, try another search";
        messagesDiv.classList.add("error");
        setTimeout(() => {
          messagesDiv.innerHTML = "";
          messagesDiv.classList.remove("error");
          searchForm.reset();
        }, 3000);
      }
    });
  }
});
