// import { baseUrl, apiUrl } from '../config.js'
//Projectile
class ProjectileBoss extends Sprite {
  constructor({ position = { x: 0, y: 0 }, player }) {
    super({
      position,
      imageSrc:
        `${baseUrl}/assets/explosionPlayerHit.png`,
      framesX: { max: 11, hold: 5 },
      framesY: { max: 1, hold: 5 },
      offset: {
        x: -100,
        y: -47,
      },
    });

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.player = player;
    this.radius = 250; // faire varier pour toucher le joueur ou le bouclier
    projectilesBoss.push(this);
  }

  update() {
    this.draw();
    super.update();
    const angle = Math.atan2(
      this.player.center.y - this.position.y + 100,
      this.player.center.x - this.position.x + 150
    );
    this.velocity.x = Math.cos(angle) * speedProjectilesBoss;
    this.velocity.y = Math.sin(angle) * speedProjectilesBoss;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
