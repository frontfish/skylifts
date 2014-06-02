Game.Menu = function (game) { };

Game.Menu.prototype = {
    create: function () {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	cursors = game.input.keyboard.createCursorKeys();

	player = game.add.sprite(50, h - 180, 'player');
	player.anchor.setTo(0.5, 1);
	game.physics.arcade.enable(player);
	player.body.gravity.y = 1000;
	player.inAir = true;
	player.frame = 1;
	player.collideWorldBounds = true;

    },

    update: function () {
	// upon some input:
	if (false) {
	    music = game.add.sound('music');
	    music.play('', 0.4, 0.5, true, false);
	    game.state.start('Play');
	}
    }
};
