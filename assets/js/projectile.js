class Projectile {
  constructor(x, y, target, damage) {
    this.maxSpeedX = 10;
    this.maxSpeedY = 10;
    this.speedX = 0;
    this.speedY = 0;
    this.damage = damage;
    this.target = target;
    this.sprite = new Rectangle(x, y, 10, 10, '#00ff00');
  }

  move() {
    this.#getTickVelocity();

    this.sprite.updatePosition(
      this.sprite.x + this.speedX,
      this.sprite.y + this.speedY,
    );

    if (this.reachedTarget()) {
      this.inflictDamage();

      if (this.target.health <= 0) {
        this.target.die();
      }

      this.die();
    }

    if (this.outOfBounds()) {
      this.die();
    }
  }

  die() {
    const index = game.currentMap.projectiles.findIndex(
      projectile => projectile == this
    );

    game.currentMap.projectiles.splice(index, 1);
  }

  reachedTarget() {
    if (
      (this.sprite.xAnchor > this.target.sprite.x &&
       this.sprite.xAnchor < (this.target.sprite.x + this.target.sprite.width)) &&
      (this.sprite.yAnchor > this.target.sprite.y &&
       this.sprite.yAnchor < (this.target.sprite.y + this.target.sprite.height))
    ) {
      return true;
    } else {
      return false;
    }
  }

  outOfBounds() {
    if (
      this.sprite.xAnchor < 0 ||
      this.sprite.xAnchor > game.currentMap.width ||
      this.sprite.yAnchor < 0 ||
      this.sprite.yAnchor > game.currentMap.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  #getTickVelocity() {
    // Attempt 4
    const xDelta = this.target.sprite.xAnchor - this.sprite.xAnchor;
    const yDelta = this.target.sprite.yAnchor - this.sprite.yAnchor;

    // Get vector magnitude (hypotenuse) w/ pythagorean theorem
    const magnitude = Math.sqrt(
      Math.pow(xDelta, 2) + Math.pow(yDelta, 2)
    );

    // If magnitude is within boundary, accept final speeds
    if (magnitude <= this.maxSpeedX) {
      this.speedX = xDelta;
      this.speedY = yDelta;
      return
    }

    // Find modifier to scale down to maxSpeed w/ (maxSpeed/hyp)
    const scalingModifer = this.maxSpeedX / magnitude;

    // Apply modifier to x/y sides of triangle
    this.speedX = xDelta * scalingModifer;
    this.speedY = yDelta * scalingModifer;

    // Attempt 3
    // const xDelta = this.target.sprite.xAnchor - this.sprite.xAnchor;
    // const yDelta = this.target.sprite.yAnchor - this.sprite.yAnchor;

    // const slope = (yDelta / xDelta);

    // if (Math.abs(yDelta) == Math.abs(xDelta)) {
    //   this.speedY = this.maxSpeedY;
    //   this.speedX = this.maxSpeedX;
    // } else if (Math.abs(yDelta) > Math.abs(xDelta)) {
    //   this.speedY = this.maxSpeedY;
    //   this.speedX = this.maxSpeedX / slope;
    // } else{
    //   this.speedX = this.maxSpeedX;
    //   this.speedY = this.maxSpeedY * slope;
    // }

    // if (xDelta < 0) {
    //   this.speedX *= -1;
    // }

    // if (yDelta < 0) {
    //   this.speedY *= -1;
    // }

    // Attempt 2
    // const xDelta = this.target.sprite.xAnchor - this.sprite.xAnchor;
    // const yDelta = this.target.sprite.yAnchor - this.sprite.yAnchor;

    // if (Math.abs(xDelta) < this.maxSpeedX) {
    //   this.speedX = xDelta;
    // } else {
    //   this.speedX = (xDelta > 0 ? this.maxSpeedX : this.maxSpeedX * -1);
    // }

    // if (Math.abs(yDelta) < this.maxSpeedY) {
    //   this.speedY = yDelta;
    // } else {
    //   this.speedY = (yDelta > 0 ? this.maxSpeedY : this.maxSpeedY * -1);
    // }

    // Attempt 1
    // if (this.target.sprite.xAnchor < this.sprite.xAnchor) {
    //   this.speedX = (this.maxSpeedX * -1);
    // } else if (this.target.sprite.xAnchor > this.sprite.xAnchor) {
    //   this.speedX = this.maxSpeedX;
    // } else {
    //   this.speedX = 0;
    // }

    // if (this.target.sprite.yAnchor < this.sprite.yAnchor) {
    //   this.speedY = (this.maxSpeedY * -1);
    // } else if (this.target.sprite.yAnchor > this.sprite.yAnchor) {
    //   this.speedY = this.maxSpeedY;
    // } else {
    //   this.speedY = 0;
    // }
  }

  inflictDamage() {
    this.target.modifyHealth(this.damage * -1);
    this.target.attackingPlayer = true;
  }

  render() {
    this.sprite.render();
    // game.ctx.beginPath();
    // game.ctx.strokeStyle = '#00ff00';
    // game.ctx.lineWidth = 2.0;
    // game.ctx.moveTo(game.player.sprite.x + (game.player.sprite.width/2), (game.player.sprite.y + (game.player.sprite.height/2)));
    // game.ctx.lineTo(game.player.enemyTarget.sprite.x + (game.player.enemyTarget.sprite.width/2), (game.player.enemyTarget.sprite.y + (game.player.enemyTarget.sprite.height/2)));
    // game.ctx.stroke();
  }
}

