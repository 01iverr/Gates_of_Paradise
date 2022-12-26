class GameMap {
  /**
   * @constructor
   * @param {Array<Array<number>>} map_data 2D Array of numbers containing tile info
   * @param {Array<Array<number>>} item_data 2D Array of numbers containing item info
   */
  constructor(map_data, item_data) {
    this.map_data = map_data;
    this.item_data = item_data;

    this.walls;
    this.doors;
    this.floors;
    this.items; // interactive items
    this.decoration; // non-interactive items
    this.coins = new Group();
  }

  /**
   * Draws the map's sprites by using drawSprites.
   */
  draw() {
    this.walls.draw();
    this.doors.draw();
    this.floors.draw();
    this.items.draw();
    this.coins.draw();
    this.decoration.draw();
  }

  /**
   * Create map.
   */
  create() {
    this.createTiles();
    this.createItems();
  }

  /**
   * Create map tiles.
   */
  createTiles() {
    // this.tiles = new Group();
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
        let tile_data = tile_info[index].split(' ');
        let width = tile_data[1];
        let height = tile_data[2];
        let tile = new Tile("tile", index, r * tilewidth + tilewidth / 2, c * tilewidth + tilewidth / 2, width, height);

        if (tile.name != null) {
          if (tile.name.startsWith("wall")) {
            this.walls.add(tile.sprite);
          } else if (tile.name.startsWith("door")) {
            this.doors.add(tile.sprite);
          } else if (tile.name.startsWith("floor")) {
            this.floors.add(tile.sprite);
          } else if (tile.name.startsWith("coins")) {
            this.coins.add(item.sprite);
          }
        }
      }
    }
  }

  /**
   * Create map Items.
   */
  createItems() {
    this.items = new Group();
    this.decoration = new Group();

    let col = this.item_data.length;
    let row = this.item_data[0].length;

    for (let c = 0; c < col; c++) {
      for (let r = 0; r < row; r++) {

        let index = this.item_data[c][r];
        let item_data = item_info[index].split(' ');
        let width = item_data[1];
        let height = item_data[2];
        let isInteractive = item_data[3];
        let tile = new Tile("item", index, r * tilewidth + tilewidth / 2, c * tilewidth + tilewidth / 2, width, height);

        switch (isInteractive) {
          case 'y': // interractive item
            this.items.add(tile.sprite);
            break;
          case 'n': // non-interractive item
            this.decoration.add(tile.sprite);
            break;
        }

      }
    }
  }
}
