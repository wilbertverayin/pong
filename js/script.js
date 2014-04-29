function game(){
	var W_CODE = 87
	var S_CODE = 83
	var UP_CODE = 38
	var DOWN_CODE = 40

	var WIDTH = 600;
	var HEIGHT = 400;
	var BALL_RADIUS = 20;
	var PAD_WIDTH = 8;
	var PAD_HEIGHT = 100;
	var HALF_PAD_WIDTH = PAD_WIDTH / 2;
	var HALF_PAD_HEIGHT = PAD_HEIGHT / 2;
	var LEFT = false;
	var RIGHT = true;
	var ball_pos = [WIDTH/2, HEIGHT/2];
	var ball_vel = [3, -1];
	var paddle1_pos = HEIGHT/2-HALF_PAD_HEIGHT;
	var paddle2_pos = HEIGHT/2-HALF_PAD_HEIGHT;
	var paddle1_vel = 0;
	var paddle2_vel = 0;
	var score1 = 0;
	var score2 = 0;

	var context;
	var dx=4;
	var dy=-4;
	var x=ball_pos[0];
	var y=ball_pos[1];
	//up,down,s,w
	var keyStatus = {38:false,40:false,83:false,87:false};

	function draw() {
		context = myCanvas.getContext('2d');
		context.fillStyle="#000000";
		context.fillRect(0,0,WIDTH,HEIGHT);
		context.font = "30px Arial";

		//draw middle line
		drawLine(WIDTH/2, 0, WIDTH/2, HEIGHT);
		//draw right line
		drawLine(PAD_WIDTH, 0, PAD_WIDTH, HEIGHT);
		//draw left line
		drawLine(WIDTH - PAD_WIDTH, 0, WIDTH - PAD_WIDTH, HEIGHT);
		

  		//draw ball
		context.beginPath();
		context.fillStyle="#0000ff";
		context.arc(x,y,BALL_RADIUS,0,Math.PI*2,true);
		context.closePath();
		context.fill();

		//draw left paddle
		context.fillStyle="#00ff00";
		context.fillRect(0,paddle1_pos,PAD_WIDTH,PAD_HEIGHT);
		context.fillText(score1,WIDTH/4,HEIGHT/4);
		//draw right paddle
		context.fillStyle="#ff0000";
		context.fillRect(WIDTH-PAD_WIDTH,paddle2_pos,PAD_WIDTH,PAD_HEIGHT);
		context.fillText(score2,WIDTH/4*3,HEIGHT/4);
		//update left paddle
		var lspeed = 0;
		var rspeed = 0;
		if(keyStatus[W_CODE] && paddle1_pos > 0){
			lspeed = -10;
		}
		if(keyStatus[S_CODE] && paddle1_pos < HEIGHT - PAD_HEIGHT){
			lspeed = 10;
		}
		if(keyStatus[UP_CODE] && paddle2_pos > 0){
			rspeed = -10;
		}
		if(keyStatus[DOWN_CODE] && paddle2_pos < HEIGHT - PAD_HEIGHT){
			rspeed = 10;
		}

		paddle1_pos += lspeed;
		paddle2_pos += rspeed;


		//update ball
		if( x < BALL_RADIUS || x > WIDTH - BALL_RADIUS) {
			dx = -dx;
			if (x < BALL_RADIUS){
				if(y < paddle1_pos || y > paddle1_pos + PAD_HEIGHT) {
					score2 = score2 + 1;
				}
				else {
					dx+=dx*0.10;
					dy+=dy*0.10;
				}
			}
			if (x > WIDTH - BALL_RADIUS){
				if(y < paddle2_pos || y > paddle2_pos + PAD_HEIGHT) {
					score1 = score1 + 1;
				}
				else {
					dx+=dx*0.10;
					dy+=dy*0.10;	
				}
			}
		}

		if( y < BALL_RADIUS || y > HEIGHT - BALL_RADIUS) {
			dy = -dy;
		}			
			x += dx;
			y += dy;
	}

	setInterval(draw,10);


	document.addEventListener('keydown', function(event) {
		var keyCode = ('which' in event) ? event.which : event.keyCode;
		keyStatus[keyCode] = true;
	}, true);

	document.addEventListener('keyup', function(event) {
		var keyCode = ('which' in event) ? event.which : event.keyCode;
		keyStatus[keyCode] = false;
	}, true);

	function drawLine(startX, startY, endX, endY){
		context.beginPath();
		context.moveTo(startX, startY);
		context.lineTo(endX, endY);
		context.strokeStyle = "#fff";
  		context.stroke();
		context.closePath();
	}
}