Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	// create loading screen
	game.stage.backgroundColor = '#acf';
	loadingFrame = game.add.sprite(0, h / 2, 'loadingFrame');
	loadingFrame.anchor.y = 0.5;
	loadingFrame.x = w / 2 - (loadingFrame.width / 2);
	loadingBar = game.add.sprite(0, h / 2, 'loadingBar');
	loadingBar.anchor.y = 0.5;
	loadingBar.x = w / 2 - (loadingBar.width / 2)

	game.load.setPreloadSprite(loadingBar);
	loadText = game.add.text(w / 2, h / 3 - 10, 'loading...', { font: '40px Arial', fill: '#aaaaaa' });
	loadText.anchor.setTo(0.5, 0);

	// load everything
	game.load.image('platform', 'assets/img/platform.png');
	game.load.image('platform2', 'assets/img/platform2.png');
	game.load.spritesheet('player', 'assets/img/player.png', 20, 18, 3);

	game.load.audio('music', 'assets/aud/Half\ Bit.mp3');
	music = game.add.sound('music');
    },

    create: function () {
	game.state.start('Menu');
    }
};
