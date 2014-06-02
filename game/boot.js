Game = {};

// initialize variables
var w = 600;
var h = 400;
var bestScore = 0;
var playerStart;

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	if (!game.device.desktop) {
	    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.scale.minWidth = 480;
	    this.scale.minHeight = 320;
	    this.scale.maxWidth = 1152;
	    this.scale.maxHeight = 768;
	    this.scale.refresh();
	    this.scale.startFullScreen();
	}

	game.load.image('loadingBar', 'assets/img/loading_bar.png');
	game.load.image('loadingFrame', 'assets/img/loading_frame.png');
    },

    create: function () {
	game.state.start('Load');
    }
};
