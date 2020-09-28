var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gs = 20;
var isOn = false;

canvas.addEventListener("mousemove", drawCoords);

function drawCoords(event){
	var mouseX = event.clientX;
	var mouseY = event.clientY;
	if(isOn){
		drawPixel(mouseX, mouseY);
	}
}

document.addEventListener("keydown", pauseThing);

function pauseThing(){
	if (event.keyCode == 32){
		if(isOn){
			isOn = false;
		}
		else{
			isOn = true;
		}
	}
}

function drawPixel(mouse_x, mouse_y){
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.rect(mouse_x - 10, mouse_y - 10, 10, 10);
	ctx.fill();
	ctx.closePath();
}

function fillBackground(){
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.rect(0, 0, 20 * gs, 20 * gs);
	ctx.fill();
	ctx.closePath();
}

fillBackground();




