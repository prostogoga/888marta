const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 200, y: 500, width: 40, height: 40, dy: 0 };
let platforms = [];
let score = 0;
let gameOver = false;

function createPlatforms() {
    for (let i = 0; i < 5; i++) {
        platforms.push({ x: Math.random() * (canvas.width - 60), y: i * 100 + 100, width: 60, height: 10 });
    }
}

function drawPlayer() {
    ctx.fillStyle = 'orange';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function update() {
    if (gameOver) return;

    player.dy += 0.5; // Gravity
    player.y += player.dy;

    // Check for collisions with platforms
    platforms.forEach(platform => {
        if (player.y + player.height >= platform.y && player.y + player.height <= platform.y + platform.height &&
            player.x + player.width >= platform.x && player.x <= platform.x + platform.width) {
            player.dy = -312; // Увеличиваем силу прыжка
            score += 1; // Increase score
            if (score >= 100) {
                alert("Уровень пройден!");
                resetGame();
            }
        }
    });

    // Check for game over
    if (player.y > canvas.height) {
        gameOver = true;
        alert("Игра окончена! Набрано очков: " + score);
        resetGame();
    }

    // Reset position if player falls too low
    if (player.y > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawPlatforms();
}

function resetGame() {
    player.y = 500;
    player.dy = 0;
    score = 0;
    platforms = [];
    createPlatforms();
    gameOver = false;
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !gameOver) {
        player.dy = -312; // Увеличиваем начальную силу прыжка
    }
});

createPlatforms();
setInterval(update, 1000 / 60); // Game loop
