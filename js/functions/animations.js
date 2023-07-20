// import { baseUrl, apiUrl } from '../config.js'
const frozenBlastAnimation = (enemy) => {
  if (frozen) {
    allFrames += speedSlowProjectiles;
    // ice under enemy
    frozenEnemies.push(
      new Sprite({
        position: {
          x: enemy.position.x,
          y: enemy.position.y,
        },
        imageSrc: `${baseUrl}/assets/ice.png`,
        framesX: { max: 1, hold: 5 },
        framesY: { max: 7, hold: 5 },
        offset: { x: 0, y: 0 },
      })
    );
    // ice blast
    slowProjectiles.push(
      new Sprite({
        position: {
          x: 315 + allFrames,
          y: 320,
        },
        imageSrc: `${baseUrl}/assets/frozenLaser.png`,
        framesX: { max: 1, hold: 20 },
        framesY: { max: 3, hold: 20 },
        offset: { x: -60, y: -30 },
      })
    );
  }
};

const shieldAnimation = () => {
  shieldsAnimation.push(
    new Sprite({
      position: {
        x: players[0].position.x,
        y: players[0].position.y,
      },
      imageSrc: `${baseUrl}/assets/shield.png`,
      framesX: { max: 4, hold: 10 },
      framesY: { max: 4, hold: 10 },
      offset: { x: 140, y: 40 },
    })
  );
};

const explosionEnemyAnimation = () => {
  explosionsEnemy.push(
    new Sprite({
      position: {
        x: enemies[0].position.x,
        y: enemies[0].position.y,
      },
      imageSrc:
        `${baseUrl}/assets/explosionEnemy.png`,
      framesX: { max: 9, hold: 5 },
      framesY: { max: 1, hold: 5 },
      offset: { x: 5, y: 0 },
    })
  );
};

const explosionEnemyPlayerHitAnimation = (enemy) => {
  explosionsPlayerHit.push(
    new Sprite({
      position: {
        x: enemy.position.x,
        y: enemy.position.y,
      },
      imageSrc:
        `${baseUrl}/assets/explosionPlayerHit.png`,
      framesX: { max: 11, hold: 5 },
      framesY: { max: 1, hold: 5 },
      offset: { x: -20, y: 0 },
    })
  );
};

const explosionPlayerHitAnimation = () => {
  explosionsPlayerHitBoss.push(
    new Sprite({
      position: {
        x: players[0].position.x,
        y: players[0].position.y,
      },
      imageSrc:
        `${baseUrl}/assets/explosionPlayerHit.png`,
      framesX: { max: 11, hold: 5 },
      framesY: { max: 1, hold: 5 },
      offset: { x: 105, y: 55 },
    })
  );
};

const explosionGameOverAnimation = (player, offsetExplosion) => {
  offsetExplosion = 150;

  explosionsGameOver.push(
    new Sprite({
      position: {
        x: player.position.x,
        y: player.position.y,
      },
      imageSrc:
        `${baseUrl}/assets/explosionGameOver.png`,
      framesX: { max: 14, hold: 5 },
      framesY: { max: 1, hold: 5 },
      offset: { x: -100 + offsetExplosion, y: 50 },
    })
  );

  setTimeout(() => {
    explosionsGameOver.push(
      new Sprite({
        position: {
          x: player.position.x,
          y: player.position.y,
        },
        imageSrc:
          `${baseUrl}/assets/explosionGameOver.png`,
        framesX: { max: 14, hold: 5 },
        framesY: { max: 1, hold: 5 },
        offset: { x: -130 + offsetExplosion, y: 50 },
      })
    );
  }, 250);

  setTimeout(() => {
    explosionsGameOver.push(
      new Sprite({
        position: {
          x: player.position.x,
          y: player.position.y,
        },
        imageSrc:
          `${baseUrl}/assets/explosionGameOver.png`,
        framesX: { max: 14, hold: 5 },
        framesY: { max: 1, hold: 5 },
        offset: { x: -130 + offsetExplosion, y: 50 },
      })
    );
    explosionsGameOver.push(
      new Sprite({
        position: {
          x: player.position.x,
          y: player.position.y,
        },
        imageSrc:
          `${baseUrl}/assets/explosionGameOver.png`,
        framesX: { max: 14, hold: 5 },
        framesY: { max: 1, hold: 5 },
        offset: { x: -100 + offsetExplosion, y: 40 },
      })
    );
  }, 500);

  setTimeout(() => {
    explosionsGameOver.push(
      new Sprite({
        position: {
          x: player.position.x,
          y: player.position.y,
        },
        imageSrc:
          `${baseUrl}/assets/explosionGameOver2.png `,
        framesX: { max: 11, hold: 5 },
        framesY: { max: 1, hold: 5 },
        offset: { x: -130 + offsetExplosion, y: 80 },
      })
    );
  }, 750);

  setTimeout(() => {
    explosionsGameOver.push(
      new Sprite({
        position: {
          x: player.position.x,
          y: player.position.y,
        },
        imageSrc:
          `${baseUrl}/assets/explosionGameOver2.png`,
        framesX: { max: 11, hold: 5 },
        framesY: { max: 1, hold: 5 },
        offset: { x: -80 + offsetExplosion, y: 30 },
      })
    );
    explosionsGameOver.push(
      new Sprite({
        position: {
          x: player.position.x,
          y: player.position.y,
        },
        imageSrc:
          `${baseUrl}/assets/explosionGameOver2.png`,
        framesX: { max: 11, hold: 5 },
        framesY: { max: 1, hold: 5 },
        offset: { x: -100 + offsetExplosion, y: 50 },
      })
    );
    explosionsGameOver.push(
      new Sprite({
        position: {
          x: player.position.x,
          y: player.position.y,
        },
        imageSrc:
          `${baseUrl}/assets/explosionGameOver2.png`,
        framesX: { max: 11, hold: 5 },
        framesY: { max: 1, hold: 5 },
        offset: { x: -130 + offsetExplosion, y: 80 },
      })
    );
  }, 1000);
};

const armExplosion = (offsetX, offsetY) => {
  if (bosses.length > 0) {
    explosionsArms.push(
      new Sprite({
        position: {
          x: bosses[0].position.x,
          y: bosses[0].position.y,
        },
        imageSrc:`${baseUrl}/assets/explosionGameOver.png`,
        framesX: { max: 14, hold: 5 },
        framesY: { max: 1, hold: 5 },
        offset: { x: offsetX, y: offsetY },
      })
    );
  }
};

const renderAnimation = () => {
  for (let i = explosionsPlayerHitBoss.length - 1; i >= 0; i--) {
    const explosionPlayerHitBoss = explosionsPlayerHitBoss[i];
    explosionPlayerHitBoss.draw();
    explosionPlayerHitBoss.update();
    if (
      explosionPlayerHitBoss.framesX.current >=
        explosionPlayerHitBoss.framesX.max - 1 &&
      explosionPlayerHitBoss.framesY.current >=
        explosionPlayerHitBoss.framesY.max - 1
    ) {
      explosionsPlayerHitBoss.splice(i, 1);
    }
  }

  for (let i = explosionsArms.length - 1; i >= 0; i--) {
    const explosionArm = explosionsArms[i];
    explosionArm.draw();
    explosionArm.update();
    if (
      explosionArm.framesX.current >= explosionArm.framesX.max - 1 &&
      explosionArm.framesY.current >= explosionArm.framesY.max - 1
    ) {
      explosionsArms.splice(i, 1);
    }
  }

  for (let i = slowProjectiles.length - 1; i >= 0; i--) {
    const slowProjectile = slowProjectiles[i];
    slowProjectile.draw();
    slowProjectile.update();
    if (
      slowProjectile.framesX.current >= slowProjectile.framesX.max - 1 &&
      slowProjectile.framesY.current >= slowProjectile.framesY.max - 1
    ) {
      slowProjectiles.splice(i, 1);
    }
  }

  for (let i = explosionsEnemy.length - 1; i >= 0; i--) {
    const explosionEnemy = explosionsEnemy[i];
    explosionEnemy.draw();
    explosionEnemy.update();
    if (
      explosionEnemy.framesX.current >= explosionEnemy.framesX.max - 1 &&
      explosionEnemy.framesY.current >= explosionEnemy.framesY.max - 1
    ) {
      explosionsEnemy.splice(i, 1);
    }
  }

  for (let i = explosionsPlayerHit.length - 1; i >= 0; i--) {
    const explosionPlayerHit = explosionsPlayerHit[i];
    explosionPlayerHit.draw();
    explosionPlayerHit.update();
    if (
      explosionPlayerHit.framesX.current >=
        explosionPlayerHit.framesX.max - 1 &&
      explosionPlayerHit.framesY.current >= explosionPlayerHit.framesY.max - 1
    ) {
      explosionsPlayerHit.splice(i, 1);
    }
  }

  for (let i = explosionsGameOver.length - 1; i >= 0; i--) {
    const explosionGameOver = explosionsGameOver[i];
    explosionGameOver.draw();
    explosionGameOver.update();
    if (
      explosionGameOver.framesX.current >= explosionGameOver.framesX.max - 1 &&
      explosionGameOver.framesY.current >= explosionGameOver.framesY.max - 1
    ) {
      explosionsGameOver.splice(i, 1);
    }
  }
};
