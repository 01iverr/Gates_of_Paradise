var tilewidth = 32;
var spritewidth = 32; // number of pixel width in a tile sprite
var canvaswidth = 20 * tilewidth;
var canvasheight = 12 * tilewidth;

// Map, each name corresponds to map number
// (corresponds to numbers in level-data.json)
const stage_names = [
	{key: "orange", 		value: 1}, // orange room
	{key: "red", 			value: 2}, // red room
	{key: "purple", 		value: 3}, // purple room
	{key: "blue", 			value: 4}, // blue room
	{key: "green", 			value: 5}, // green room
	{key: "yellow", 		value: 6}, // yellow room
	{key: "gates_1", 		value: 7}, // first scene, with both gates
	{key: "doors_corridor", value: 8}, // corridor with colored doors
	{key: "gates_2",		value: 9}  // last scene, with both gates
];
var numberOfLevels = stage_names.length;
var level_info;

var tileset;
var tileset_row_blocks = 6;
var tileset_col_blocks = 18;
var tile_info;

var itemset;
var itemset_row_blocks = 6;
var itemset_col_blocks = 25;
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
	tileset = loadImage('/assets/images/map tiles/tiles-'+tileset_row_blocks+'-'+tileset_col_blocks+'-200.png');
	tile_info = loadJSON('/assets/images/map tiles/tileset.json');
	itemset = loadImage('/assets/images/map tiles/items-'+itemset_row_blocks+'-'+itemset_col_blocks+'-200.png');
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
		stage = 7; 
	}

	gameMap = maps[stage];

	gameMap.draw();
}

