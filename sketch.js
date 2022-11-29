var tilewidth = 35;
// var game_map;
var numberOfLevels = 1;
var tileset;
var tileset_row_blocks = 8;
var tileset_col_blocks = 3;
var tile_info;
var level_info;

var tiles;
var floors;
var walls;
var doors;

var tile;

var maps = {};
var map_data;
var item_data;
var tempMap;


function preload() {
	tileset = loadImage('/assets/images/map tiles/tileset8.png');
	tile_info = loadJSON('/assets/images/map tiles/tileset.json');
	level_info = loadJSON('/assets/level-data.json');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	createMaps()
	
}

function createMaps() {
	for (let i = 1; i <= numberOfLevels; i++) {
		map_data = level_info[`map_${i}`]
		// item_data = level_info[`items_${i}`]

		tiles = new Group();
		walls = new Group();
		doors = new Group();
		floors = new Group();

		let col = map_data.length
		let row = map_data[0].length
		// console.log("row = ",row)
		// console.log("col = ",col)
		// console.log("map_data ", map_data[col-1])
		for (let c = 0; c < col; c++) {
			for (let r = 0; r < row; r++) {
				
				let index = map_data[c][r]
				tile = new Tile(index, r*tilewidth+tilewidth/2, c*tilewidth+tilewidth/2)
				
				if (tile.name.startsWith("wall")){
                	walls.add(tile.sprite);
                } else if (tile.name.startsWith("door")){
                    doors.add(tile.sprite);
                } else if (tile.name.startsWith("floor")) {
                    floors.add(tile.sprite);
                }
			}
		}
		
	}
}

function draw() {
	clear()
}

