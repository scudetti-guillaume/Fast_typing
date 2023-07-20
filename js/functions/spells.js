const frozeEnemies = () => {
  countdown = 5;
  if (coins >= slowTowerPrice) {
    if (!slowTowerOccupied) {
      coins -= slowTowerPrice;
      slowTowerOccupied = true;
      frozen = true;
      speedEnemies = initSpeedEnemies / 4;
      frozenBlastAudio.currentTime = 0;
      frozenBlastAudio.play();
      countdownDiv.style.display = "block";
      setTimeout(() => {
        buildings.splice(0, 1);
        speedEnemies = initSpeedEnemies;
        slowTowerOccupied = false;
        frozen = false;
        countdownDiv.style.display = "none";
        allFrames = 0;
        countdown = 0;
      }, 5000);

      htmlRender();
    }
  } else {
    failCoinAudio.currentTime = 0;
    failCoinAudio.play();
    document.getElementById("coins").style.color = "red";
    document.getElementById("coins").classList.add("shake-anim-x");
    setTimeout(() => {
      document.getElementById("coins").style.color = "white";
      document.getElementById("coins").classList.remove("shake-anim-x");
    }, 1000);
  }
};
