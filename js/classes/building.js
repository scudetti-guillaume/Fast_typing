//Building
class Building extends Sprite {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      // imageSrc: "../assets/tower.png",
      framesX: { max: 19, hold: 1 },
      framesY: { max: 1, hold: 1 },
      offset: {
        x: 0,
        y: 0,
      },
    });
    this.width = 64 * 2;
    this.height = 64;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.projectiles = [];
    this.radius = 1000;
    this.target;
    this.elapsedSpawnTime = 0;
  }
  draw() {
    super.draw();
    //radius
    // ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    // ctx.fillStyle = "rgba(0,0,255,0.1)";
    // ctx.fill();
  }

  update() {
    this.draw();
    super.update();
    if (this.elapsedSpawnTime % fireRate === 0 && this.target) {
      // this.projectiles.push(
      //   new Projectile({
      //     position: {
      //       x: this.center.x,
      //       y: this.center.y,
      //     },
      //     enemy: this.target,
      //   })
      // );
    }
    this.elapsedSpawnTime++;
  }
}
