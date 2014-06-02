Game.Play = function (game) { };

var platformVelocity;
var score;
var startPlatform;
var marker;
var num_platforms = 4;
var variance = 8;
var increase = 1.01;

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

	marker = Math.floor((playerStart - 30) / 20);
	if (marker < 0) {
	    marker = 0;
	}
	if (marker > 26) {
	    marker = 26;
	}
	var y = 0;
	this.createPlatform(marker, y, 4);
	for (var i = 0; i < num_platforms - 1; i++) {
	    y = y - (Math.floor(Math.random() * 4) + 4);
	    this.generatePlatform(y);
	}

	player = game.add.sprite(playerStart, h - 20, 'player');
	player.anchor.setTo(0.5, 1);
	game.physics.arcade.enable(player);
	player.body.gravity.y = 1000;
	player.inAir = true;
	player.frame = 1;

	platformVelocity = -100;

	score = 0;	
	scoreText = game.add.text(10, 10, 'score: ' + score, { font: '20px Arial', fill: '#aaa' });
	bestText = game.add.text(10, 30, 'best: ' + bestScore, { font: '20px Arial', fill: '#aaa' });
    },

    update: function () {
	game.physics.arcade.collide(player, sides);
	game.physics.arcade.collide(player, killZones, this.endGame, null, this);
	game.physics.arcade.overlap(topKill, platforms, this.deletePlatform, null, this);
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

	if (game.input.activePointer.isDown) {
	    if (game.input.x < (w / 3)) {
		player.body.velocity.x = -150;
		player.frame = 0;
	    }
	    else if (game.input.x > (w * 2 / 3)) {
		player.body.velocity.x = 150;
		player.frame = 2;
	    }
	}

	if (player.body.velocity.y != platformVelocity) {
	    player.inAir = true;
	}

	platforms.setAll('body.velocity.y', platformVelocity);

	scoreText.text = 'score: ' + score;
	bestText.text = 'best: ' + bestScore;
    },

    createPlatform: function (x, y, width) {
	platform = platforms.create(x * 20, h - y * 20, 'platform');
	platform.scale.setTo(width * 20, 1);
	platform.body.immovable = true;
	platform.untouched = true;
    },

    generatePlatform: function (y) {
	var x = -1;
	while (x < 0 || x > (w / 20 - 4)) {
	    x = variance - Math.floor(Math.random() * (2 * variance + 1)) + marker;
	}
	this.createPlatform(x, y, 4);
	marker = x;
    },

    deletePlatform: function (topKill, platform) {
	platform.destroy();
	this.generatePlatform(0);
    },

    hitPlatform: function (player, platform) {
	if (platform.untouched) {
	    score++;
	    platform.untouched = false;

	    if (score > bestScore) {
		bestScore = score;
	    }

	    platformVelocity *= increase;
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
