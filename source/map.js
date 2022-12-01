class Map {
    /**
     * @constructor
     * @param {Array<Array<number>>} map_data 2D Array of numbers containing tile info
     * @param {Array<Array<number>>} item_data 2D Array of numbers containing item info
     */
    constructor(map_data, item_data) {
        this.map_data = map_data;
		this.item_data = item_data;

        this.tiles;
		this.walls;
		this.doors;
		this.floors;
    }

    /**
     * Create map.
     */
    create() {
        this.createTiles();
        this.createItems;
    }

    /**
     * Create map tiles.
     */
    createTiles() {
        this.tiles = new Group();
		this.walls = new Group();
		this.doors = new Group();
		this.floors = new Group();

		let col = this.map_data.length;
		let row = this.map_data[0].length;
		// console.log("row = ",row) // TODO: remove (print)
		// console.log("col = ",col)
		// console.log("map_data ", map_data[col-1])
		for (let c = 0; c < col; c++) {
			for (let r = 0; r < row; r++) {
				
				let index = this.map_data[c][r];
				let tile = new Tile(index, r*tilewidth+tilewidth/2, c*tilewidth+tilewidth/2)
				
				if (tile.name.startsWith("wall")){
                	this.walls.add(tile.sprite);
                } else if (tile.name.startsWith("door")){
                    this.doors.add(tile.sprite);
                } else if (tile.name.startsWith("floor")) {
                    this.floors.add(tile.sprite);
                }
			}
		}
    }

    /**
     * Create map Items.
     */
    createItems() {
        // TODO: add items
    }
}