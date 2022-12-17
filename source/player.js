class Player {

  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;

    this.width = 2;
    this.height = 2;

    this.sprite = createSprite(this.x, this.y, 2*tilewidth, 2*tilewidth);
    // this.addImage();
  }

  setup() {
    // let c = color('#0f0');
    // fill(c);


  }

  draw() {

    // if (keyIsDown(LEFT_ARROW)) {
    //   this.x -= 2.5;
    // }
    //
    // if (keyIsDown(RIGHT_ARROW)) {
    //   this.x += 2.5;
    // }
    //
    // if (keyIsDown(UP_ARROW)) {
    //   this.y -= 2.5;
    // }
    //
    // if (keyIsDown(DOWN_ARROW)) {
    //   this.y += 2.5;
    // }
    // ellipse(this.x, this.y,2*tilewidth,2*tilewidth);
    this.addImage();
  }

  addImage() {
      let img, x1, y1;
      x1 = this.index % playerset_row_blocks;
      y1 = Math.trunc(this.index / playerset_row_blocks);
      img = playerset.get(x1*spritewidth, y1*spritewidth, spritewidth*this.width, spritewidth*this.height);
      this.sprite.addImage(img, tilewidth);
  }

}
