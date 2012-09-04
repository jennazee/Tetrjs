function JPiece(game) {
 	Piece.call(this);
 	this.color = 'gold';
 	this.game = game;

 	var sqArray = Array();
	var layoutArray = Array();

	sqArray[0] =Array();
	sqArray[0][0] = 0;
	sqArray[0][1] = 0;

	sqArray[1] =Array();
	sqArray[1][0]=1;
	sqArray[1][1]=0;

	sqArray[2] = Array();
	sqArray[2][0]=2;
	sqArray[2][1]=0;

	sqArray[3] = Array();
	sqArray[3][0]=2;
	sqArray[3][1]=1;

	this.sqArray = sqArray;
	this.layoutArray = sqArray;

 }
 
JPiece.prototype = new Piece(this.game);

JPiece.prototype.constructor = JPiece;