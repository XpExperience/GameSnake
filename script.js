const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20; // Tamanho de cada bloco
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: box * 5, y: box * 5 }];
let direction = 'RIGHT';
let food = spawnFood();
let score = 0;

// Controlar a direção da cobra
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
});

// Função para gerar a comida
function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
}

// Função principal do jogo
function gameLoop() {
    // Verifica se a cobra colidiu com as paredes
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height || collision(snake)) {
        clearInterval(game);
        alert('Game Over! Sua pontuação foi: ' + score);
        return;
    }

    // Mover a cobra
    const head = { x: snake[0].x, y: snake[0].y };
    
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'RIGHT') head.x += box;

    snake.unshift(head);

    // Verifica se comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
        document.getElementById('score').innerText = score;
    } else {
        snake.pop();
    }

    draw();
}

// Função para desenhar a cobra e a comida
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a cobra
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Desenha a comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
}

// Função para verificar colisão
function collision(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

// Inicia o jogo
const game = setInterval(gameLoop, 100);