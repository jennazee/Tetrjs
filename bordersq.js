function BorderSq() {
	this.width = 20;
 	this.color = '#333';
 	
 	var sqArray = Array();
	sqArray[0] =Array();
	sqArray[0][0] = 0;
	sqArray[0][1] = 0;

	this.sqArray = sqArray;
 }

BorderSq.prototype.draw = function(){
	var canvas = $('#mainCanvas')[0];
	this.ctx = canvas.getContext('2d');
	this.ctx.fillStyle = this.color;
	this.ctx.fillRect(this.sqArray[0][0]*this.width, this.sqArray[0][1]*this.width, this.width, this.width);
};

BorderSq.prototype.setLocation=function(x, y) {
	this.sqArray[0][0]=this.sqArray[0][0]+x;
	this.sqArray[0][1]=this.sqArray[0][1]+y;
}