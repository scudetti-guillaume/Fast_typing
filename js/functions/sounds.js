// import { baseUrl, apiUrl } from '../config.js'
const fireAudio = new Audio(
  `${baseUrl}/assets/sounds/fire.mp3`
);
const failAudio = new Audio(
  `${baseUrl}/assets/sounds/fail.mp3`
);
const explosionEnemyAudio = new Audio(
  `${baseUrl}/assets/sounds/explosionEnemy.mp3`
);
const explosionsPlayerHitAudio = new Audio(
  `${baseUrl}/assets/sounds/explosionEnemy.mp3`
);
const explosionsGameOverAudio = new Audio(
  `${baseUrl}/assets/sounds/explosionGameOver.mp3`
);
const frozenBlastAudio = new Audio(
  `${baseUrl}/assets/sounds/frozenBlast.mp3`
);
const failCoinAudio = new Audio(
  `${baseUrl}/assets/sounds/failCoin.mp3`
);
const multiplierWinAudio = new Audio(
   `${baseUrl}/assets/sounds/multiplierWin.mp3`
);
const multiplierFailAudio = new Audio(
  `${baseUrl}/assets/sounds/multiplierFail.mp3`
);
const wrongTimingAudio = new Audio(
   `${baseUrl}/assets/sounds/wrongTiming.mp3`
);

let masterVolume = 0.5; // initial master volume level

// set the volume of each sound relative to the master volume
fireAudio.volume = 0.3 * masterVolume;
failAudio.volume = 0.2 * masterVolume;
explosionEnemyAudio.volume = 1 * masterVolume;
explosionsPlayerHitAudio.volume = 1 * masterVolume;
frozenBlastAudio.volume = 0.4 * masterVolume;
explosionsGameOverAudio.volume = 1 * masterVolume;
failCoinAudio.volume = 0.5 * masterVolume;
multiplierWinAudio.volume = 0.4 * masterVolume;
multiplierFailAudio.volume = 0.8 * masterVolume;
wrongTimingAudio.volume = 0.3 * masterVolume;

const explosionEnemySound = () => {
  explosionsPlayerHitAudio.currentTime = 0;
  explosionsPlayerHitAudio.play();
};

const multiplierWinSound = () => {
  multiplierWinAudio.currentTime = 0;
  multiplierWinAudio.play();
};

const multiplierFailSound = () => {
  multiplierFailAudio.currentTime = 0;
  multiplierFailAudio.play();
};

const explosionsGameOverSound = () => {
  explosionsGameOverAudio.currentTime = 0;
  explosionsGameOverAudio.play();
};

const wrongTimingSound = () => {
  wrongTimingAudio.currentTime = 0;
  wrongTimingAudio.play();
};

// function to update the master volume and adjust the volume of each sound accordingly
const setMasterVolume = (volume) => {
  masterVolume = volume;
  fireAudio.volume = 0.3 * masterVolume;
  failAudio.volume = 0.2 * masterVolume;
  explosionEnemyAudio.volume = 1 * masterVolume;
  explosionsPlayerHitAudio.volume = 1 * masterVolume;
  frozenBlastAudio.volume = 0.4 * masterVolume;
  explosionsGameOverAudio.volume = 1 * masterVolume;
  failCoinAudio.volume = 0.5 * masterVolume;
  multiplierWinAudio.volume = 0.4 * masterVolume;
  multiplierFailAudio.volume = 0.8 * masterVolume;
  wrongTimingAudio.volume = 0.3 * masterVolume;
};

const volumeFxRange = document.getElementById("volume-fx-range");
let volumeFxUserSave = localStorage.getItem("volumeFx");
if (volumeFxUserSave !== null) {
  setMasterVolume(volumeFxUserSave);
  volumeFxRange.value = volumeFxUserSave;
} else {
  localStorage.setItem("volumeFx", 0.9);
  volumeFxRange.value = 0.9;
}

volumeFxRange.addEventListener("input", (e) => {
  localStorage.setItem("volumeFx", e.target.value);
  volumeFxRange.value = e.target.value;
  setMasterVolume(e.target.value);
});
