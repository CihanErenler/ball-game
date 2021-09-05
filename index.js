const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

const full = Math.PI * 2;
let score = 0;

const ball = {
  x: 50,
  y: 50,
  radius: 15,
  dx: 5,
  dy: 5,
  color: "dodgerblue",
};

const brick = {
  x: canvas.width / 2 - 75,
  y: canvas.height - 30,
  width: 150,
  height: 20,
  dx: 0,
  speed: 12,
  color: "#333",
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, full);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function drawBrick() {
  ctx.fillStyle = brick.color;
  ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function brickPosition() {
  brick.x += brick.dx;

  if (brick.x + brick.width > canvas.width) {
    brick.x = canvas.width - brick.width;
  }
  if (brick.x < 0) {
    brick.x = 0;
  }
}

function reset() {
  ball.dx = 5;
  ball.dy = 5;
  ball.color = "dodgerblue";
  ball.x = 50;
  ball.y = 50;
}

function ballPosition() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }

  if (ball.y + ball.radius > canvas.height) {
    ball.dy *= -1;
    score = 0;
    reset();
  }

  if (
    (ball.x + ball.radius === brick.x - 10 && ball.y >= brick.y) ||
    (ball.x - ball.radius === brick.x + brick.width + 10 && ball.y >= brick.y)
  ) {
    reset();
  }
  if (ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  if (
    ball.x >= brick.x - 10 &&
    ball.x <= brick.x + brick.width + 10 &&
    ball.y + ball.radius > canvas.height - 30
  ) {
    ball.dy *= -1;
    score += 1;

    if (score % 10 === 0) {
      ball.dx += ball.dx < 0 ? -2 : 2;
      ball.dy += ball.dy < 0 ? -2 : 2;
      ball.color = randomColor();
    }
  }
}

function randomColor() {
  const red = Math.floor(Math.random() * 255 + 1);
  const green = Math.floor(Math.random() * 255 + 1);
  const blue = Math.floor(Math.random() * 255 + 1);

  const color = `rgb(${red},${green},${blue})`;

  return color;
}

function keyDown(e) {
  if (e.key === "ArrowRight") {
    brick.dx = brick.speed;
  }

  if (e.key === "ArrowLeft") {
    brick.dx = brick.speed * -1;
  }
}

function keyUp(e) {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    brick.dx = 0;
  }
}

function drawScore() {
  ctx.font = "25px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 130, 50);
}

function update() {
  clear();
  ballPosition();
  brickPosition();
  drawScore();
  drawBall();
  drawBrick();
  requestAnimationFrame(update);
}

update();
