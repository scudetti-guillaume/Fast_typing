// import { baseUrl, apiUrl } from '../config.js'
//player
class Player extends Sprite {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      imageSrc: `${baseUrl}/assets/player.png`,
      framesX: { max: 1, hold: 1 },
      framesY: { max: 1, hold: 1 },
      offset: {
        x: 0,
        y: 0,
      },
    });
    this.width = 10;
    this.height = 10;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.projectiles = [];
    this.slowProjectiles = [];
    this.radius = 1000;
    this.target;
    this.elapsedSpawnTime = 0;
  }
  draw() {
    super.draw();
  }

  update() {
    this.draw();
    super.update();
    if (this.target) {
      if (rightkey) {
        this.projectiles.push(
          new Projectile({
            position: {
              x: this.center.x + 100,
              y: this.center.y + 60,
            },
            enemy: this.target,
          })
        );
        rightkey = false;
      }
    }
    this.elapsedSpawnTime++;
  }
}
players.push(
  new Player({
    position: {
      x: 170,
      y: 250,
    },
  })
);
