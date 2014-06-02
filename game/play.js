Game.Play = function (game) { };

var platformVelocity = -100;
var score;

Game.Play.prototype = {
    create: function () {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	cursors = game.input.keyboard.createCursorKeys();

	sides = game.add.group();
	sides.enableBody = true;
	left = sides.create(-20, -20, 'platform');
	left.scale.setTo(20, h + 2)
	left.body.immovable = true;
	right = sides.create(w + 1, -20, 'platform');
	right.scale.setTo(20, h + 2)
	right.body.immovable = true;

	killZones = game.add.group();
	killZones.enableBody = true;
	topKill = killZones.create(0, -50, 'platform');
	topKill.scale.setTo(w, 1);
	topKill.body.immovable = true;
	bottomKill = killZones.create(0, h + 30, 'platform');
	bottomKill.scale.setTo(w, 1)
	bottomKill.body.immovable = true;

	platforms = game.add.group();
	platforms.enableBody = true;

	this.createPlatform(1, 0, 4);
	this.createPlatform(7, -3, 4);
	this.createPlatform(4, -9, 4);

	player = game.add.sprite(50, h - 180, 'player');
	player.anchor.setTo(0.5, 1);
	game.physics.arcade.enable(player);
	player.body.gravity.y = 1000;
	player.inAir = true;

	score = 0;	
	scoreText = game.add.text(10, 10, 'score: ' + score, { font: '20px Arial', fill: '#222222' });
    },

    update: function () {
	game.physics.arcade.collide(player, sides);
	game.physics.arcade.collide(player, killZones, this.endGame, null, this);
	game.physics.arcade.overlap(topKill, platforms, this.deletePlatform, null, this);
	game.physics.arcade.collide(player, platforms, this.hitPlatform, null, this);

	player.body.velocity.x = 0;
	if (cursors.left.isDown) {
	    player.body.velocity.x = -150;
	}
	else if (cursors.right.isDown) {
	    player.body.velocity.x = 150;
	}

	if (cursors.up.isDown && player.body.touching.down) {
	    player.body.velocity.y = -375;
	    this.jumpCount++;
	}

	if (player.body.velocity.y != platformVelocity) {
	    player.inAir = true;
	}

	platforms.setAll('body.velocity.y', platformVelocity);

	scoreText.text = 'score: ' + score;
    },

    createPlatform: function (x, y, width) {
	platform = platforms.create(x * 20, h - y * 20, 'platform');
	platform.scale.setTo(width * 20, 1);
	platform.body.immovable = true;
	platform.untouched = true;
    },

    deletePlatform: function (topKill, platform) {
	platform.destroy();
    },

    hitPlatform: function (player, platform) {
	if (platform.untouched) {
	    score++;
	    platform.untouched = false;
	    if (score % 5 == 0) {
		platformVelocity *= 1.1;
	    }
	}
	if (player.inAir && player.body.touching.down) {
	    player.inAir = false;
	    game.add.tween(player.scale).to({x: 1, y: 0.8}, 50, null, true, 0, false, false).to({x: 1, y: 1}, 200, null, true, 0, false, false);
	}
    },

    endGame: function () {
	game.state.start('Play');
    }
};
