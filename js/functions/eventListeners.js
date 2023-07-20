let noteIndex = 0;
document.addEventListener("keyup", (event) => {
  pressed = false;
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    if (!pause) {
      setPause();
    } else {
      removePause();
    }
  }
  if (event.key === "'") {
    event.preventDefault();
  }

  if (event.key === "ArrowUp") {
    if (!pressed) {
      pressed = true;

      const TIME_TO_PLAY = "0.8t";
      const letterToTypeBoss = document.getElementById("letter-to-type-boss");
      const ARROW_KEY_CLASS = ".arrow-key";
      const keyToRemove = document.querySelectorAll(ARROW_KEY_CLASS);

      if (goodTiming) {
        kickTrigger = true;
        activeShield = true;
        letterToTypeBoss.removeChild(keyToRemove[0]);

        if (sendBossWaves === 0) {
          bosses[0].health -= damageBoss1;
        }
        if (sendBossWaves === 1) {
          bosses[0].health -= damageBoss2;
        }
        if (sendBossWaves === 2) {
          bosses[0].health -= damageBoss3;
        }
        if (!gameOver) {
          goodKeySound.triggerAttackRelease(
            melodyToPlay[noteIndex],
            TIME_TO_PLAY
          );
        }
        noteIndex++;
        if (goodTiming && !perfectTiming) {
          activeShield = true;
          goodReward();
          const divTiming = document.createElement("div");
          divTiming.classList.add("good-timing");
          const popTiming = document.createElement("p"); // Créer un nouvel élément div
          popTiming.textContent = "GOOD + 1 pts";
          popTiming.classList.add("pop-timing");
          divTiming.style.left = `${positionRectImgX}px`;
          divTiming.appendChild(popTiming);
          document.body.appendChild(divTiming); // Ajouter le nouvel élément div au corps de la page
        } else if (perfectTiming) {
          activeShield = true;
          perfectReward();
          const divTiming = document.createElement("div");
          divTiming.classList.add("perfect-timing");
          const popTiming = document.createElement("p"); // Créer un nouvel élément div
          popTiming.textContent = "PERFECT + 2 pts";
          popTiming.classList.add("pop-timing");
          divTiming.appendChild(popTiming);
          document.body.appendChild(divTiming); // Ajouter le nouvel élément div au corps de la page
        }
        goodTiming = false;
        perfectTiming = false;
        goodKey();
      } else if (
        bossWave &&
        keyToRemove.length > 0 &&
        !goodTiming &&
        !perfectTiming
      ) {
        kickTrigger = true;
        activeShield = true;
        if (sendBossWaves === 0) {
          bosses[0].health -= damageBoss1;
        }
        if (sendBossWaves === 1) {
          bosses[0].health -= damageBoss2;
        }
        if (sendBossWaves === 2) {
          bosses[0].health -= damageBoss3;
        }

        hearts -= 1;

        letterToTypeBoss.removeChild(keyToRemove[0]);

        const divTiming = document.createElement("div");
        divTiming.classList.add("bad-timing");
        const popTiming = document.createElement("p"); // Créer un nouvel élément div
        popTiming.textContent = "Miss - 1 vie";
        popTiming.classList.add("pop-timing");
        divTiming.appendChild(popTiming);
        divTiming.style.left = `${positionRectImgX}px`;
        document.body.appendChild(divTiming);

        // mettre un son de mauvaise note
        if (!gameOver) {
          kickTrigger = true;
          activeShield = true;
          wrongKeySound.triggerAttackRelease("A#4", "0.1t");
        }
        noteIndex++;
      }
    }
  }

  checkMaj(event); // check if capslock is on

  //exclude keys that are not letters
  if (filteredKeys.includes(event.key)) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  if (!pause) {
    const letter = event.key.toLowerCase();
    event.stopImmediatePropagation();
    //if it's boss wave, only spacebar is allowed
    if (bossWave && bosses.length !== 0 && !bossEnemiesWave) {
    } else {
      // if it's not boss wave
      if (
        enemies.length !== 0
        // && enemies[0].position.x < canvas.width
      ) {
        if (
          (words.length > 0 &&
            words[wave][0][0] === letter &&
            !bossEnemiesWave) ||
          (wordsEnemiesBoss.length > 0 &&
            bossEnemiesWave &&
            wordsEnemiesBoss[0][0] === letter)
        ) {
          goodKey(event);
        } else {
          wrongKey(event);
        }
        if (enemies[0].health <= 0) {
          // si probleme vie regarder ici
          explosionEnemyAnimation();
          enemies.splice(0, 1);
          explosionEnemyAudio.currentTime = 0;
          explosionEnemyAudio.play();
          words[wave].splice(0, 1);
          if (bossEnemiesWave) {
            wordsEnemiesBoss.splice(0, 1);
          }
          htmlRender();
        }

        if (words[wave] !== undefined && !bossEnemiesWave) {
          if (words[wave][0] === "") {
            words[wave].splice(0, 1);
            enemies.splice(0, 1);
            htmlRender();
          }
          if (wordsEnemiesBoss[0] === "") {
            wordsEnemiesBoss.splice(0, 1);
            htmlRender();
          }
        }
      }
    }
    //slow tower
    if (event.key === "F1") {
      event.preventDefault();
      if (!bossWave) frozeEnemies();
    }
  }
});
