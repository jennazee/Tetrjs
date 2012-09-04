function OPiece(game) {
 	Piece.call(this);
 	this.game = game
 	this.color = '#b650ff';

 	var sqArray = Array();
	var layoutArray = Array();

	sqArray[0] =Array();
	sqArray[0][0] = 0;
	sqArray[0][1] = 0;

	sqArray[1] =Array();
	sqArray[1][0]=1;
	sqArray[1][1]=0;

	sqArray[2] = Array();
	sqArray[2][0]=0;
	sqArray[2][1]=1;

	sqArray[3] = Array();
	sqArray[3][0]=1;
	sqArray[3][1]=1;

	this.sqArray = sqArray;
	this.layoutArray = sqArray;

 }
 
OPiece.prototype = new Piece(this.game);

OPiece.prototype.constructor = OPiece;