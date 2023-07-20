// import { baseUrl, apiUrl } from './config.js'
const synth = new Tone.Synth().toDestination();
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 768;
const placementTilesData2D = [];
const image = new Image();

image.onload = () => {
  animate();
};
image.src = `${baseUrl}/assets/gameMap.png`;
let xOffset = 128;
let combinedOffset = xOffset;

var countdown = 5;
var countdownDiv = document.getElementById("countdown-frozen-blast");
var countdownNumberEl = document.getElementById(
  "countdown-frozen-blast-number"
);
setInterval(function () {
  countdown = --countdown <= 0 ? 5 : countdown;
}, 1000);

for (let i = 0; i < placementTilesData.length; i += 20) {
  placementTilesData2D.push(placementTilesData.slice(i, i + 20));
}

placementTilesData2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 14) {
      placementTiles.push(
        new PlacementTile({ position: { x: x * 64, y: y * 64 } })
      );
    }
  });
});

animate();
window.addEventListener("blur", () => {
  setPause();
});

document.getElementById("settings-img").addEventListener("click", (e) => {
  setPause(e);
});

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  const logged = localStorage.getItem("login-data");
  if (logged) {
    window.location.href =
      `${baseUrl}/loggedMenu.html`;
  } else {
    window.location.href =
      `${baseUrl}/unloggedMenu.html`;
  }
}

setInterval(() => {
  if (!bossWave && !informationShown && !pause && !gameOver) {
    if (hitPerSecond > bestHitPerSecond) {
      bestHitPerSecond = hitPerSecond;
    }
    speedsLog.push(hitPerSecond);
    calcAverageSpeed = speedsLog.reduce((a, b) => a + b, 0) / speedsLog.length;
    averageSpeed = calcAverageSpeed.toFixed(2);
    hitPerSecond = 0;
  }
  if (!pause && !gameOver) {
    // console.log(currentPlayingTime);
    currentPlayingTime++;
  }
}, 1000);
