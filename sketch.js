var tilewidth = 32;
var spritewidth = 32; // number of pixel width in a tile sprite
var canvaswidth = 20 * tilewidth;
var canvasheight = 12 * tilewidth;
var playerone;
var dialogsplayer;
var doorsopened;
var itemfound;
var touchedclue;
// Map, each name corresponds to map number
// (corresponds to numbers in level-data.json)
const stage_names = {
    "orange"         : 1,
    "red"            : 2,
    "purple"         : 3,
    "blue"           : 4,
    "green"          : 5,
    "yellow"         : 6,
    "gates_1"        : 7, // first scene, with both gates
    "doors_corridor" : 8, // corridor with colored doors
    "gates_2"        : 9  // last scene, with both gates
}
var numberOfLevels = Object.keys(stage_names).length;
var level_info;

var tileset;
var tileset_row_blocks = 6;
var tileset_col_blocks = 18;
var tile_info;

var itemset;
var itemset_row_blocks = 6;
var itemset_col_blocks = 34;
var item_info;

var playerset;
var playerset_row_blocks = 6;
var playerset_col_blocks = 6;

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
var changeStage = false;
var gameMap;

var interract_blocks = []; // interractive blocks for each map

var speter_img; // saint peter image
var devil_img;  // devil image

var intro_screen_img; // image for intro screen (stage 0)

/**
 * Preload asset files.
 */
function preload() {
  intro_screen_img = loadImage('/assets/images/backgrounds/intro.png');
  tileset = loadImage('/assets/images/map tiles/tiles-' + tileset_row_blocks + '-' + tileset_col_blocks + '-200.png');
  tile_info = loadJSON('/assets/images/map tiles/tileset.json');
  itemset = loadImage('/assets/images/map tiles/items-' + itemset_row_blocks + '-' + itemset_col_blocks + '-200.png');
  item_info = loadJSON('/assets/images/map tiles/itemset.json');
  level_info = loadJSON('/assets/level-data.json');
  playerset = loadImage('/assets/images/characters/ghost.png');
  dialogs_info = loadJSON('/assets/dialogsset.json');
  speter_img = loadImage('/assets/images/characters/speter.png');
  devil_img = loadImage('/assets/images/characters/devil.png');
}

/**
 * Set up game.
 */
function setup() {
  frameRate(100);
  // Put canvas in center of window
  var cnv = createCanvas(canvaswidth, canvasheight);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  playerone = new Player(100, 300, 1);
  dialogsplayer = new Dialogs();

  doorsopened = [false, false, false, false, false, false, false];
  itemfound = [false, false, false, false, false, false, false, false];
  playerOut = false;
  touchedclue = [false, false, false, false, false, false, false, false];
  //items in touched clue : 0:fridge 1:bed 2:chest 3:toiletpaper 4:suitcase 5:book_leaves 6:chair 7:desk
  cantchangerooms = true;
  // Create Maps
  createMaps();
}

/**
 * Create each map based on asset files.
 */
function createMaps() {
  // for stage 0
  let map = new Array(canvasheight/tilewidth);
  let items = new Array(canvasheight/tilewidth);
  for (let i=0; i<canvasheight/tilewidth; i++){
    map[i] = new Array(canvaswidth/tilewidth).fill(61);
    items[i] = new Array(canvaswidth/tilewidth).fill(1);
  }
  tempMap = new GameMap(0, map, items);
  tempMap.create();
  maps[0] = tempMap

  // for the rest stages
  for (let i = 1; i <= numberOfLevels; i++) {
    tempMap = new GameMap(i, level_info[`map_${i}`], level_info[`items_${i}`]);
    tempMap.create();
    maps[i] = tempMap;
  }
}

function draw() {
  background(0, 0, 0);
  if (stage == 0) {
    image(intro_screen_img, 0, 0);
    gameMap = maps[stage];
    gameMap.draw();

    if (kb.pressing("x")) {
        changeStage = true;
    }

    if (changeStage) {
        stage = stage_names["gates_1"];
    }
    return;
  }
  
  //TODO ADD DIALOGS and set the global var as true to draw the icons
  if (changeStage) {
    changeStage = false;
    if (stage == 7) { //entry paradise/hell door
      entryStage();
    } else if (stage == 8) { //6 doors for the room
      doorsStage();
    } else if (stage == 1) { //bedroom
      callDoubleClueStage(2, 1, 12, 13, 2, 14);
    } else if (stage == 2) { //kitchen
      calltStage(1, 0, 10, 11);
    } else if (stage == 3) { //office
      callDoubleClueStage(6, 6, 21, 26, 7, 25)
    } else if (stage == 4) { //wc
      calltStage(3, 3, 15, 16);
    } else if (stage == 5) { //garden
      calltStage(5, 5, 19, 20);
    } else if (stage == 6) { //living room
      calltStage(4, 4, 17, 18);
    }
  }
    canIHelp();
    enterTheRoom();
    leaveTheRoom();

    gameMap = maps[stage];
    gameMap.draw();
    playerone.draw();
    playerone.update();

  }

function canIHelp(){
  if (kb.released("f")) {
    changeStage = false;
    cantchangerooms = true;
    dialogsplayer.tell("petros", 44);
    setTimeout(() => {
      changeStage = true;
      cantchangerooms = false;
    }, "15000");
  }
}

  function enterTheRoom() {
    ////////////////Enter the rooms
    if (stage == 8 && !cantchangerooms) {
      if (playerone.checkPosition(124, 164, 0, 110)) {
        stage = 2;
        coinsBoolean = true;
        changeStage = true;
        playerone.setPosition(240, 340);

      } else if (playerone.checkPosition(204, 228, 0, 110)) {
        if (itemfound[0]) {
          stage = 1;
          coinsBoolean = true;
          changeStage = true;
          playerone.setPosition(240, 340);
        }
      } else if (playerone.checkPosition(268, 284, 0, 110)) {
        if (itemfound[2]) {
          stage = 4;
          coinsBoolean = true;
          changeStage = true;
          playerone.setPosition(240, 340);
        }
      } else if (playerone.checkPosition(332, 348, 0, 110)) {
        if (itemfound[3]) {
          stage = 6;
          coinsBoolean = true;
          changeStage = true;
          playerone.setPosition(240, 340);
        }

      } else if (playerone.checkPosition(396, 420, 0, 110)) {
        if (itemfound[4]) {
          stage = 5;
          coinsBoolean = true;
          changeStage = true;
          playerone.setPosition(240, 340);
        }
      } else if (playerone.checkPosition(452, 484, 0, 110)) {
        if (itemfound[5]) {
          stage = 3;
          coinsBoolean = true;
          changeStage = true;
          playerone.setPosition(240, 340);
        }
      }
    }
  }

  function leaveTheRoom() {
    //LEAVE THE ROOMs
    if (stage != 8 && stage != 7 && stage != 9 && !cantchangerooms) {
      if (playerone.checkPosition(200, 260, 370, 420)) {
        if (stage == 1) {
          playerone.setPosition(220, 110);
        } else if (stage == 2) {
          playerone.setPosition(140, 110);
        } else if (stage == 3) {
          playerone.setPosition(460, 110);
        } else if (stage == 4) {
          playerone.setPosition(270, 110);
        } else if (stage == 5) {
          playerone.setPosition(400, 110);
        } else if (stage == 6) {
          playerone.setPosition(340, 110);
        }
        stage = 8;
        changeStage = true;
      }
    }
  }


  function entryStage() {
    dialogsplayer.tell("petros", 1);
    dialogsplayer.tell("player", 2);
    dialogsplayer.tell("petros", 3);
    setTimeout(() => {
      stage = 8;
      changeStage = true;
    }, "30000");
  }

  function doorsStage() {
    if (!doorsopened[0]) {
      doorsopened[0] = true;
      cantchangerooms = true;
      dialogsplayer.tell("petros", 4);
      dialogsplayer.tell("player", 5);
      dialogsplayer.tell("petros", 6);
      setTimeout(() => {
        cantchangerooms = false;
      }, "30000");
    }
  }

  function callDoubleClueStage(doornum, cluenum, dialog1, dialog2, cluenum2, dialog3) {
    if (!doorsopened[doornum]) {
      doorsopened[doornum] = true;
      cantchangerooms = true;
      dialogsplayer.tell("informer", dialog1);
      setTimeout(() => {
        cantchangerooms = false;
        changeStage = true;
      }, "7000");
    }

    if (!itemfound[cluenum]) {
      if (touchedclue[cluenum] && (kb.released('e'))) {
        cantchangerooms = true;
        dialogsplayer.tell("petros", dialog2);
        setTimeout(() => {
          //player found the key.
          cantchangerooms = false;
          itemfound[cluenum] = true;
          changeStage = true;
        }, "6000");
      } else {
        changeStage = true;
      }
    }

    if (itemfound[cluenum] && !itemfound[cluenum2]) {
      if (touchedclue[cluenum2] && (kb.released('e'))) {
        cantchangerooms = true;
        dialogsplayer.tell("petros", dialog3);
        setTimeout(() => {
          //player found the key.
          cantchangerooms = false;
          itemfound[cluenum2] = true;
          changeStage = true;
        }, "6000");
      } else {
        changeStage = true;
      }
    }
  }


  function calltStage(doornum, cluenum, dialog1, dialog2) {
    if (!doorsopened[doornum]) {
      doorsopened[doornum] = true;
      cantchangerooms = true;
      dialogsplayer.tell("informer", dialog1);
      setTimeout(() => {
        cantchangerooms = false;
        changeStage = true;
      }, "7000");
    }

    if (!itemfound[cluenum]) {
      if (touchedclue[cluenum] && (kb.released('e'))) {
        cantchangerooms = true;
        dialogsplayer.tell("petros", dialog2);
        setTimeout(() => {
          //player found the key.
          cantchangerooms = false;
          itemfound[cluenum] = true;
          changeStage = true;
        }, "6000");
      } else {
        changeStage = true;
      }
    }
  }
