var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gs = 20;
var xpos = 9;
var ypos = 9;
var xvelo = 0;
var yvelo = 0;
var isPaused = false;
var score = 0;
var scorePrev = 0;
var appleX = Math.floor(Math.random() * 20);
var appleY = Math.floor(Math.random() * 20);
var tail = [{x:0, y:0}, {x:20, y:20}, {x:20, y:20}, {x:20, y:20}, {x:20, y:20}, {x:20, y:20}];

document.addEventListener("keydown", keyPressed);

function keyPressed(){
	if (event.keyCode == 37 && xvelo != 1 && !isPaused) {
		xvelo = -1;
		yvelo = 0;
        canMove = false;
}

	if (event.keyCode == 38 && yvelo != 1 && !isPaused) {
		xvelo = 0;
		yvelo = -1;
        canMove = false;
}

	if (event.keyCode == 39 && xvelo != -1 && !isPaused) {
		xvelo = 1;
		yvelo = 0;
        canMove = false;
}

	if (event.keyCode == 40 && yvelo != -1 && !isPaused) {
		xvelo = 0;
		yvelo = 1;
        canMove = false;
}
	if (event.keyCode == 32) {
		if (!isPaused) {
			game = clearInterval(game);
			isPaused = true;
		} 
		else if (isPaused) {
			game = setInterval(gameInterval, 1000/8);
			isPaused = false;
		}

}
}

function fillBackground(){
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.rect(0, 0, 20 * gs, 20 * gs);
	ctx.fill();
	ctx.closePath();
}

function makeApple(applex, appley){
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.rect(applex * gs, appley * gs, 1 * gs, 1 * gs);
	ctx.fill();
	ctx.closePath();
}

function makeSnake(xpos, ypos){
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.rect(xpos * gs, ypos * gs, 1 * gs, 1 * gs);
	ctx.fill();
	ctx.closePath();
}

function frameLagFix(){
	makeSnake(xpos, ypos);
	makeApple(appleX, appleY);
}

fillBackground();

var game = setInterval(gameInterval, 1000/8);

function gameInterval(){
	console.log("hello");
	xpos += xvelo;
	ypos += yvelo;
	fillBackground();
	makeSnake(xpos, ypos);
	makeApple(appleX, appleY);
	tail.push({x:xpos, y:ypos})
	tail.shift();
	for (var i = 0; i < tail.length - 1; i++) {
		makeSnake(tail[i].x, tail[i].y);
		if (tail[i].x == appleX && tail[i].x == appleY) {
		appleX = Math.floor(Math.random() * 20);
		appleY = Math.floor(Math.random() * 20);
		tail.unshift({x:20, y:20});
		frameLagFix();
		score++;
		document.getElementById("score").innerHTML = score;
	}
		if (xpos == appleX && ypos == appleY) {
		appleX = Math.floor(Math.random() * 20);
		appleY = Math.floor(Math.random() * 20);
		tail.unshift({x:20, y:20});
		frameLagFix();
		score++;
		document.getElementById("score").innerHTML = score;
	}
		if (tail[i].x == xpos && tail[i].y == ypos) {
			tail.length = 6;
			tail[0].x = 20;
			tail[1].x = 20;
			tail[2].x = 20;
			tail[3].x = 20;
			tail[4].x = 20;
			tail[5].x = 20;
			tail[0].y = 20;
			tail[1].y = 20;
			tail[2].y = 20;
			tail[3].y = 20;
			tail[4].y = 20;
			tail[5].y = 20;
			xpos = 9;
			ypos = 9;
			fillBackground();
			makeSnake(xpos, ypos);
			makeApple(appleX, appleY)
			xvelo = 0;
			yvelo = 0;
			scorePrev = score;
			document.getElementById("scorePrev").innerHTML = scorePrev;
			score = 0;
			document.getElementById("score").innerHTML = score;
		}
	}

	if (xpos <= -1) {
		xvelo = -1;
		yvelo = 0;
		xpos = 20;
	}
	if (xpos >= 20 && xvelo != -1) {
		xvelo = 1;
		yvelo = 0;
		xpos = -1;
	}
	if (ypos <= -1) {
		yvelo = -1;
		xvelo = 0;
		ypos = 20;
	}
	if (ypos >= 20 && yvelo != -1) {
		yvelo = 1;
		xvelo = 0;
		ypos = -1;
	}
}

