// import { baseUrl, apiUrl } from '../config.js'
let allFrames = 0;
const animate = () => {
  requestAnimationFrame(animate);
  if (!bossWave) {
    document.getElementById("center-key-trigger").style.display = "none";
  }

  if (bosses.length > 0) {
    checkBossHealth();
  }

  if (hearts === 0) {
    if (!gameOver) {
      players.forEach((player) => {
        gameOver = true;
        setGameOver(player);
      });
    }
  }

  const positionImg = document.querySelectorAll(".arrow-key");
  if (positionImg.length > 0) {
    for (let index = 0; index < positionImg.length; index++) {
      const img = positionImg[index];
      const firstImg = positionImg[0];
      if (pause) {
        img.style.animationPlayState = "paused";
      } else {
        img.style.animationPlayState = "running";
      }
      img.style.animationDuration = `${timeToMiddle}s`;

      img.classList.add("move-key-to-center");
      var rect = img.getBoundingClientRect();
      var positionRectImg = {
        x: rect.left,
        y: rect.top,
      };

      var rect2 = firstImg.getBoundingClientRect();
      var positionRectImg2 = {
        x: rect2.left,
        y: rect2.top,
      };

      positionRectImgX = positionRectImg2.x;

      //perfect timing

      if (
        positionRectImg.x <= window.innerWidth / 2 - 24.5 &&
        positionRectImg.x >= window.innerWidth / 2 - 36.5
      ) {
        perfectTiming = true;
      } else {
        if (index === 0) {
          perfectTiming = false;
        }
      }

      //good timing

      if (
        positionRectImg.x >= window.innerWidth / 2 - 52.5 &&
        positionRectImg.x <= window.innerWidth / 2 + 52.5
      ) {
        goodTiming = true;
      } else {
        if (index === 0) {
          goodTiming = false;
        }
      }

      if (positionRectImg.x <= window.innerWidth / 2 - 52.5) {
        document.querySelectorAll(".arrow-key")[0].remove();
        activeShield = false;
        noteIndex++;
        goodTiming = false;
        perfectTiming = false;
        hearts -= 1;
        if (sendBossWaves === 0 && bosses.length > 0) {
          bosses[0].health -= damageBoss1;
        }
        if (sendBossWaves === 1 && bosses.length > 0) {
          bosses[0].health -= damageBoss2;
        }
        if (sendBossWaves === 2 && bosses.length > 0) {
          bosses[0].health -= damageBoss3;
        }
        //joué son fail ici pour le rythme
        wrongEntry++;
        const divTiming = document.createElement("div");
        divTiming.classList.add("bad-timing");
        const popTiming = document.createElement("p"); // Créer un nouvel élément div
        popTiming.textContent = "Miss - 1";
        popTiming.classList.add("pop-timing");
        divTiming.appendChild(popTiming);
        divTiming.style.left = `${positionRectImgX}px`;
        document.body.appendChild(divTiming);
        if (!gameOver) {
          wrongKeySound.triggerAttackRelease("A#4", "0.1t");
        }

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
          document
            .getElementById("multiplier")
            .classList.remove("shake-anim-x");
          document.getElementById("multiplier").style.display = "none";
        }, 500);
      }
    }
  }

  ctx.drawImage(image, 0, 0);
  htmlRender();
  setEnemiesSpeed();
  setBossesSpeed();
  if (enemies.length === 0 && bosses.length === 0) {
    const loggedUsername = JSON.parse(
      localStorage.getItem("login-data")
    )?.username;
    if (loggedUsername) {
      axios
        .post(
          `${apiUrl}/api/data/my-data`,
          {
            username: loggedUsername,
          }
        )
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
          const newTotalPlayingTime = (totalPlayingTime + hoursPlayed).toFixed(
            2
          );
          const previousAccuracy = response.data.accuracy;
          let newScore = 0;
          if (score > response.data.score) {
            newScore = score;
          } else {
            newScore = response.data.score;
          }
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
    }
    if (!bossWave) {
      spawnEnemies(words[wave].length, 0);
    } else {
      spawnBoss(1, 0);
    }
  }
  placementTiles.forEach((tile) => tile.update(mouse));

  if (sendBossWaves !== 0 && enemies.length === 0) {
    bossEnemiesWave = false;
  }

  players.forEach((player) => {
    player.update();
    player.target = null;
    selectTarget(player);

    for (let i = 0; i < player.projectiles.length; i++) {
      const projectile = player.projectiles[i];
      projectile.update();
      const xDifference = projectile.enemy.center.x - projectile.position.x;
      const yDifference = projectile.enemy.center.y - projectile.position.y;
      const distance = Math.hypot(xDifference, yDifference);
      if (distance < projectile.enemy.height + projectile.radius) {
        score++;
        if (projectile.enemy.health <= 0) {
          const enemyIndex = enemies.findIndex((enemy) => {
            return projectile.enemy === enemy;
          });
          if (enemyIndex > -1) {
            enemies.splice(enemyIndex, 1);
            words[wave].splice(0, 1);
          }
        }
        player.projectiles.splice(0, 1);
      }
    }
  });
  if (activeShield) {
    for (let i = shieldsAnimation.length - 1; i >= 0; i--) {
      const shieldAnim = shieldsAnimation[i];
      shieldAnim.draw();
      shieldAnim.update();
      if (
        shieldAnim.framesX.current >= shieldAnim.framesX.max - 1 &&
        shieldAnim.framesY.current >= shieldAnim.framesY.max - 1
      ) {
        shieldsAnimation.splice(i, 1);
      }
    }
  }

  bosses.forEach((boss) => {
    boss.update();
    setBossesDirection(boss);

    boss.target = null;
    boss.target = players[0];
    if (boss.projectilesBoss.length > 0) {
      for (let i = 0; i < boss.projectilesBoss.length; i++) {
        const projectileBoss = boss.projectilesBoss[i];

        projectileBoss.update();
        const xDifference =
          projectileBoss.player.center.x - projectileBoss.position.x;
        const yDifference =
          projectileBoss.player.center.y - projectileBoss.position.y;
        const distance = Math.hypot(xDifference, yDifference);
        if (boss.projectilesBoss.length === 0) {
          bossFire = false;
        }
        if (distance < projectileBoss.player.height + projectileBoss.radius) {
          boss.projectilesBoss.splice(0, 1);
        }
      }
    }

    const xLastWaypoint = waypoints[waypoints.length - 1].x;
    if (selectedTarget) {
      if (selectedTarget.position.x < xLastWaypoint) {
        selectedTarget = null;
        isSelected = false;
      }
    }
  });
  for (let i = frozenEnemies.length - 1; i >= 0; i--) {
    const frozenEnemy = frozenEnemies[i];
    frozenEnemy.draw();
    frozenEnemy.update();
    if (
      frozenEnemy.framesX.current >= frozenEnemy.framesX.max - 1 &&
      frozenEnemy.framesY.current >= frozenEnemy.framesY.max - 1
    ) {
      frozenEnemies.splice(i, 1);
    }
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];

    enemy.update();
    setEnemiesDirection(enemy);
    const xLastWaypoint = waypoints[waypoints.length - 1].x;
    if (selectedTarget) {
      if (selectedTarget.position.x < xLastWaypoint) {
        selectedTarget = null;
        isSelected = false;
      }
    }
    enemyHitPLayer(enemy, i);
    frozenBlastAnimation(enemy);
  }
  renderAnimation();

  if (pause) {
    speedBosses = 0;
  } else {
    speedBosses = initSpeedBosses;
  }
};
