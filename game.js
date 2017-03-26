//TETRIS

function Game() {
	//variables that change based on game state
	this.scoreCounter = 0;
	this.dialog = new Dialog();
}

var go = false;
var lost = false;
var fresh = true;
var tetris = false;

var rows;
var cols;
var sqWidth = 20;
var panelWidth;
var scorePanelHeight = 60;
var gamePanelHeight;
var currPiece;
var speediness = 1000;

var board = Array();

Game.prototype.init = function(){
	currPiece = this.pieceFactory(this);
	var canvas = $('#mainCanvas')[0];
  	if(canvas.getContext){
    	/* This is the 2d rendering context you will be drawing on. */
		this.ctx = canvas.getContext('2d');

		//keeping everything contingent on that which cannot be set here (canvas dimensions)
		panelWidth = $('#mainCanvas').width();
		gamePanelHeight = $('#mainCanvas').height()-scorePanelHeight;
		rows = gamePanelHeight/sqWidth+1;
		cols= panelWidth/sqWidth;
		
		//game panel
		this.ctx.fillStyle = '#191919';
		this.ctx.fillRect(0, 0, panelWidth, gamePanelHeight);
		

		//make the pieces array. It's empty until pieces start sticking
		for (var j=0; j<rows; j++){ 
			board[j]= new Array();
		}
		
		for (var y=0; y<rows; y++){
			board[0][y]=new BorderSq();
			board[0][y].setLocation(0,y);

			board[cols-1][y]=new BorderSq();
			board[cols-1][y].setLocation(cols-1,y);
		}

		for (var x=0; x<cols; x++){
			board[x][0]= new BorderSq();
			board[x][rows-1]=new BorderSq();
			board[x][0].setLocation(x,0);
			board[x][rows-1].setLocation(x, rows-1);
		}

		currPiece.setLocation(9,1);

		for (var r=0; r<rows; r++){
			for (var c=0; c<cols; c++){
				if (board[c][r]){
					board[c][r].draw()
				}
			}
		}

		//score panel
		this.ctx.fillStyle = '#333333';
		this.ctx.fillRect(0, gamePanelHeight, panelWidth, scorePanelHeight);
		this.ctx.font = '30px Century Gothic'
		this.ctx.fillStyle = '#FF3333';
		this.ctx.fillText('Score: '+ this.scoreCounter, 20, gamePanelHeight+40, panelWidth-20);
		this.ctx.fillStyle = '00CCCC';

		//welcome dialog
		this.ctx.fillStyle= this.dialog.color;
		this.ctx.fillRect(this.dialog.x, this.dialog.y, this.dialog.width, this.dialog.height);
		this.ctx.fillStyle = 'Black';
		this.ctx.font = '22px Century Gothic, Calibri';
		this.ctx.fillText('Click to Make it Rain Pieces!', this.dialog.x + 10, this.dialog.y+40, 280);
		this.ctx.font = '14px Century Gothic, Calibri';
		this.ctx.fillText('Left = J-Key, Right = L-key', this.dialog.x + 35, this.dialog.y+70, 230);
		this.ctx.fillText('Rotate = K-key, Down = Comma-key', this.dialog.x + 35, this.dialog.y+90, 230);
		this.ctx.fillText('Drop = Space', this.dialog.x + 35, this.dialog.y+110, 230);
		this.ctx.fillText('Pause = P-key', this.dialog.x + 35, this.dialog.y+130, 230);
		return true;
	}
	return false;
}

//DRAWING updates
Game.prototype.draw=function() {
	var canvas = $('#mainCanvas')[0];

	if (go){
		//game panel
		this.ctx.fillStyle = '#191919';
		this.ctx.fillRect(0, 0, panelWidth, gamePanelHeight);

		for (var r=0; r<rows; r++){
			for (var c=0; c<cols; c++){
				if (board[c][r]){
					board[c][r].draw()
				}
			}
		}

		//score panel
		this.ctx.fillStyle = '#333333';
		this.ctx.fillRect(0, gamePanelHeight, panelWidth, scorePanelHeight);
		this.ctx.font = '30px Century Gothic'
		this.ctx.fillStyle = '#FF3333';
		this.ctx.fillText('Score: '+ this.scoreCounter, 20, gamePanelHeight+40, panelWidth-20);
		this.ctx.fillStyle = '00CCCC';

		currPiece.draw();
	}

	else {
		 if(!lost && !fresh){
			//paused dialog
 			this.ctx.fillStyle= this.dialog.color;
			this.ctx.fillRect(this.dialog.x, this.dialog.y, this.dialog.width, this.dialog.height);
			this.ctx.fillStyle = 'Black';
			this.ctx.font = '22px Century Gothic, Calibri';
			this.ctx.fillText('Game Paused.', this.dialog.x + 65, this.dialog.y+80, 280);
		}

		else if (lost && !fresh) {
			this.ctx.fillStyle= this.dialog.color;
			this.ctx.fillRect(this.dialog.x, this.dialog.y, this.dialog.width, this.dialog.height);
			this.ctx.fillStyle = 'Black';
			this.ctx.font = '22px Century Gothic, Calibri';
			this.ctx.fillText('Sorry Bro. Game Over.', this.dialog.x + 30, this.dialog.y+70, 280);
			this.ctx.font = '14px Century Gothic, Calibri';
			this.ctx.fillText('Click to start a new game.', this.dialog.x + 55, this.dialog.y+95, 230);
			return;
		}
	}	
}
Game.prototype.pieceFactory=function(game) {
	switch (Math.floor(Math.random()*7)){

		case 0:
			return new IPiece(game);

		case 1:
			return new JPiece(game);

		case 2:
			return new LPiece(game);

		case 3:
			return new OPiece(game);

		case 4:
			return new SPiece(game);

		case 5:
			return new TPiece(game);

		case 6:
			return new ZPiece(game);
	}
}


Game.prototype.checkLines=function() {
	var numCleared=0;
	for (var j=1; j<rows-1; j++) {
		var numFull = 0;
		for (var i=1; i<cols-1; i++){
			if (board[i][j]===undefined){
				break;
			}
			else {
				numFull++;
			} 
		}
		if (numFull===cols-2){
			numCleared++;
			for (var p=j; p>2; p--){
				//cols
				for (var q=1; q<cols-1; q++){
					board[q][p] = board[q][p-1]
					if (board[q][p]!==undefined){
					 	board[q][p].setLocation(q,p);
					 	this.draw();
					}
				}
			}
			if (speediness > 100) {
				speediness = speediness - 50;
			}
			this.scoreCounter = this.scoreCounter + 10;
			//one tetris
			if (numCleared === 4 && !tetris) {
				this.scoreCounter = this.scoreCounter + 100;
				tetris = true;
			}
			//back to back tetrises!!!
			else if (numCleared === 4 && tetris) {
				this.scoreCounter = this.scoreCounter + 500;
			}
			else {
				tetris = false;
			}
		}
	}
}

Game.prototype.checkLoss=function() {
	for (s=0;s<4;s++){
		if (board[currPiece.sqArray[s][0]][currPiece.sqArray[s][1]]!==undefined){
			go = false;
			lost = true;
			this.draw()
		}
	}
}
