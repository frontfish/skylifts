Game = {};

// initialize variables
var w = 600;
var h = 400;
var bestScore = 0;

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	// load images for loading screen
    },

    create: function () {
	game.state.start('Load');
    }
};
