// import { baseUrl, apiUrl } from '../config.js'
const spawnBoss = (spawnCount, currentIndex) => {
  kickTrigger = false;
  activeShield = false;
  enableToSetPause = false;
  setTimeout(() => {
    enableToSetPause = true;
  }, 2000);
  let now = Tone.now();
  Tone.Transport.bpm.value = musicBpm;

  // Tone.Transport.start();
  function setup() {
    timeToMiddle = 1200 / musicBpm;

    spawnImageKeys();

    Tone.Transport.start();
  }
  setup();

  if (!gameOver) playSequence(now);
  if (bosses.length === 0) {
    for (let i = 0; i < spawnCount; i++) {
      currentIndex = i;
      combinedOffset += xOffset;
      bosses.push(
        new Boss(currentIndex, {
          position: { x: waypoints[2].x, y: waypoints[2].y },
        })
      );
      bossSpawn++;
    }
  }
};

// Créez un objet pour stocker les images
const bossImages = {};

// Chargez les images et stockez-les dans l'objet
bossImages["left"] = new Image();
bossImages["left"].src =
  `${baseUrl}/assets/boss_level_1_left.png `;
bossImages["right"] = new Image();
bossImages["right"].src =
  `${baseUrl}/assets/boss_level_1_right.png`;
bossImages["up"] = new Image();
bossImages["up"].src =
  `${baseUrl}/assets/boss_level_1_up.png`;
bossImages["down"] = new Image();
bossImages["down"].src =
  `${baseUrl}/assets/boss_level_1_down.png`;
bossImages["destroy-13"] = new Image();
bossImages["destroy-13"].src =
  `${baseUrl}/assets/boss_level_1_left_13.png`;
bossImages["destroy-23"] = new Image();
bossImages["destroy-23"].src =
  `${baseUrl}/assets/boss_level_1_left_23.png`;

const setBossesDirection = (boss) => {
  // Define enemy direction
  let lastPositionX = boss.position.x;
  let lastPositionY = boss.position.y;
  let moveTreshold = 0.1;

  setTimeout(() => {
    let newPositionX = boss.position.x;
    let newPositionY = boss.position.y;
    if (bosses.length > 0) {
      if (bosses[0].position.y <= waypoints[5].y && !destroyed) {
        boss.image = bossImages["left"];
        finalBossPoisition = true;
      }
      if (Math.abs(newPositionX - lastPositionX) > moveTreshold) {
        if (newPositionX < lastPositionX) {
          boss.image = bossImages["left"];
        } else if (newPositionX > lastPositionX) {
          boss.image = bossImages["right"];
        }
      }
      if (
        Math.abs(newPositionY - lastPositionY) > moveTreshold &&
        boss.position.x < canvas.width - 20
      ) {
        if (newPositionY < lastPositionY) {
          boss.image = bossImages["up"];
        } else if (newPositionY > lastPositionY) {
          boss.image = bossImages["down"];
        }
      }
      if (boss.position.x > canvas.width) {
        // console.log("plus loin");
        boss.image = bossImages["left"];
      }
      lastPositionX = newPositionX;
      lastPositionY = newPositionY;
    }
  }, 200);
};
const setBossesSpeed = () => {
  if (pause) {
    speedBosses = 0;
  } else if (gameOver) {
    speedBosses = 0;
  } else if (finalBossPoisition) {
    speedBosses = 0;
  } else if (bosses.length > 0) {
    if (bosses[0].position.x > canvas.width && !pause) {
      speedBosses = 50;
    } else {
      if (!gameOver && !pause) {
        // speedBosses = initSpeedBosses;
      }
    }
  } else {
    if (!pause) {
      // speedBosses = initSpeedBosses;
    }
  }
};

const spawnBossEnemies = (spawnCount, currentIndex) => {
  for (let i = 0; i < spawnCount; i++) {
    currentIndex = i;
    combinedOffset += xOffset;
    enemies.push(
      new Enemy(currentIndex, {
        position: { x: waypoints[2].x + combinedOffset, y: waypoints[2].y },
      })
    );
    enemiesSpawn++;
  }
};

const checkBossHealth = () => {
  if (bosses.length > 0) {
    if (bosses[0].health === 100) {
      destroyed = false;
    }

    if (bosses[0].health < 66 && sendBossWaves === 0 && destroyed === false) {
      destroyed = true;
      armExplosion(-20, -50);
      explosionEnemySound();

      setTimeout(() => {
        armExplosion(50, -50);
        explosionEnemySound();
      }, 500);
      setTimeout(() => {
        destroyed = true;
        bosses[0].image = bossImages["destroy-13"];
      }, 750);
      sendBossWaves++;
      //jouer l'annimation et la deuxieme séquence
    }
    if (bosses[0].health <= 33 && sendBossWaves === 1) {
      setTimeout(() => {
        destroyed = true;
        armExplosion(-20, 50);
        explosionEnemySound();

        setTimeout(() => {
          armExplosion(50, 50);
          explosionEnemySound();
        }, 500);
        setTimeout(() => {
          bosses[0].image = bossImages["destroy-23"];
        }, 750);
        //jouer l'annimation et la deuxieme séquence
      }, 2000);
      sendBossWaves++;
    }
    if (bosses[0].health <= 0 && sendBossWaves === 2) {
      sendBossWaves = 0;
      kickTrigger = false;
      activeShield = false;
      armExplosion(-20, 50);
      explosionEnemySound();
      setTimeout(() => {
        armExplosion(50, 50);
        explosionEnemySound();
      }, 250);
      setTimeout(() => {
        armExplosion(-20, -50);
        explosionEnemySound();
      }, 750);
      setTimeout(() => {
        armExplosion(80, 50);
        explosionEnemySound();
      }, 800);
      setTimeout(() => {
        armExplosion(-60, -50);
        explosionEnemySound();
      }, 900);
      armExplosion(40, 50);
      armExplosion(-30, -50);
      explosionEnemySound();
      explosionEnemySound();
      loopFire1 = 0;
      loopFire2 = 0;
      noteIndex = 0;
      destroyed = false;
      sendBossWaves = 0;
      bossEnemiesWave = false;
      bossSpawn = 0;
      Tone.Transport.stop();
      Tone.Transport.cancel();
      musicBpm += 10;
      bosses.splice(0, 1);
      finalBossPoisition = false;
      bossWave = false;
      wave++;
      // Tone.Transport.bpm.value = musicBpm;
      document.getElementById("icons-powers").style.display = "flex";
    }
  }
};
