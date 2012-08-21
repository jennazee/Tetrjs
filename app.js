//TETRIS

function App() {
	var game_loop = start();
	var game;

	$(document).keydown(function(e) {
		//if game is in play, J-key moves falling piece left
		if (e.keyCode === 74) {
			if (go){
				e.preventDefault();
				currPiece.moveLeft()
			}
		}

		//if game is in play, L-key moves piece right
		if (e.keyCode === 76) {
			if (go){
				e.preventDefault();
				currPiece.moveRight()
			}
		}

		//if game is in play, K-key rotates the piece
		if (e.keyCode === 75) {
			if (go){
				e.preventDefault();
				currPiece.rotate();
			}
		}

		//if game is in play, comma-key moves piece down a row
		if (e.keyCode === 188) {
			if (go){
				e.preventDefault();
				currPiece.moveDown()
			}
		}

		//if game is in play, space bar drops the piece
		if (e.keyCode === 32) {
			if (go){
				e.preventDefault();
				currPiece.drop();
			}
		}
		//p for pause
		if (e.keyCode === 80) {
	  		e.preventDefault();
	    	go = !go;
	    }
	});

	//makes a clickable dialog box
	$('#mainCanvas').click(function(e){
		var x = e.pageX-$('#mainCanvas').offset().left;
		var y = e.pageY-$('#mainCanvas').offset().top;
		if (x >= 50 && x<50+300 && y>= 175 && y<=175+150 && !go){
			go = true;		
		}
	});
}

function start(){
	game = new Game();
	var game_loop;
	if(game.init()){
		// Set up game loop to display new frames at a fixed rate
		game_loop = setInterval(function(){
			// Logically separating updating and drawing
			game.checkPaused();
			game.checkLines();
			game.checkLoss();
			game.draw();
		}, 1000/60);
	}
	else{
		alert('You lack a browser able to run HTML5');
	}
	return game_loop;
}


$(document).ready(function(){
	new App();
});