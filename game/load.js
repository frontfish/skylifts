Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	// create loading screen
	game.stage.backgroundColor = '#acf';

	// load everything
	game.load.image('platform', 'assets/img/platform.png');
	game.load.spritesheet('player', 'assets/img/player.png', 20, 18, 3);

	game.load.audio('music', 'assets/aud/Half\ Bit.mp3');
    },

    create: function () {
	game.state.start('Menu');
    }
};
