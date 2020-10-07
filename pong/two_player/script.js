var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ball = new object(15);
var isPaused = false;
var scoreR = 0;
var scoreL = 0;
var r = new object(1);
var l = new object(1);
var t = new object(1); 
var b = new object(1);
ball.xspeed = 1;
ball.yspeed = -0.45;
l.x = 2;
l.y = 6;
l.width = 1;
l.height = 6;
r.x = 17;
r.y = 6;
r.width= 1;
r.height = 6;
t.x = 0;
t.y = -1;
t.width= 20;
t.height = 1;
b.x = 0;
b.y = 20;
b.width= 20;
b.height = 1;

document.addEventListener("keydown", keyPressed);

function keyPressed(){
	if (event.keyCode == 38) {
		r.y -= 3;
	}
	if (event.keyCode == 40) {
		r.y += 3;
	}
	if (event.keyCode == 27) {
		l.y -= 3;
	}
	if (event.keyCode == 192) {
		l.y += 3;
	}
	if (event.keyCode == 32) {
		if (!isPaused) {
			game = clearInterval(game);
			isPaused = true;
		} 
		else if (isPaused) {
			game = setInterval(gameTime, 1000/200);
			isPaused = false;
		}
}
}


function clear(){
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.rect(0, 0, 400, 400);
	ctx.fill();
	ctx.closePath();
}

function showText(text, x, y){
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.font = "20px arial";
	ctx.fillText(text, x, y)
	ctx.closePath();
}

	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.rect(0, 0, 400, 400);
	ctx.fill();
	ctx.closePath();

var game = setInterval(gameTime, 1000/200);

function gameTime(){
	clear();
	ball.update();
	ball.show();
	r.show();
	l.update();
	l.show();
	showText(scoreL, 15, 30)
	showText(scoreR, 370, 30)
	if(collide(ball.x, ball.y, ball.width, ball.height, t.x, t.y, t.width, t.height) == true){
		ball.yspeed = ball.yspeed * -1;
	}
	if(collide(ball.x, ball.y, ball.width, ball.height, b.x, b.y, b.width, b.height) == true){
		ball.yspeed = ball.yspeed * -1;
	}
	if(collide(ball.x, ball.y, ball.width, ball.height, r.x, r.y, r.width, r.height) == true){
		if (ball.xspeed < 0) {
			ball.xspeed -= 0.025;
		}
		if (ball.xspeed > 0) {
			ball.xspeed += 0.025;
		}
		if (ball.yspeed < 0) {
			ball.yspeed -= 0.025;
		}
		if (ball.yspeed > 0) {
			ball.yspeed += 0.025;
		}
		ball.xspeed = ball.xspeed * -1;
	}
	if(collide(ball.x, ball.y, ball.width, ball.height, l.x, l.y, l.width, l.height) == true){
		if (ball.xspeed < 0) {
			ball.xspeed -= 0.025;
		}
		if (ball.xspeed > 0) {
			ball.xspeed += 0.025;
		}
		if (ball.yspeed < 0) {
			ball.yspeed -= 0.025;
		}
		if (ball.yspeed > 0) {
			ball.yspeed += 0.025;
		}
		ball.xspeed = ball.xspeed * -1;
	}
	if(ball.x >= 20){
		ball.x = 9;
		ball.y = 9;
		ball.xspeed = 1;
		ball.yspeed = Math.floor(Math.random() * 3.60) + 0.01;

		scoreL++;
	}
	if (ball.x <= -1) {
		ball.x = 9;
		ball.y = 9;
		ball.xspeed = 1;
		ball.yspeed = Math.floor(Math.random() * 3.60);
		scoreR++;
	}
}


