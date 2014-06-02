Game.Menu = function (game) { };

Game.Menu.prototype = {
    create: function () {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	cursors = game.input.keyboard.createCursorKeys();


	platforms = game.add.group()
	platforms.enableBody = true;
	ground = platforms.create(0, h - 20, 'platform');
	ground.scale.setTo(w, 1);
	ground.body.immovable = true;

	player = game.add.sprite(w / 2, h - 40, 'player');
	player.anchor.setTo(0.5, 1);
	game.physics.arcade.enable(player);
	player.body.gravity.y = 1000;
	player.inAir = true;
	player.frame = 1;
	player.body.collideWorldBounds = true;

	title = game.add.text(w / 2, 5, 'Skylifts', { font: '100px Arial', fill: '#aaaaaa' });
	title.anchor.setTo(0.5, 0);

	by = game.add.text(w / 2, 118, 'by Christopher Hinstorff', { font: '24px Arial', fill: '#aaaaaa' });
	by.anchor.setTo(0.5, 0);

	attr = game.add.text(w, h - 18, 'music: "Half Bit" by Kevin Macleod (incompetech.com) ', { font: '12px Arial', fill: '#aaccff' });
	attr.anchor.setTo(1, 0);

    },

    update: function () {
	game.physics.arcade.collide(player, platforms, this.hitPlatform, null, this);

	player.frame = 1;
	player.body.velocity.x = 0;
	if (cursors.left.isDown) {
	    player.body.velocity.x = -150;
	    player.frame = 0;
	}
	else if (cursors.right.isDown) {
	    player.body.velocity.x = 150;
	    player.frame = 2;
	}

	if (cursors.up.isDown) {
	    this.startGame();
	}

	if (game.input.activePointer.isDown) {
	    if (game.input.x < (w / 3)) {
		player.body.velocity.x = -150;
		player.frame = 0;
	    }
	    else if (game.input.x > (w * 2 / 3)) {
		player.body.velocity.x = 150;
		player.frame = 2;
	    }
	    else {
		this.startGame();
	    }
	}
    },
    
    startGame: function () {
	playerStart = player.x;
	music = game.add.sound('music');
	music.play('', 0.4, 0.5, true, false);
	game.state.start('Play');
    }
};
