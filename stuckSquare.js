function StuckSquare(color) {
	this.width = 20;
 	this.color = color;
 	
 	var sqArray = Array();
	sqArray[0] =Array();
	sqArray[0][0] = 0;
	sqArray[0][1] = 0;

	this.sqArray = sqArray;
 }

StuckSquare.prototype.draw = function(){
	var canvas = $('#mainCanvas')[0];
	this.ctx = canvas.getContext('2d');
	this.ctx.fillStyle = this.color;
	this.ctx.strokeStyle = '#191919';
	this.ctx.lineWidth = 2;

	this.ctx.fillRect(this.sqArray[0][0]*this.width, this.sqArray[0][1]*this.width, this.width, this.width);
	this.ctx.strokeRect(this.sqArray[0][0]*this.width, this.sqArray[0][1]*this.width, this.width, this.width);
};

StuckSquare.prototype.setLocation=function(x, y) {
	this.sqArray[0][0]=x;
	this.sqArray[0][1]=y;
};