class Tile {
    /**
     * Creates an instance of a tile
     * @constructor
     * 
     * @param {String} type tile type ("tile"|"item")
     * @param {Array} index tile info index
     * @param {number} x position of the tile to be drawn
     * @param {number} y position of the tile to be drawn
     * @param {number} width tile width
     * @param {number} height tile height
     */
    constructor(type, index, x, y, width, height) {
        this.type = type;
        this.width = width;
        this.height = height;

        // Fix y coordinate, to align big items with other blocks
        this.x = x;
        this.y = ( (width==1 & height==1) ? y : (y + (tilewidth/2)*(height-1)) );

        this.sprite = createSprite(this.x, this.y, width*tilewidth, height*tilewidth);
        this.sprite.collider = 'static';
        if (this.type == "tile") {
            this.name = (tile_info[index].split(' '))[0];
            this.has_collissions = ((tile_info[index].split(' '))[3]) == "y" ? true : false;
        } else if (this.type == "item") {
            this.name = (item_info[index].split(' '))[0];
            this.has_collissions = ((item_info[index].split(' '))[3]) == "y" ? true : false;
        }
        this.index = index-1;
        this.addImage();
        this.addCollisions();
        this.addAnimation();
        this.sprite.changeAnimation("first");

        // FOR TESTING (to view some animations) // TODO: remove
        if (this.name.startsWith("door") || this.name.startsWith("bed") || this.name.startsWith("suitcase") || this.name.startsWith("chest")){
            this.sprite.changeAnimation("animation");
        }
    }

    /**
     * Adds corresponding image to each tile.
     */
    addImage() { 
        let img = this.loadImage(this.index);
        this.sprite.addImage("first", img, tilewidth);
    }

    /**
     * Gets image cut at index, based on object dimensions.
     * @param {number} index index used to cut image
     * @returns image
     */
    loadImage(index) {
        let x, y, img;
        if (this.type == "tile") {
            x = index % tileset_row_blocks;
            y = Math.trunc(index / tileset_row_blocks);
            img = tileset.get(x*spritewidth, y*spritewidth, spritewidth*this.width, spritewidth*this.height);
        } else if (this.type == "item") {
            x = index % itemset_row_blocks;
            y = Math.trunc(index / itemset_row_blocks);
            img = itemset.get(x*spritewidth, y*spritewidth, spritewidth*this.width, spritewidth*this.height);
        }
        return img;
    }

    /**
     * Adds collision info.
     */
    addCollisions() {
        if (!this.has_collissions){
            return;
        }
        if (width == 1 && height == 1){
            this.collide_bottom = this.sprite.y + tileheight;
            this.collide_top    = this.sprite.y;
        } else {
            this.collide_top    = this.sprite.y + tilewidth;
            this.collide_bottom = this.sprite.y + this.height * tilewidth;
        }
        this.collide_left  = this.sprite.x - tilewidth;
        this.collide_right = this.sprite.x + tilewidth;

        if (this.name.startsWith("book_leaves")){ // Player shouldn't collide with leaves, obly with book
            this.collide_left = this.collide_left + tilewidth;
        }
    }

    /**
     * Check if block collides with other block.
     * @param {Tile} tile2 tile to check collision with
     * @returns true if collission happens, false if not
     */
    checkCollision(tile2) {
        // If one or both items are non-interactive (floor, grass,etc)
        if (!this.has_collissions || !tile2.has_collissions) {
            return false;
        }

        // If both have collision interaction
        if (this.collide_top   > tile2.bottom 
        || this.collide_bottom < tile2.top 
        || this.collide_right  < tile2.left
        || this.collide_left   > tile2.right) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Add animation frames to item.
     */
    addAnimation() {
        // Get grame indexes
        let indexList = this.getAnimationIndexes();

        // Get image for each frame
        let frames = [];
        for (let i=0; i<indexList.length; i++){
            frames[i] = this.loadImage(indexList[i]);
        }

        // Add animation
        switch(frames.length) {
            case 3:
                this.sprite.addAnimation("animation", 
                    frames[0], frames[1], frames[2]).noLoop();
                break;
            case 2:
                this.sprite.addAnimation("animation", 
                    frames[0], frames[1]).noLoop();
                break;
            case 1:
                break;
            default:
                console.log("[ERROR] Item \"",this.name,"\" has too many frames.");
        }
    }

    /**
     * Find indexes for each of the animation frames of item.
     * The indexes correspond to codes in corresponing .json file (tileset.json | itemset.json).
     * @returns array with frame indexes
     */
    getAnimationIndexes() {
        let indexList = [];
        let index = this.index + 1;
        let i = 0;

        while (true) {
            indexList[i] = index-1;

            if (this.name.startsWith("wall")) {
                break; // walls dont have animation
            }
            
            let next; // next index to check
            if (this.name.startsWith("door")) { // door frames are not placed next to each other
                index = +index + ((+tileset_row_blocks) * 2);
                next = +index + ((+tileset_row_blocks) * 2);
            } else {
                index = +index + +this.width;
                next = +index + +this.width;
            }

            if (this.type == "tile") {
                if (!tile_info.hasOwnProperty(next.toString())) { // key doesn't exit in tileset.json
                    indexList[i+1] = index-1;
                    break;
                }
                let next_item = (tile_info[next].split(' '))[0].slice(0, -1); // name of next item without number at end
                if (!this.name.startsWith(next_item)) { // this is the last frame 
                    indexList[i+1] = index-1;
                    break;
                }
            } else if (this.type == "item") {
                if (!item_info.hasOwnProperty(next.toString())) { // key doesn't exit in itemset.json
                    indexList[i+1] = index-1;
                    break;
                }
                let next_item = (item_info[next].split(' '))[0].slice(0, -1); // name of next item without number at end
                if (!this.name.startsWith(next_item)) { // this is the last frame
                    indexList[i+1] = index-1;
                    break;
                }
            }
            i++;
        }

        return indexList;
    }

}