class Sprite {
  constructor({
    position = { x: 0, y: 0 },
    imageSrc,
    framesX = { max: 1 },
    framesY = { max: 1 },
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.framesX = {
      max: framesX.max,
      current: 0,
      elapsed: 0,
      hold: framesX.hold,
    };
    this.framesY = {
      max: framesY.max,
      current: 0,
      elapsed: 0,
      hold: framesX.hold,
    };
    this.offset = offset;
  }
  draw() {
    const cropWidth = this.image.width / this.framesX.max;
    const cropHeight = this.image.height / this.framesY.max;
    const crop = {
      position: {
        x: cropWidth * this.framesX.current,
        y: cropHeight * this.framesY.current,
      },
      width: cropWidth,
      height: cropHeight,
    };

    ctx.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      this.position.x + this.offset.x,
      this.position.y + this.offset.y,
      crop.width,
      crop.height
    );
  }
  update() {
    this.framesX.elapsed++;
    this.framesY.elapsed++;
    if (this.framesX.elapsed % this.framesX.hold === 0) {
      this.framesX.current++;
      if (this.framesX.current >= this.framesX.max) {
        this.framesX.current = 0;
      }
    }
    if (this.framesY.elapsed % this.framesY.hold === 0) {
      this.framesY.current++;
      if (this.framesY.current >= this.framesY.max) {
        this.framesY.current = 0;
      }
    }
  }
}
