Game.Menu = function (game) { };

Game.Menu.prototype = {
    create: function () {
	
    },

    update: function () {
	// upon some input:
	music = game.add.sound('music');
	music.play('', 0.4, 0.5, true, false);
	game.state.start('Play');
    }
};
