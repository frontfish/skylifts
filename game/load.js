Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	// create loading screen
	game.stage.backgroundColor = '#acf';

	// load everything
	game.load.image('platform', 'assets/img/platform.png');
	game.load.image('player', 'assets/img/player.png');
    },

    create: function () {
	game.state.start('Menu');
    }
};
