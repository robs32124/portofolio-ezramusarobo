const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ukuran kotak grid
const boxSize = 20;

// Posisi ular dan makanan
let snake, food, score, direction, game;

// Tombol kontrol
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const scoreDisplay = document.getElementById('score');

// Fungsi untuk memulai ulang game
function resetGame() {
    // Posisi awal ular
    snake = [{ x: 9 * boxSize, y: 10 * boxSize }];
    // Posisi awal makanan
    food = {
        x: Math.floor(Math.random() * 20) * boxSize,
        y: Math.floor(Math.random() * 20) * boxSize,
    };
    score = 0;
    direction = null;
    scoreDisplay.innerText = 'Score: 0';
    clearInterval(game); // Hentikan interval lama
}

// Fungsi utama game
function draw() {
    // Latar belakang
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gambar makanan
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Gambar ular
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }

    // Gerakan ular
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'UP') snakeY -= boxSize;
    if (direction === 'DOWN') snakeY += boxSize;
    if (direction === 'LEFT') snakeX -= boxSize;
    if (direction === 'RIGHT') snakeX += boxSize;

    // Cek tabrakan dengan makanan
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreDisplay.innerText = 'Score: ' + score;
        food = {
            x: Math.floor(Math.random() * 20) * boxSize,
            y: Math.floor(Math.random() * 20) * boxSize,
        };
    } else {
        snake.pop(); // Hilangkan bagian terakhir jika tidak makan
    }

    const newHead = { x: snakeX, y: snakeY };

    // Cek tabrakan dengan dinding atau tubuh sendiri
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert('Game Over! Skor Kamu: ' + score);
        restartButton.style.display = 'block';
        return;
    }

    snake.unshift(newHead);
}

// Cek tabrakan ular dengan tubuhnya
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Kontrol ular dengan tombol panah
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Tombol Start Game
startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    resetGame();
    game = setInterval(draw, 150);
});

// Tombol Restart Game
restartButton.addEventListener('click', () => {
    restartButton.style.display = 'none';
    resetGame();
    game = setInterval(draw, 150);
});

// Atur posisi awal
resetGame();
