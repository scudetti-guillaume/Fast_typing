// import { baseUrl, apiUrl } from '../config.js'
//Enemies
class Enemy extends Sprite {
  constructor(
    currentIndex,
    { position = { x: this.position.x, y: this.position.y } }
  ) {
    super({
      position,
      imageSrc:
        `${baseUrl}/assets/enemy_level_1_left.png`,
      framesX: { max: 1, hold: 1 },
      framesY: { max: 1, hold: 1 },
      offset: {
        x: 0,
        y: 0,
      },
    });
    this.position = position;
    this.currentIndex = currentIndex; // replace by randomId for unique and random word
    this.width = 65;
    this.height = 65;
    this.waypointIndex = 2;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

    this.wordBoss = wordsEnemiesBoss[this.currentIndex];
    this.fullWordBoss = wordsEnemiesBoss[this.currentIndex];

    this.word = words[wave][this.currentIndex];
    this.fullWord = words[wave][this.currentIndex];

    this.selected = false;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.health = 100;
  }

  draw() {
    super.draw();
    //health bar

    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y - 15, this.width, 3.8);

    ctx.fillStyle = "green";
    ctx.fillRect(
      this.position.x,
      this.position.y - 15,
      (this.width * this.health) / 100,
      4
    );
  }

  update() {
    this.draw();
    super.update();
    const waypoint = waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    const angle = Math.atan2(yDistance, xDistance);
    this.velocity.x = Math.cos(angle) * speedEnemies;
    this.velocity.y = Math.sin(angle) * speedEnemies;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
        Math.abs(this.velocity.x * 3) &&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
        Math.abs(this.velocity.y * 3) &&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++;
    }
  }
}
