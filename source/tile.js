class Tile {
    /**
     * Creates an instance of a tile
     * @constructor
     * 
     * @param {Array} index tile info index
     * @param {number} x position of the tile to be drawn
     * @param {number} y position of the tile to be drawn
     */
    constructor(index, x, y) {
        this.sprite = new Sprite(x, y, tilewidth, tilewidth);
        this.sprite.collider = 'static';
        this.name = tile_info[index];
        this.index = index;
        this.addImage();
    }

    /**
     * Adds corresponding image to each tile.
     */
    addImage() { 
        let x = this.index % tileset_row_blocks;
        let y = Math.trunc(this.index / tileset_row_blocks);
        let img = tileset.get(x*spritewidth, y*spritewidth, spritewidth, spritewidth);
        this.sprite.addImage(img, tilewidth);
    }
}