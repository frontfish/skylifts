Game.Menu = function (game) { };

Game.Menu.prototype = {
    create: function () {

    },

    update: function () {
	// upon some input:
	game.state.start('Play');
    }
};
