// import { baseUrl, apiUrl } from '../config.js'
const setMultiplier = () => {
  if (combo % 10 === 0) {
    multiplierWinSound();
    coinsMultiplier = 1 + Math.floor(combo / 10) * 0.1;
    document.getElementById("multiplier").style.color = "yellow";
    document.getElementById("multiplier").classList.add("shake-anim-y");
    setTimeout(() => {
      document.getElementById("multiplier").style.color = "white";
      document.getElementById("multiplier").classList.remove("shake-anim-y");
    }, 500);
    document.getElementById(
      "combo"
    ).innerHTML = `Combo : ${combo} x ${coinsMultiplier}`;
  }
};

const resetMultiplier = () => {
  if (coinsMultiplier > 1) {
    multiplierFailSound();
  }
  coinsMultiplier = 1;
  document.getElementById("multiplier").classList.add("shake-anim-x");
  document.getElementById("multiplier").style.color = "red";
  setTimeout(() => {
    document.getElementById("multiplier").style.color = "white";
    document.getElementById("multiplier").classList.remove("shake-anim-x");
    document.getElementById("multiplier").style.display = "none";
  }, 500);
};

const checkMaj = () => {
  const element = document.getElementById("warning");

  if (event.getModifierState("CapsLock")) {
    element.style.transition = "transform 0.3s ease";
    element.style.transform = "translateY(-220%)";
  } else {
    element.style.transition = "transform 0.3s ease";
    element.style.transform = "translateY(-110%)";
  }
};

const goodKey = (event) => {
  goodInCurrentGame++;
  totalHit++;
  hitPerSecond++;
  fireAudio.currentTime = 0;
  fireAudio.play();
  rightkey = true;
  goodEntry++;
  combo++;
  setMultiplier();
  if (enemies.length > 0) {
    if (bossWave && wordsEnemiesBoss) {
      enemies[0].health -= 100 / enemies[0].fullWordBoss.length;
      enemies[0].health = Math.floor(enemies[0].health);
    } else {
      enemies[0].health -= 100 / enemies[0].fullWord.length;
      enemies[0].health = Math.floor(enemies[0].health);
    }
  }
  if (!bossWave) {
    coins += coinsPerAttack * coinsMultiplier;
  }
  words[wave][0] = words[wave][0].slice(1);
  if (bossEnemiesWave) {
    wordsEnemiesBoss[0] = wordsEnemiesBoss[0].slice(1);
  }
  htmlRender();
};

const wrongKey = (event) => {
  missInCurrentGame++;
  if (
    event.key !== " " &&
    event.key !== "Escape" &&
    event.key !== "F1" &&
    event.key !== "F2" &&
    event.key !== "F3" &&
    event.key !== "F4" &&
    event.key !== "Dead" &&
    event.key !== "Control" &&
    event.key !== "Shift" &&
    event.key !== "CapsLock" &&
    event.key !== "Tab" &&
    event.key !== "²" &&
    event.key !== "Control" &&
    event.key !== "Alt" &&
    event.key !== "AltGraph" &&
    event.key !== "Meta" &&
    event.key !== "ContextMenu" &&
    event.key !== "ArrowUp" &&
    event.key !== "ArrowDown" &&
    event.key !== "ArrowLeft" &&
    event.key !== "ArrowRight"
  ) {
    failAudio.currentTime = 0;
    failAudio.play();
    wrongEntry++;
    combo = 0;
    if (coinsMultiplier > 1) {
      multiplierFailAudio.currentTime = 0;
      multiplierFailAudio.play();
    }

    coinsMultiplier = 1;
    document.getElementById("multiplier").classList.add("shake-anim-x");
    document.getElementById("multiplier").style.color = "red";
    setTimeout(() => {
      document.getElementById("multiplier").style.color = "white";
      document.getElementById("multiplier").classList.remove("shake-anim-x");
      document.getElementById("multiplier").style.display = "none";
    }, 500);

    htmlRender();
  }
};

const setGameOver = (enemy) => {
  Tone.Master.volume.value = 0;
  Tone.Transport.stop();
  Tone.Transport.cancel();
  const loggedUsername = JSON.parse(
    localStorage.getItem("login-data")
  )?.username;
  if (loggedUsername) {
    axios
      .post(`${apiUrl}/api/data/my-data`, {
        username: loggedUsername,
      })
      .then((response) => {
        const totalGoodUser = response.data.totalGood;
        const totalMissUser = response.data.totalMiss;
        const calcNewTotalGood = totalGoodUser + goodInCurrentGame;
        const calcNewTotalMiss = totalMissUser + missInCurrentGame;
        goodInCurrentGame = 0;
        missInCurrentGame = 0;
        const accuracyreverse = (calcNewTotalMiss * 100) / calcNewTotalGood;
        const accuracy = (100 - accuracyreverse).toFixed(2);
        const accuracyCurrentGame = (
          100 -
          (missInCurrentGame * 100) / goodInCurrentGame
        ).toFixed(2);
        const totalPlayingTime = response.data.playingTime;
        const newPlayingTime = totalPlayingTime + currentPlayingTime;
        const minutesPlayed = newPlayingTime / 60;
        const hoursPlayed = minutesPlayed / 60;
        const newTotalPlayingTime = (totalPlayingTime + hoursPlayed).toFixed(2);
        gameOver = true;
        speedEnemies = 0.3;
        document.getElementById("letter-to-type-boss").style.display = "none";
        document.getElementById("center-key-trigger").style.display = "none";
        document.getElementById("icons-powers").style.display = "none";
        document.getElementById("words").style.display = "none";
        document.getElementById("warning").style.display = "none";
        document.getElementById("display-infos").style.display = "none";

        setTimeout(() => {
          players = [];
        }, 1000);
        setTimeout(() => {
          speedEnemies = 0;
          document.getElementById("game-over").style.display = "flex";
          document.getElementById("recap-score").innerHTML = score;
          document.getElementById("recap-round").innerHTML = wave + 1;
          document.getElementById("recap-speed").innerHTML = averageSpeed;
          if (accuracyCurrentGame === "NaN") {
            document.getElementById("recap-accuracy").innerHTML = 0;
          } else {
            document.getElementById("recap-accuracy").innerHTML =
              accuracyCurrentGame;
          }
        }, 2100);
        let newScore = 0;
        if (score > response.data.score) {
          newScore = score;
        } else {
          newScore = response.data.score;
        }
        const previousAccuracy = response.data.accuracy;
        axios.post(
          `${apiUrl}/api/data/update-data`,
          {
            username: loggedUsername,
            score: newScore,
            round: wave,
            speed: averageSpeed,
            totalGood: calcNewTotalGood,
            totalMiss: calcNewTotalMiss,
            accuracy: accuracy,
            playingTime: newTotalPlayingTime,
          }
        );
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  } else {
    const accuracyreverse = (missInCurrentGame * 100) / goodInCurrentGame;
    const accuracy = (100 - accuracyreverse).toFixed(2);
    if (accuracy === "NaN") {
      document.getElementById("recap-accuracy").innerHTML = 0;
    } else {
      document.getElementById("recap-accuracy").innerHTML = accuracy;
    }

    document.getElementById("letter-to-type-boss").style.display = "none";
    document.getElementById("center-key-trigger").style.display = "none";
    document.getElementById("icons-powers").style.display = "none";
    document.getElementById("words").style.display = "none";
    document.getElementById("warning").style.display = "none";
    document.getElementById("display-infos").style.display = "none";

    setTimeout(() => {
      players = [];
    }, 1000);
    setTimeout(() => {
      speedEnemies = 0;
      document.getElementById("game-over").style.display = "flex";
      document.getElementById("recap-score").innerHTML = score;
      document.getElementById("recap-round").innerHTML = wave + 1;
      document.getElementById("recap-speed").innerHTML = averageSpeed;
    }, 2100);
  }
  let offsetExplosion = 20;
  explosionGameOverAnimation(enemy, offsetExplosion);
  explosionsGameOverSound();

  document.getElementById("reload-icon-recap").addEventListener("click", () => {
    const logged = JSON.parse(localStorage.getItem("login-data"));
    if (logged) {
      window.location.href =
        `${baseUrl}/loggedMenu.html`;
    }
    if (!logged) {
      window.location.href =
        `${baseUrl}/unloggedMenu.html`;
    }
  });
};

const setPause = () => {
  if (enableToSetPause) {
    pause = true;
    document.getElementById("option-menu").style.display = "flex";

    document.getElementById("restart-icon").addEventListener("click", () => {
      location.reload();
    });
    document
      .getElementById("fullscreen-icon")
      .addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        function enterFullScreen(element) {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            /* Firefox */
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            /* Chrome, Safari and Opera */
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            /* IE/Edge */
            element.msRequestFullscreen();
          }
        }
        function exitFullScreen(element) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen();
          }
        }
        if (!fullscreenSet) {
          enterFullScreen(document.documentElement);
          fullscreenSet = true;
          document.getElementById("fullscreen-icon").src =
            `${baseUrl}/assets/icons/no-fullscreen.png`;
        } else {
          exitFullScreen(document.documentElement);
          fullscreenSet = false;
          document.getElementById("fullscreen-icon").src =
            `${baseUrl}/assets/icons/fullscreen.png`;
        }
      });

    document.getElementById("exit-icon").addEventListener("click", () => {
      const logged = JSON.parse(localStorage.getItem("login-data"));
      if (logged) {
        window.location.href =
          `${baseUrl}/loggedMenu.html `;
      } else {
        window.location.href =
          `${baseUrl}/unloggedMenu.html`;
      }
    });
    warning;
    if (bossWave) {
      Tone.Transport.pause();
    }
    document.getElementById("option-card").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    document.getElementById("option-menu").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      removePause();
    });

    document.getElementById("close-options").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      removePause();
    });
  }
};

removePause = () => {
  pause = false;
  document.getElementById("option-menu").style.display = "none";
  if (bossWave) {
    Tone.Transport.start();
  }
};

const goodReward = () => {
  coins += 0.5;
};

const perfectReward = () => {
  coins += 1;
  score++;
};
