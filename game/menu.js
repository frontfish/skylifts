Game.Menu = function (game) { };

var gameStart = false;
var canMove;

Game.Menu.prototype = {
    create: function () {
	game.stage.backgroundColor = '#acf';
	timer = 0;
	canMove = true;

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

	attr = game.add.text(w - 10, h - 18, 'music: "Half Bit" by Kevin Macleod (incompetech.com)', { font: '12px Arial', fill: '#aaccff' });
	attr.anchor.setTo(1, 0);
	attr.alpha = 0;
	if (audio) {
	    game.add.tween(attr).to({ alpha: 1 }, 400, null, true, 1200, 0, false);
	}

	toggleMusic = game.add.text(20, h - 18, 'Toggle music with DOWN', { font: '12px Arial', fill: '#aaccff' });
	toggleMusic.anchor.setTo(0, 0);
	toggleMusic.alpha  = 0;
	game.add.tween(toggleMusic).to({ alpha: 1 }, 400, null, true, 1200, 0, false);

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

	scoreText = game.add.text(w - 10, 10, 'score: ' + score, { font: '20px Arial', fill: '#aaa' });
	scoreText.anchor.setTo(1, 0);
	scoreText.alpha = 0; 
	bestText = game.add.text(w - 10, 30, 'best: ' + bestScore, { font: '20px Arial', fill: '#aaa' });
	bestText.anchor.setTo(1, 0);
	bestText.alpha = 0;
	if (!firstTime) {    
 	    game.add.tween(scoreText).to({ alpha: 1 }, 400, null, true, 1200, 0, false);
	    game.add.tween(bestText).to({ alpha: 1 }, 400, null, true, 1200, 0, false);
	}

	cursors.down.onDown.add(this.toggleAudio, this);
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
	if (canMove) {
	    if (game.device.desktop) {
		this.desktopControls();
	    }
	    else {
		this.mobileControls();
	    }
	}

	if (game.time.now - timer > 500 && timer != 0) {
	    playerStart = player.x;
	    game.state.start('Play');
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

	if (cursors.up.isDown && timer == 0) {
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
	    else if (timer == 0) {
		this.startGame();
	    }
	}
    },

    toggleAudio: function () {
	if (audio) {
	    audio = false;
	    game.add.tween(attr).to({ alpha: 0 }, 400, null, true, 0, 0, false);
	    if (music.isPlaying) {
		music.pause();
	    }
	}
	else {
	    audio = true;
	    game.add.tween(attr).to({ alpha: 1 }, 400, null, true, 0, 0, false);
	    if (music.paused) {
		music.resume();
	    }
	    else {
		music.play('', 0.4, 0.5, true, false);
	    }
	}
    },
    
    startGame: function () {
	canMove = false;
	marker = Math.floor((player.x - 30) / 20);
	if (marker < 0) {
	    marker = 0;
	}
	if (marker > 26) {
	    marker = 26;
	}

	game.add.tween(title).to({ y: -155 }, 500, null, true, 0, 0, false);
	game.add.tween(by).to({ y: -64 }, 500, null, true, 0, 0, false);
	game.add.tween(controls).to({ alpha: 0 }, 500, null, true, 0, 0, false);
	game.add.tween(attr).to({ alpha: 0 }, 500, null, true, 0, 0, false);
	game.add.tween(toggleMusic).to({ alpha: 0 }, 500, null, true, 0, 0, false);
	game.add.tween(ground).to({ width: 80, x: marker * 20 }, 500, null, true, 0, 0, false);
 	game.add.tween(scoreText).to({ alpha: 1 }, 300, null, true, 200, 0, false);
	game.add.tween(bestText).to({ alpha: 1 }, 300, null, true, 200, 0, false);

	if (firstTime) {
	    firstTime = false;
	    if (audio) {
		music.play('', 0.4, 0.5, true, false);	   
	    }
	}
	
	gameStart = true;
	timer = game.time.now;
    }
};
