"use strict";
// დავამატე dark და light მოუდი
const themeToggle = document.getElementById("darkLight");
function updateSavedText(theme) {
  if (theme === "dark") {
    themeToggle.innerHTML = `DARK <img src="assets/img/svg/sun.svg" alt="DarkLight" />`;
  } else {
    themeToggle.innerHTML = `DARK <img src="assets/img/svg/moon.svg" alt="DarkLight" />`;
  }
}

function appleSavedTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";

  document.body.classList.toggle("dark", currentTheme === "dark");

  updateSavedText(currentTheme);
}

themeToggle.addEventListener("click", function () {
  const isDarkmode = document.body.classList.toggle("dark");

  localStorage.setItem("theme", isDarkmode ? "dark" : "light");
  updateSavedText(isDarkmode ? "dark" : "light");
});
// დავამატე X იქონით სერჩ ინფუთის გასუფთავება
const xbutton = document.getElementById("xButton");
const search = document.getElementById("searchInput");
xbutton.addEventListener("click", function () {
  search.value = "";
});
// ===========================================
const formContainer = document.getElementById("filterForm");
formContainer.addEventListener("submit", function (event) {
  event.preventDefault();
  fetchData();
});

function fetchData() {
  const name = document.getElementById("searchInput").value.trim();
  if (name === "") return;

  let url = `https://api.github.com/users/${name}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("resultCotanier");

      const card = document.createElement("div");
      card.innerHTML = `
       <div class="topContainer">
          <img
            class="imgContainer"
            src="${data.avatar_url}"
            alt="profilePicture"
          />
          <div class="detailInformation">
            <div class="joinedData">
              <p id="name">${data.name}</p>
              <p id="tag">@${data.company}</p>
              <p id="bio">${data.bio}</p>
            </div>
            <p id="joinData">${data.created_at}</p>
          </div>
        </div>
        <div class="detailInformationContainer">
          <div class="profileInformation">
            <div class="repos">
              <p class="personInfo">Repos</p>
              <p id="ReposNumber">${data.public_repos}</p>
            </div>
            <div class="followers">
              <p class="personInfo">Followers</p>
              <p id="followersNumber">${data.followers}</p>
            </div>
            <div class="following">
              <p class="personInfo">Following</p>
              <p id="followingNumber">${data.following}</p>
            </div>
          </div>
          <div class="address">
            <div class="addressInfoContainer">
              <div class="addressInfo">
                <img src="assets/img/svg/Location.svg" alt="Location" />
                <p>${data.location}</p>
              </div>
              <div class="addressInfo">
                <img src="assets/img/svg/link.svg" alt="url" />
                <p>${data.url}</p>
              </div>
            </div>
            <div class="addressInfoContainer">
              <div class="addressInfo">
                <img src="assets/img/svg/Twitter.svg" alt="socialMedia" />
                <p>${data.twitter_username}</p>
              </div>
              <div class="addressInfo">
                <img src="assets/img/svg/github.svg" alt="github" />
                <p>
                  <a href="#">${data.html_url}</a>
                </p>
              </div>
            </div>
          </div>
        </div>`;
      container.appendChild(card);
    });
}
