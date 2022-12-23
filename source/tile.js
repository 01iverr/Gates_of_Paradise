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
        if (this.type == "tile"){
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
     * @param {number} index 
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

        // Get frames from image assets
        let frames = {};
        let index = this.index;
        let item_title = this.name.substring(0, this.name.length-1);
        let stop = false;

        while (!stop) {

            // Add frame to list
            let img = this.loadImage(index);
            frames[index+1] = img; //index+1 so it corresponds to number in json file

            index = +index + +this.width;

            // Find if there are more frames
            let item_name;
            if (this.type == "tile"){
                if (index >= Object.keys(tile_info).length)        { break; }    // If End Of Array reached
                if (!(tile_info.hasOwnProperty(index.toString()))) { continue; } // Must continue to find item if index doesn't exist in json
                item_name = (tile_info[index].split(' '))[0];
            } else if (this.type == "item") {
                if (index >= Object.keys(item_info).length)        { break; }    // If End Of Array reached
                if (!(item_info.hasOwnProperty(index.toString()))) { continue; } // Must continue to find item if index doesn't exist in json
                item_name = (item_info[index].split(' '))[0];
            }

            if (!item_name.startsWith(item_title)) { // There are no more frames
                stop = true;
            }

        }
        // if (!item_title.startsWith("blan") && !item_title.startsWith("floor") && !item_title.startsWith("wall")){
        //     console.log("frames : ", frames); // TODO: remove
        // }
        // this.sprite.addImage("last", frames[0], tilewidth); //FIXME

        // Load animation
        // this.sprite.addAnimation("animate", frames[0], frames[1], frames[2]); // FIXME
    }
}