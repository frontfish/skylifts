Game.Menu = function (game) { };

Game.Menu.prototype = {
    create: function () {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	cursors = game.input.keyboard.createCursorKeys();

	title = game.add.text(w / 3, h, 'Skylifts', { font: '100px Arial', fill: '#aaaaaa' });
	title.anchor.setTo(0.5, 0);
	game.add.tween(title).to({ y: 5 }, 750, null, true, 0, 0, false);

	by = game.add.text(w / 2 + 18, h, 'by Christopher Hinstorff', { font: '24px Arial', fill: '#aaaaaa' });
	by.anchor.setTo(0.5, 0);
	game.add.tween(by).to({ y: 96 }, 500, null, true, 500, 0, false);

	platforms = game.add.group()
	platforms.enableBody = true;
	ground = platforms.create(0, h + 160, 'platform');
	ground.scale.setTo(w, 1);
	ground.body.immovable = true;
	ground.body.velocity.y = -150;
	leftSide = platforms.create(-20, h - 40, 'platform');
	leftSide.body.immovable = true;
	leftSide.scale.setTo(20, 1);
	rightSide = platforms.create(w, h - 40, 'platform');
	rightSide.body.immovable = true;
	rightSide.scale.setTo(20, 1);

	attr = game.add.text(w, h - 18, 'music: "Half Bit" by Kevin Macleod (incompetech.com) ', { font: '12px Arial', fill: '#aaccff' });
	attr.anchor.setTo(1, 0);

	if (playerStart < w / 3) {
	    playerStart = w / 3;
	}
        if (playerStart > 2 * w / 3) {
	    playerStart = 2 * w / 3;
	}

	player = game.add.sprite(playerStart, h + 70, 'player');
	player.anchor.setTo(0.5, 1);
	game.physics.arcade.enable(player);
	player.body.gravity.y = 1000;
	player.frame = 1;
	
	controls = game.add.text(w / 2, -400, 'Move with LEFT and RIGHT arrow keys\nPress UP to begin', { font: '20px Arial', fill: '#aaaaaa', align: 'center' });
	controls.anchor.setTo(0.472, 1);

	if (bestScore != 0) {    
 	    scoreText = game.add.text(w - 10, 10, 'score: ' + score, { font: '20px Arial', fill: '#aaa' });
	    scoreText.anchor.setTo(1, 0);
	    scoreText.alpha = 0;
	    game.add.tween(scoreText).to({ alpha: 1 }, 400, null, true, 1200, 0, false);
	    bestText = game.add.text(w - 10, 30, 'best: ' + bestScore, { font: '20px Arial', fill: '#aaa' });
	    bestText.anchor.setTo(1, 0);
	    bestText.alpha = 0;
	    game.add.tween(bestText).to({ alpha: 1 }, 400, null, true, 1200, 0, false);
	}

    },

    update: function () {
	game.physics.arcade.collide(player, platforms);

	if (ground.body.y < h - 19) {
	    ground.body.velocity.y = 0;
	    player.body.velocity.y = 0;
	    ground.y = h - 20;
	}

	game.add.tween(controls).to({ x: player.x, y: (player.y - 18) }, 1, null, true, 0, 0, false);

	player.frame = 1;
	player.body.velocity.x = 0;
	if (game.device.desktop) {
	    this.desktopControls();
	}
	else {
	    this.mobileControls();
	}
    },

    desktopControls: function () {
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
    },

    mobileControls: function () {
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
