class Player {

  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index - 1
    this.speed = 2.5;
    this.width = 2;
    this.height = 2;
    this.sprite = createSprite(this.x, this.y, 2 * tilewidth, 2 * tilewidth);
    this.movingRight = false;
    this.movingLeft = false;
    this.movingUp = false;
    this.movingDown = false;
  }

update(){
  // update moving character
  if (this.movingRight) {

    this.x += this.speed;
    this.sprite.position.x=this.x;
    console.log("this.x");
    console.log(this.x);
    console.log("sprite x");
    console.log(this.sprite.position.x);
    console.log("right");
    this.draw();
  }
  if (this.movingLeft) {
    this.x -= this.speed;
    this.sprite.position.x=this.x;
    console.log("left");
  }
  if (this.movingUp) {
  console.log("to y prin");
  console.log(this.y);
  this.y -= this.speed;
  this.sprite.position.y=this.y;
  console.log("update up");
  console.log("to y einai");
  console.log(this.y);
  }
  if (this.movingDown) {
    this.y += this.speed;
    this.sprite.position.y=this.y;
    console.log("down");
  }
  console.log("idk");
}
  draw() {
    console.log("sprite x meta einai ")
    console.log(this.sprite.position.x);
    console.log("sprite y meta einai ")
    console.log(this.sprite.position.y);
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
