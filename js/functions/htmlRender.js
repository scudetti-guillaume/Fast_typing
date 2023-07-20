const elementHearts = document.getElementById("hearts");
const elementCombo = document.getElementById("combo");
const elementMultiplier = document.getElementById("multiplier");
const elementCoins = document.getElementById("coins");
const elementScore = document.getElementById("score");
const elementRound = document.getElementById("round");
const elementInformations = document.getElementById("informations");
const elementDisplayInfos = document.getElementById("display-infos");
const elementWord1 = document.getElementById("word1");
const elementWord2 = document.getElementById("word2");
const elementWord3 = document.getElementById("word3");
const elementWord4 = document.getElementById("word4");
const elementWord5 = document.getElementById("word5");
const elementWord6 = document.getElementById("word6");
const elementWord7 = document.getElementById("word7");
const htmlRender = () => {
  if (bossWave) {
    document.getElementById("icons-powers").style.display = "none";
  }

  let round = wave + 1;
  elementHearts.innerHTML =
    `<img id="icon-heart" src='https://lesiteduscudo.com/fast_typing/assets/icons/heart.png' />` +
    hearts;
  elementCombo.innerHTML = `Combo : ` + combo;
  if (combo >= 10) {
    elementMultiplier.style.display = "flex";
    elementMultiplier.innerHTML = `x ` + coinsMultiplier.toFixed(2);
  }
  elementCoins.innerHTML =
    `<img id="icon-coin" src='https://lesiteduscudo.com/fast_typing/assets/icons/coin.png' />` +
    coins.toFixed(2);
  elementScore.innerHTML = `Score : ` + score;
  elementRound.innerHTML = "Round : " + round;

  for (let i = 0; i < 7; i++) {
    if (words[wave][i] !== undefined) {
      document.getElementById(`word${i + 1}`).innerHTML = words[wave][i];
    } else {
      document.getElementById(`word${i + 1}`).innerHTML = "";
    }
    if (bossWave && !bossEnemiesWave && !gameOver) {
      //mettre animation de touche espace spam ici
      document.getElementById(`word${i + 1}`).innerHTML = "";
      document.getElementById("center-key-trigger").style.display = "flex";
    }
    if (bossWave && bossEnemiesWave) {
      if (wordsEnemiesBoss[i] !== undefined) {
        document.getElementById(`word${i + 1}`).innerHTML = wordsEnemiesBoss[i];
      } else {
        document.getElementById(`word${i + 1}`).innerHTML = "";
      }
    }
  }
  if (words[wave][0] === undefined) {
    for (let i = 0; i < 7; i++) {
      document.getElementById(`word${i + 1}`).innerHTML = "";
    }
    elementInformations.style.display = "none";
    informationShown = false;
    if ((wave + 2) % 10 === 0 && !gameOver) {
      bossWave = true;
      informationShown = true;

      elementInformations.innerHTML = `Boss en approche ! `;
      elementInformations.style.display = "flex";
      if (!gameOver && bosses.length === 0) {
        wave++;
      }
      pause = true;
      setTimeout(() => {
        elementInformations.innerHTML = "";
        elementInformations.style.display = "none";
        informationShown = false;

        pause = false;
      }, 1500);
    } else {
      if (!gameOver && bosses.length === 0) {
        elementInformations.innerHTML = `Round ${round + 1} !`;
        elementInformations.style.display = "flex";
        informationShown = true;
      }
      if (!gameOver && bosses.length === 0) {
        wave++;
      }
      pause = true;
      setTimeout(() => {
        pause = false;
        elementInformations.innerHTML = "";
        elementInformations.style.display = "none";
        informationShown = false;
      }, 1500);
    }
    elementRound.innerHTML = "Round : " + round;
  }
};
