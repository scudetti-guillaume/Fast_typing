const selectTarget = (player) => {
  if (!bossWave && enemies.length > 0) {
    player.target = enemies[0];
  }
  if (bosses.length > 0 && enemies.length === 0 && !bossEnemiesWave) {
    player.target = bosses[0];
  }
  if (bossWave && enemies.length > 0) {
    player.target = enemies[0];
  }
};
