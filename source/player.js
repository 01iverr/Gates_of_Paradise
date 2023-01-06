class Player {

  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index - 1
    this.speed = 8;
    this.width = 2;
    this.height = 2;
    this.sprite = createSprite(this.x, this.y, 2 * tilewidth, 2 * tilewidth);
    this.sprite.collider = 'static';
    this.coins = 0;
    this.addAnimation();
    this.changeAnimation("walking_right");
  }

  update() {
    let oldy = this.sprite.position.y;
    let oldx = this.sprite.position.x;
    //for slow walking
    if (kb.pressing("z")) {
      this.speed = 3;
    } else {
      this.speed = 8;
    }
    //for running
    if (kb.pressing("r")) {
      this.speed = 10;
    } else {
      this.speed = 8;
    }
    if (kb.pressing(UP_ARROW) || kb.pressing("w")) {
        this.sprite.position.y -= this.speed;
    }
    if (kb.pressing(DOWN_ARROW) || kb.pressing("s")) {
      if (this.sprite.position.y +this.speed <348 && cantchangerooms) {
        this.sprite.position.y += this.speed;
      }else if (!cantchangerooms){
        this.sprite.position.y += this.speed;
      }
    }
    if (kb.pressing(LEFT_ARROW) || kb.pressing("a")) {
      this.sprite.position.x -= this.speed;
      this.changeAnimation("walking_left");
    }
    if (kb.pressing(RIGHT_ARROW) || kb.pressing("d")) {
      this.sprite.position.x += this.speed;
      this.changeAnimation("walking_right");
    }

    // Check collisions
    for (let i = 0; i < interract_blocks[stage].length; i++) {
      if (this.checkCollision(interract_blocks[stage][i])) {
        console.log("[Collision] Player -", interract_blocks[stage][i].name);

        if (interract_blocks[stage][i].name.startsWith("coin")) { // coin
          // Add coin
          this.coins += 1;
          coinsBoolean = false;

        } else { // not coin
          this.sprite.position.y = oldy;
          this.sprite.position.x = oldx;
        }

        //find the clue ifn the fridge
        this.findTheClue(i, 0, "fridge");
        //find the clue on the bed
        this.findTheClue(i, 1, "bed");

        //find the clue on the chest
        this.findTheClue(i, 2, "chest");

        //find the clue on the toilet paper
        this.findTheClue(i, 3, "t_paper");

        //find the clue on the SUITCASE
        this.findTheClue(i, 4, "suitcase");

        //find the clue on the book_leaves
        this.findTheClue(i, 5, "book_leaves");

        //find the clue on the chair
        this.findTheClue(i, 6, "chair_purple");

        //find the clue on the chair
        this.findTheClue(i, 7, "desk_purple");

      }
    }
  }

  checkPosition(x1, x2, y1, y2) {
    if (this.sprite.position.x >= x1 && this.sprite.position.x <= x2 &&
      this.sprite.position.y >= y1 && this.sprite.position.y <= y2) {
      console.log("BOOOO");
      return true;
    }
    console.log("BOOOOOOOOOOOOOOOBOOOOOOOOOOOOOOO")
    console.log(this.sprite.position.x);
    console.log(this.sprite.position.y);
    return false;
  }

  setPosition(x, y) {
    this.sprite.position.x = x;
    this.sprite.position.y = y;
  }
  takeallthecoins() {
    this.coins = 0;
  }


  doIhaveCoins(){
    if (this.coins>0){
      console.log("----------------------------------------")
      console.log(this.coins)
      console.log("----------------------------------------")
      return true;
    }
    return false;
  }

  removeOneCoin(){
    this.coins=this.coins-1;
  }
  draw() {
    this.sprite.draw();
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
   * Check if player collides with item.
   * @param {Tile} tile tile to check collision with
   * @returns true if collission happens, false if not
   */
  checkCollision(tile) {
    // If item is non-interactive (floor, grass,etc)
    if (!tile.has_collissions) {
      return false;
    }
    let top = this.getTop();
    let bottom = this.getBottom();
    let left = this.getLeft();
    let right = this.getRight();

    let top_bottom = false;
    if (top < tile.collide_bottom && top > tile.collide_top ||
      bottom > tile.collide_top && bottom < tile.collide_bottom) {
      top_bottom = true;
    }

    let left_right = false;
    if (left < tile.collide_right && left > tile.collide_left ||
      right > tile.collide_left && right < tile.collide_right) {
      left_right = true;
    }


    if (top_bottom && left_right) {
      return true;
    }
    return false;

  }

  getTop() {
    return +this.sprite.y + tilewidth * 4 / 6;
  }

  getBottom() {
    return +this.sprite.y + this.height * tilewidth;
  }

  getLeft() {
    return +this.sprite.x - tilewidth / 2;
  }

  getRight() {
    return +this.sprite.x + tilewidth / 2;
  }

  /**
   * Add animation frames to item.
   * Animations added: walking_right, walking_left, pray, praying
   */
  addAnimation() {
    // Get grame indexes
    let indexList = this.getAnimationIndexes();

    // Get image for each frame
    let frames = [
      [],
      [],
      [],
      []
    ];
    for (let i = 0; i < indexList.length; i++) { // loop animation type (walking, pray, praying)
      for (let j = 0; j < indexList[i].length; j++) { // loop animation frames
        frames[i][j] = this.loadImage(indexList[i][j]);
      }
    }

    // Add animation
    this.sprite.addAnimation("walking_right",
      frames[0][0], frames[0][1], frames[0][2]);
    this.sprite.addAnimation("walking_left",
      frames[1][0], frames[1][1], frames[1][2]);
    this.sprite.addAnimation("pray",
      frames[2][0], frames[2][1], frames[2][2]).noLoop();
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
      [0, 2, 4], // walking_right
      [12, 14, 16], // walking_left
      [24, 26, 28], // pray
      [37, 39, 41] // praying
    ];

    return indexList;
  }

  findTheClue(i, index, name) {
    if (!itemfound[index]) {
      console.log(interract_blocks[stage][i]);
      if (interract_blocks[stage][i].name.startsWith(name)) {
        touchedclue[index] = true;
      } else {
        touchedclue[index] = false;
      }
    }
  }

}
