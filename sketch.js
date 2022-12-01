var tilewidth = 32;
var spritewidth = 32; // number of pixel width in a tile sprite
var canvaswidth = 27 * tilewidth;
var canvasheight = 12 * tilewidth;

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

/**
 * Preload asset files.
 */
function preload() {
	tileset = loadImage('/assets/images/map tiles/tileset8-200.png');
	tile_info = loadJSON('/assets/images/map tiles/tileset.json');
	level_info = loadJSON('/assets/level-data.json');
}

/**
 * Set up game.
 */
function setup() {
	createCanvas(windowWidth, windowHeight);
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
	clear();
	// TODO: add background image instead of plain color
	fill(116, 185, 214);
	rect(0, 0, canvaswidth, canvasheight);
}

