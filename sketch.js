var tilewidth = 32;
var spritewidth = 32; // number of pixel width in a tile sprite
var canvaswidth = 20 * tilewidth;
var canvasheight = 12 * tilewidth;

var numberOfLevels = 6;
var level_info;

var tileset;
var tileset_row_blocks = 6;
var tileset_col_blocks = 4;
var tile_info;

var itemset;
var itemset_row_blocks = 6;
var itemset_col_blocks = 19;
var item_info;

var tiles;
var floors;
var walls;
var doors;

var tile;

var maps = {};
var map_data;
var item_data;
var tempMap;

var stage = 0;
var changeStage = true;

/**
 * Preload asset files.
 */
function preload() {
	tileset = loadImage('/assets/images/map tiles/tiles-6-4-200.png');
	tile_info = loadJSON('/assets/images/map tiles/tileset.json');
	itemset = loadImage('/assets/images/map tiles/items-6-19-200.png');
	item_info = loadJSON('/assets/images/map tiles/itemset.json');
	level_info = loadJSON('/assets/level-data.json');
}

/**
 * Set up game.
 */
function setup() {
	// Put canvas in center of window
	var cnv = createCanvas(canvaswidth, canvasheight);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);

	// Create Maps
	createMaps();
}

/**
 * Create each map based on asset files.
 */
function createMaps() {
	for (let i = 1; i <= numberOfLevels; i++) {
		tempMap = new Map(level_info[`map_${i}`], level_info[`items_${i}`]);
		tempMap.create();
		maps[i] = tempMap;
	}
}

function draw() {
	background(0, 0, 0);

	if (changeStage){
		stage++;
	}

	gameMap = maps[stage];

	gameMap.draw();
}

