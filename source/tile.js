class Tile {
    /**
     * Creates an instance of a tile
     * @constructor
     * 
     * @param {Array} index tile info index
     * @param {number} x position of the tile to be drawn
     * @param {number} y position of the tile to be drawn
     */
    constructor(type, index, x, y, width, height) {
        this.type = type;
        this.width = width;
        this.height = height;

        this.sprite = new Sprite(x, y, width*tilewidth, height*tilewidth);
        this.sprite.collider = 'static';
        this.name = tile_info[index];
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