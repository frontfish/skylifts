Game = {};

// initialize variables
var w = 600;
var h = 400;
var bestScore = 0;
var playerStart;

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	game.load.image('loadingBar', 'assets/img/loading_bar.png');
	game.load.image('loadingFrame', 'assets/img/loading_frame.png');
    },

    create: function () {
	game.state.start('Load');
    }
};
