function object(updateDivide){
	this.x = 5;
	this.y = 9;
	
	this.xspeed = 0;
	this.yspeed = 0;
	
	this.width = 1;
	this.height = 1;
	

	this.update = function(){
		this.x += this.xspeed/updateDivide;
		this.y += this.yspeed/updateDivide;
	}
	
	this.show = function(){
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.rect(this.x * 20, this.y * 20, this.width * 20, this.height * 20);
		ctx.fill();
		ctx.closePath();
	}
}