// import { baseUrl, apiUrl } from '../config.js';
const playBtn = document.getElementById("btn-play");
const helpBtn = document.getElementById("btn-help");
const statsBtn = document.getElementById("btn-stats");

playBtn.addEventListener("click", () => {
  window.location.href = `${baseUrl}/game.html`;
});

helpBtn.addEventListener("click", () => {
  window.location.href = `${baseUrl}/help.html`;
});

statsBtn.addEventListener("click", () => {
  window.location.href = `${baseUrl}/myStats.html`;
});

const tabs = [...document.querySelectorAll(".tab")];
tabs.forEach((tab) => tab.addEventListener("click", tabsAnimation));

function tabsAnimation(e) {
  const tabContents = [...document.querySelectorAll(".tab-content")];
  const indexToRemove = tabs.findIndex((tab) =>
    tab.classList.contains("active-tab")
  );

  tabs[indexToRemove].classList.remove("active-tab");
  tabContents[indexToRemove].classList.remove("active-tab-content");

  const indexToShow = tabs.indexOf(e.target);
  tabs[indexToShow].classList.add("active-tab");
  tabContents[indexToShow].classList.add("active-tab-content");
}

const backIcon = document.querySelector(".back-icon");

backIcon.addEventListener("click", () => {
  window.location.href = `${baseUrl}/index.html`;
});
axios
  .get(
    `${apiUrl}/api/data/get-leaderboard-score`
  )
  .then(function (response) {
    // console.log(response);
    response.data.forEach((element, index) => {
      const { username, score } = element;
      document.getElementById("best-score").innerHTML += `
       <div class="player-stats">
         <p class="p-leaderboard">#${index + 1}</p>
         <p class="p-leaderboard">${username}</p>
         <p class="p-leaderboard">${score}</p>
       </div>
       `;
    });
  })
  .catch(function (error) {});

axios
  .get(
    `${apiUrl}/api/data/get-leaderboard-accuracy`
  )
  .then(function (response) {
    // console.log(response);
    response.data.forEach((element, index) => {
      const { username, accuracy } = element;
      document.getElementById("best-round").innerHTML += `
       <div class="player-stats">
         <p class="p-leaderboard">#${index + 1}</p>
         <p class="p-leaderboard">${username}</p>
         <p class="p-leaderboard">${accuracy}&nbsp %</p>
       </div>
       `;
    });
  })
  .catch(function (error) {});

axios
  .get(
    `${apiUrl}/api/data/get-leaderboard-speed`
  )
  .then(function (response) {
    // console.log(response);
    response.data.forEach((element, index) => {
      const { username, keyPerSecond } = element;
      document.getElementById("best-speed").innerHTML += `
       <div class="player-stats">
         <p class="p-leaderboard">#${index + 1}</p>
         <p class="p-leaderboard">${username}</p>
         <p class="p-leaderboard">${keyPerSecond}&nbsp lettres/s</p>
       </div>
       `;
    });
  })
  .catch(function (error) {});
