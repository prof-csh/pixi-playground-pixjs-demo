export default class Duck extends PIXI.Sprite {
  speed = 2;

  constructor(parent) { 
    super(PIXI.Texture.from('https://image.ibb.co/kd0sRU/rubber_duck_PNG23.png'));
    this.scale.set(0.2);
    parent.addChild(this);
  }

  tick(delta) {
    if (this.target && this.target.parent) {
      const {x, y, dx, dy} = this.getVelocity();

      if (!this.target.hitPoints) {
        this.speed += 1;
        delete this.target;
        return;
      }

      if (this.isCloseToBread(dx, dy)) {
        this.x = this.target.x;
        this.y = this.target.y;
        this.eatBread();
        delete this.target;
        
        if (this.speed > 1) {
          this.speed -= 1;
        } 
      }
      else {
        this.x += x;
        this.y += y;
      }
    }
  }

  getVelocity() {
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const angle = Math.atan2(dy, dx);
    const x = Math.cos(angle) * this.speed;
    const y = Math.sin(angle) * this.speed;

    return { x, y, dx, dy };
  }

  isCloseToBread(dx, dy) {
    return Math.abs(dx) <= this.speed && Math.abs(dy) <= this.speed ? true : false;
  }

  eatBread() {
    this.target.hitPoints--;

    if (this.target.parent && !this.target.hitPoints) {
      this.target.parent.removeChild(this.target);
      clearTimeout(this.target.timeout);
    }
  }
}