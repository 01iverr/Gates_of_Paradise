class Player {

  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index - 1
    this.speed = 3;
    this.width = 2;
    this.height = 2;
    this.sprite = createSprite(this.x, this.y, 2 * tilewidth, 2 * tilewidth);
    this.sprite.collider = 'static';
    this.coins=0;

  }

  update() {
    if  (kb.pressing(UP_ARROW)) {
      this.sprite.position.y -= this.speed;
      // this.shadow.position.y -= this.speed;
    }
    if (kb.pressing(DOWN_ARROW)) {
      this.sprite.position.y += this.speed;
      // this.shadow.position.y += this.speed;
    }
    if (kb.pressing(LEFT_ARROW)) {
      this.sprite.position.x -= this.speed;
      // this.shadow.position.x-= this.speed;
    }
    if (kb.pressing(RIGHT_ARROW)) {
      this.sprite.position.x += this.speed;
      // this.shadow.position.x += this.speed;
    }
    if (this.sprite.overlap(gameMap.coins, this.getCoins)) {
      this.coins += 1;

    }
  }

  getCoins(player, coin){
      coin.remove();
    }
  draw() {
    console.log("sprite x meta einai ")
    console.log(this.sprite.position.x);
    console.log("sprite y meta einai ")
    console.log(this.sprite.position.y);
    // this.shadow.draw();
    this.addImage();
    this.sprite.draw()
  }

  addImage() {
    let img, x1, y1;
    x1 = this.index % playerset_row_blocks;
    y1 = Math.trunc(this.index / playerset_row_blocks);
    img = playerset.get(x1 * spritewidth, y1 * spritewidth, spritewidth * this.width, spritewidth * this.height);
    this.sprite.addImage(img, tilewidth);
  }

}
