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
        y = ( (width==1 & height==1) ? y : (y + 16*(height-1)) );

        this.sprite = createSprite(x, y, width*tilewidth, height*tilewidth);
        this.sprite.collider = 'static';
        if (this.type == "tile"){
            this.name = (tile_info[index].split(' '))[0];
        } else if (this.type == "item") {
            this.name = (item_info[index].split(' '))[0];
        }
        this.index = index-1;
        this.addImage();
    }

    /**
     * Adds corresponding image to each tile.
     */
    addImage() { 
        let x, y, img;
        if (this.type == "tile") {
            x = this.index % tileset_row_blocks;
            y = Math.trunc(this.index / tileset_row_blocks);
            img = tileset.get(x*spritewidth, y*spritewidth, spritewidth*this.width, spritewidth*this.height);
        } else if (this.type == "item") {
            x = this.index % itemset_row_blocks;
            y = Math.trunc(this.index / itemset_row_blocks);
            img = itemset.get(x*spritewidth, y*spritewidth, spritewidth*this.width, spritewidth*this.height);
        }
        this.sprite.addImage(img, tilewidth);
    }
}