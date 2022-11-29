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
        this.sprite.collider = 'static'
        this.name = tile_info[index];
        this.index = index;
        // this.addImage();
        this.color(); // TODO: remove when add image works
    }

    /**
     * Adds corresponding image to each tile.
     */
    addImage() { // TODO: make work, image loads wrong
        let x = this.index % tileset_row_blocks
        let y = Math.trunc(this.index / tileset_row_blocks)
        console.log("index: ",this.index, " x,y: ", x,y) // TODO: remove (print)
        let img = tileset.get(x, y, 16, 16)
        this.sprite.addImage(img);
    }

    /**
     * Temporary
     */
    color() { // TODO: remove when add image works
        if (this.name.startsWith("wall")){
            this.sprite.color = color(0, 100, 255)
        } else if (this.name.startsWith("door")){
            this.sprite.color = color(255, 0, 0)
        } else if (this.name.startsWith("floor")) {
            this.sprite.color = color(0, 255, 50)
        } else {
            this.sprite.color = color(255, 255, 255)
        }
    }
}