Game = {};

var w = 600;
var h = 400;

var score = 0;
var bestScore = 0;

var playerStart = w / 2;
var marker;
var firstTime = true;
var timer;

var audio = true;
var music;

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	game.load.image('loadingBar', 'assets/img/loading_bar.png');
	game.load.image('loadingFrame', 'assets/img/loading_frame.png');
    },
    
    create: function () {
	if (!game.device.desktop) {
	    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.scale.minWidth = 480;
	    this.scale.minHeight = 320;
	    this.scale.maxWidth = 1152;
	    this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
	    this.scale.startFullScreen(true);
	}

	game.state.start('Load');
    }, 

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {
        orientated = false;
        document.getElementById('orientation').style.display = 'block';
    },

    leaveIncorrectOrientation: function () {
        orientated = true;
        document.getElementById('orientation').style.display = 'none';
    }
};
