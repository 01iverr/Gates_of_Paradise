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
    this.addAnimation();
    this.changeAnimation("walking_right");
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
      this.changeAnimation("walking_left");
      // this.shadow.position.x-= this.speed;
    }
    if (kb.pressing(RIGHT_ARROW)) {
      this.sprite.position.x += this.speed;
      this.changeAnimation("walking_right");
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
    // console.log("sprite x meta einai ")
    // console.log(this.sprite.position.x);
    // console.log("sprite y meta einai ")
    // console.log(this.sprite.position.y);
    // this.shadow.draw();
    this.sprite.draw()
  }

  /**
   * Change player animation.
   * @param {String} animation animation to use (walking_right | walking_left | pray | praying)
   */
  changeAnimation(animation) {
    let valid_values = ["walking_right", "walking_left", "pray", "praying"];
    if (valid_values.includes(animation)) {
        this.sprite.changeAnimation(animation);
        console.log("[SUCCESS] Player animation changed to:", animation);
    } else {
        console.log("[ERROR] Invalid value given for player animation:", animation);
    }
  }

  /**
   * Add animation frames to item.
   * Animations added: walking_right, walking_left, pray, praying
   */
  addAnimation() {
    // Get grame indexes
    let indexList = this.getAnimationIndexes();

    // Get image for each frame
    let frames = [[],[],[],[]];
    for (let i=0; i<indexList.length; i++){     // loop animation type (walking, pray, praying)
      for (let j=0; j<indexList[i].length; j++){   // loop animation frames
        frames[i][j] = this.loadImage(indexList[i][j]);
      }
    }

    // Add animation
    this.sprite.addAnimation("walking_right", 
        frames[0][0], frames[0][1], frames[0][2]);
    this.sprite.addAnimation("walking_left", 
        frames[1][0], frames[1][1], frames[1][2]);
    this.sprite.addAnimation("pray", 
        frames[2][0], frames[2][1], frames[2][2]);
    this.sprite.addAnimation("praying", 
        frames[3][0], frames[3][1], frames[3][2]);
  }

  /**
   * Gets image cut at index, based on object dimensions.
   * @param {number} index index used to cut image
   * @returns image
   */
  loadImage(index) {
    let x, y, img;
    x = index % playerset_row_blocks;
    y = Math.trunc(index / playerset_row_blocks);
    img = playerset.get(x * spritewidth, y * spritewidth, spritewidth * this.width, spritewidth * this.height);
    return img;
}

  /**
   * Get indexes for animation: walking_right, walking_left, pray, praying
   * @returns array with frame indexes (2d array, each item in array includes array with frame indexes)
   */
  getAnimationIndexes() {
      let indexList = [
        [0, 2, 4 ], // walking_right
        [12,14,16], // walking_left
        [24,26,28], // pray
        [37,39,41]  // praying
      ];

      return indexList;
  }
}
