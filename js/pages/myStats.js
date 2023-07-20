// import { baseUrl, apiUrl } from '../config.js'
const myUserName = JSON.parse(localStorage.getItem("login-data")).username;
axios
  .post(`${apiUrl}/api/data/my-data`, {
    username: myUserName,
  })
  .then(function (response) {
    // console.log(response);
    const myData = localStorage.getItem("myData");
    if (myData) {
      localStorage.removeItem("myData");
      localStorage.setItem("myData", JSON.stringify(response.data));
    } else {
      localStorage.setItem("myData", JSON.stringify(response.data));
    }
    document.getElementById("my-score").innerHTML = response.data.score;
    document.getElementById("my-max-round").innerHTML = response.data.maxRound;
    document.getElementById("my-speed").innerHTML = response.data.keyPerSecond;
    document.getElementById("my-playing-time").innerHTML =
      response.data.playingTime;
    document.getElementById("my-good-hit").innerHTML = response.data.totalGood;
    document.getElementById("my-miss-hit").innerHTML = response.data.totalMiss;
    document.getElementById("my-accuracy").innerHTML = response.data.accuracy;
    document.getElementById("my-pseudo").innerHTML = response.data.username;
    document.getElementById("my-level").innerHTML = response.data.level;
  })
  .catch(function (error) {
    console.log(error);
  });

const backIcon = document.querySelector(".back-icon");

backIcon.addEventListener("click", () => {
  window.location.href = `${baseUrl}/loggedMenu.html`;
});
