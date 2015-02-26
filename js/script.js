'use strict';

var game = function () {
	var W_CODE = 87,
		S_CODE = 83,
		UP_CODE = 38,
		DOWN_CODE = 40,
		WIDTH = 600,
		HEIGHT = 400,
		BALL_RADIUS = 20,
		PAD_WIDTH = 8,
		PAD_HEIGHT = 100,
		
		HALF_PAD_WIDTH = PAD_WIDTH / 2,
		HALF_PAD_HEIGHT = PAD_HEIGHT / 2,
		LEFT = false,
		RIGHT = true,
		
		ball_pos = [WIDTH/2, HEIGHT/2],
		ball_vel = [3, -1],
		paddle1_pos = HEIGHT/2-HALF_PAD_HEIGHT,
		paddle2_pos = HEIGHT/2-HALF_PAD_HEIGHT,
		paddle1_vel = 0,
		paddle2_vel = 0,
		score1 = 0,
		score2 = 0,

		context,
		dx = 4,
		dy = -4,
		x = ball_pos[0],
		y = ball_pos[1],
	
		//up,down,s,w
		keyStatus = {
			38 : false,
			40 : false,
			83 : false,
			87 : false
		},

		draw = function () {
			//update left paddle
			var lspeed = 0,
				rspeed = 0;

			context = myCanvas.getContext('2d');
			context.fillStyle ="#000000";
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
			context.fillStyle = "#0000ff";
			context.arc(x, y, BALL_RADIUS, 0, Math.PI*2 ,true);
			context.closePath();
			context.fill();

			//draw left paddle
			context.fillStyle = "#00ff00";
			context.fillRect(0, paddle1_pos, PAD_WIDTH, PAD_HEIGHT);
			context.fillText(score1,WIDTH/4,HEIGHT/4);

			//draw right paddle
			context.fillStyle =  "#ff0000";
			context.fillRect(
				WIDTH-PAD_WIDTH, 	paddle2_pos, 
				PAD_WIDTH, 			PAD_HEIGHT
			);
			context.fillText(score2, WIDTH/4*3, HEIGHT/4);

			if (keyStatus[W_CODE] && paddle1_pos > 0) {
				lspeed = -10;
			}

			if (keyStatus[S_CODE] && paddle1_pos < HEIGHT - PAD_HEIGHT) {
				lspeed = 10;
			}

			if (keyStatus[UP_CODE] && paddle2_pos > 0) {
				rspeed = -10;
			}

			if (keyStatus[DOWN_CODE] && paddle2_pos < HEIGHT - PAD_HEIGHT) {
				rspeed = 10;
			}

			paddle1_pos += lspeed;
			paddle2_pos += rspeed;


			//update ball
			if (x < BALL_RADIUS || x > WIDTH - BALL_RADIUS) {
				dx = -dx;
				if (x < BALL_RADIUS) {
					if (y < paddle1_pos || y > paddle1_pos + PAD_HEIGHT) {
						score2 = score2 + 1;
					} else {
						dx += dx*0.10;
						dy += dy*0.10;
					}
				}

				if (x > WIDTH - BALL_RADIUS) {
					if (y < paddle2_pos || y > paddle2_pos + PAD_HEIGHT) {
						score1 = score1 + 1;
					} else {
						dx += dx*0.10;
						dy += dy*0.10;	
					}
				}
			}

			if (y < BALL_RADIUS || y > HEIGHT - BALL_RADIUS) {
				dy = -dy;
			}

			x += dx;
			y += dy;
		};

	setInterval(draw,10);

	document.addEventListener('keydown', function(event) {
		var keyCode = ('which' in event) ? event.which : event.keyCode;
		keyStatus[keyCode] = true;
	}, true);

	document.addEventListener('keyup', function(event) {
		var keyCode = ('which' in event) ? event.which : event.keyCode;
		keyStatus[keyCode] = false;
	}, true);

	var drawLine = function (startX, startY, endX, endY) {
		context.beginPath();
		context.moveTo(startX, startY);
		context.lineTo(endX, endY);
		context.strokeStyle = "#fff";
  		context.stroke();
		context.closePath();
	}
}