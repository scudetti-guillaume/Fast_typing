// import { baseUrl, apiUrl } from '../config.js'
const spawnEnemies = (spawnCount, currentIndex) => {
  if (enemies.length === 0 && !bossWave) {
    for (let i = 0; i < spawnCount; i++) {
      currentIndex = i;
      combinedOffset += xOffset;
      enemies.push(
        new Enemy(currentIndex, {
          position: { x: waypoints[2].x + combinedOffset, y: waypoints[2].y },
        })
      );
      if (i === spawnCount - 1) {
        combinedOffset = 0;
      }
      enemiesSpawn++;
    }
  } else {
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
  }
};

const setEnemiesDirection = (enemy) => {
  //define enemy direction
  let lastPositionX = enemy.position.x;
  let lastPositionY = enemy.position.y;
  let moveTreshold = 2;
  setTimeout(() => {
    let newPositionX = enemy.position.x;
    let newPositionY = enemy.position.y;
    if (Math.abs(newPositionX - lastPositionX) > moveTreshold) {
      if (newPositionX < lastPositionX) {
        enemy.image.src =
          `${baseUrl}/assets/enemy_level_1_left.png`;
      } else if (newPositionX > lastPositionX) {
        enemy.image.src =
           `${baseUrl}/assets/enemy_level_1_right.png`;
      }
    }
    if (Math.abs(newPositionY - lastPositionY) > moveTreshold) {
      if (newPositionY < lastPositionY) {
        enemy.image.src =
          `${baseUrl}/assets/enemy_level_1_up.png`;
      } else if (newPositionY > lastPositionY) {
        enemy.image.src =
            `${baseUrl}/assets/enemy_level_1_down.png`;
      }
    }
    lastPositionX = newPositionX;
    lastPositionY = newPositionY;
  }, 100);
};

const enemyHitPLayer = (enemy, i) => {
  const xLastWaypoint = waypoints[waypoints.length - 1].x;
  if (enemy.position.x < xLastWaypoint) {
    playerHit = true;
    setTimeout(() => {
      playerHit = false;
    }, 2000);
    explosionEnemyPlayerHitAnimation(enemy);
    explosionEnemySound();
    hearts -= 1;
    words[wave].splice(0, 1);
    enemies.splice(i, 1);
    selectedTarget = null;
  }
};

const setEnemiesSpeed = () => {
  if (playerHit) {
    // speedEnemies = 0.1;
  } else if (pause || gameOver) {
    speedEnemies = 0;
  } else if (frozen) {
    speedEnemies = initSpeedEnemies / 4;
  } else if (enemies.length > 0 && !slowTowerOccupied) {
    if (enemies[0].position.x > canvas.width) {
      speedEnemies = 30;
    } else if (!gameOver) {
      speedEnemies = initSpeedEnemies + wave / 25;
    }
  } else {
    speedEnemies = initSpeedEnemies + wave / 25;
  }
};
