const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bounce = document.getElementById("bounce");
const bgMusic = document.getElementById("bg-music");
const input = document.getElementById("user-name");
const title = document.getElementById("title");
const startGameBtn = document.getElementById("start-game");
const startContainer = document.getElementById("start-container");
const count = document.querySelector(".count");

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);
input.addEventListener("input", updateTitle);
startGameBtn.addEventListener("click", startGame);

//Global variables
let playerName = "";

function updateTitle(e) {
  playerName = e.target.value;

  if (!e.target.value) {
    playerName = "Player";
  }
  title.textContent = `Welcome ${playerName}`;
}

const full = Math.PI * 2;
let score = 0;
bgMusic.volume = 0.2;

// Ball properties
const ball = {
  x: 50,
  y: 50,
  radius: 15,
  dx: 3,
  dy: 3,
  color: "dodgerblue",
};

// Brick properties
const brick = {
  x: canvas.width / 2 - 75,
  y: canvas.height - 20,
  width: 150,
  height: 15,
  dx: 0,
  speed: 5,
  color: "#333",
};

// Draw Ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, full);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Draw brick
function drawBrick() {
  ctx.fillStyle = brick.color;
  ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
}

// Clear the canvas
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Current crick position
function brickPosition() {
  brick.x += brick.dx;

  if (brick.x + brick.width > canvas.width) {
    brick.x = canvas.width - brick.width;
  }
  if (brick.x < 0) {
    brick.x = 0;
  }
}

// Reset the game
function reset() {
  ball.dx = 2;
  ball.dy = 2;
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
    ball.y + ball.radius > canvas.height - 20
  ) {
    ball.dy *= -1;
    score += 1;
    bounce.play();

    if (score % 10 === 0) {
      ball.dx += ball.dx < 0 ? -1 : 1;
      ball.dy += ball.dy < 0 ? -1 : 1;
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

function startGame() {
  if (!input.value) {
    input.classList.add("warning");
  } else {
    startContainer.style.display = "none";
    count.style.display = "block";
    
    let countValue = 3;
    count.textContent = countValue;
    const countDown = setInterval(() => {
      countValue -= 1;
      count.textContent = countValue;
      if (countValue === 0) {
        clearInterval(countDown);
        count.style.display = "none";
        update();
      }
    }, 1000);
    countDown;
  }
}

function countDown() {}
