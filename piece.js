function Piece(game){
	this.width = 20;
	this.game = game;

	var sqArray = Array();
	var layoutArray = Array();

	//TODO: clean up this balegan
	sqArray[0]= Array();
	sqArray[0][0] = 0;
	sqArray[0][1] = 0;

	sqArray[1] =Array();
	sqArray[1][0]=0;
	sqArray[1][1]=0;

	sqArray[2] = Array();
	sqArray[2][0]=0;
	sqArray[2][1]=0;

	sqArray[3] = Array();
	sqArray[3][0]=0;
	sqArray[3][1]=0;
	
	this.color='#333';

	this.sqArray = sqArray;
	this.layoutArray = sqArray;
};

Piece.prototype.draw = function(){
	var canvas = $('#mainCanvas')[0];
	this.ctx = canvas.getContext('2d');	
	this.ctx.strokeStyle = '#191919';
	this.ctx.lineWidth = 2;
	this.ctx.fillStyle = this.color;

	this.ctx.fillRect(this.sqArray[0][0]*this.width, this.sqArray[0][1]*this.width, this.width, this.width);
	this.ctx.strokeRect(this.sqArray[0][0]*this.width, this.sqArray[0][1]*this.width, this.width, this.width);

	this.ctx.fillRect(this.sqArray[1][0]*this.width, this.sqArray[1][1]*this.width, this.width, this.width);
	this.ctx.strokeRect(this.sqArray[1][0]*this.width, this.sqArray[1][1]*this.width, this.width, this.width);

	this.ctx.fillRect(this.sqArray[2][0]*this.width, this.sqArray[2][1]*this.width, this.width, this.width);
	this.ctx.strokeRect(this.sqArray[2][0]*this.width, this.sqArray[2][1]*this.width, this.width, this.width);

	this.ctx.fillRect(this.sqArray[3][0]*this.width, this.sqArray[3][1]*this.width, this.width, this.width);
	this.ctx.strokeRect(this.sqArray[3][0]*this.width, this.sqArray[3][1]*this.width, this.width, this.width);
};


//smart pieces!!
Piece.prototype.checkValidDown=function() {
	for (var i=0; i<4; i++){
		if (board[this.sqArray[i][0]][this.sqArray[i][1]+1]!==undefined){
			return false
		}
	}
	return true;
}

Piece.prototype.checkValidLeft=function() {
	for (var i=0; i<4; i++){
		if (board[this.sqArray[i][0]-1][this.sqArray[i][1]]!==undefined){
			return false
		}
	}
	return true;
}

Piece.prototype.checkValidRight=function() {
	for (var i=0; i<4; i++){
		if (board[this.sqArray[i][0]+1][this.sqArray[i][1]]!==undefined){
			return false
		}
	}
	return true;
}

Piece.prototype.checkValidRotate=function() {
	if (board[this.sqArray[2][0]-this.sqArray[2][1] + this.sqArray[0][1]][this.sqArray[2][0]+this.sqArray[2][1] - this.sqArray[0][0]] !== undefined){
		return false
	}

	if (board[this.sqArray[2][0]-this.sqArray[2][1] + this.sqArray[1][1]][this.sqArray[2][0]+this.sqArray[2][1] - this.sqArray[1][0]] !== undefined){
		return false
	}

	if (board[this.sqArray[2][0]-this.sqArray[2][1] + this.sqArray[3][1]][this.sqArray[2][0]+this.sqArray[2][1] - this.sqArray[3][0]] !== undefined){
		return false
	}
	return true;
}

Piece.prototype.moveDown= function(array) {
	if (this.checkValidDown()) {//if it can move down, move all 4 component squares down
		for (var i=0; i<4; i++){
			this.sqArray[i][1]++
		}
	}
	else {
		this.stick();
	}
	this.game.draw();
	this.game.checkLoss();
	this.game.checkLines();
};

Piece.prototype.moveLeft=function() {
	//if it can move left, move all 4 component squares left
	if (this.checkValidLeft()){
		for (var i=0; i<4; i++){
			this.sqArray[i][0]--
		}
	}
	this.game.draw();
};

Piece.prototype.moveRight=function() {
	//if it can move down, move all 4 component squares right
	if (this.checkValidRight()){
		for (var i=0; i<4; i++){
			this.sqArray[i][0]++
		}
	}
	this.game.draw();
};

Piece.prototype.drop=function(){
	while (this.checkValidDown()){
		this.moveDown();
	}
	this.game.draw();
}

Piece.prototype.rotate=function() {
	//newx = centerOfRotationX - centerOfRotationY + oldYLocation
	//newy = centerOfRotationY + centerOfRotationX - oldXLocation
	if (this.checkValidRotate()){
		var oldx0 = this.sqArray[0][0]
		var oldy0 = this.sqArray[0][1]

		var oldx1 = this.sqArray[1][0]
		var oldy1 = this.sqArray[1][1]

		var oldx3 = this.sqArray[3][0]
		var oldy3 = this.sqArray[3][1]


		this.sqArray[0][0] = this.sqArray[2][0]-this.sqArray[2][1] + oldy0;
		this.sqArray[0][1] = this.sqArray[2][0]+this.sqArray[2][1] - oldx0;

		this.sqArray[1][0] = this.sqArray[2][0]-this.sqArray[2][1] + oldy1;
		this.sqArray[1][1] = this.sqArray[2][0]+this.sqArray[2][1] - oldx1;

		this.sqArray[3][0] = this.sqArray[2][0]-this.sqArray[2][1] + oldy3;
		this.sqArray[3][1] = this.sqArray[2][0]+this.sqArray[2][1] - oldx3;
	}
	this.game.draw();
};

Piece.prototype.setLocation=function(x, y) {
	for (var i=0; i<4; i++){
		this.sqArray[i][0]=this.layoutArray[i][0]+x;
		this.sqArray[i][1]=this.layoutArray[i][1]+y;
	}
	this.game.draw();
};

Piece.prototype.stick=function(){
	for (var i=0; i<4; i++){
		board[this.sqArray[i][0]][this.sqArray[i][1]]= new StuckSquare(this.color);
		board[this.sqArray[i][0]][this.sqArray[i][1]].setLocation(this.sqArray[i][0], this.sqArray[i][1]);
	}
	currPiece = new this.game.pieceFactory(this.game);
	if (!lost){	
		currPiece.setLocation(9,1);
		this.game.draw();
	}
}
