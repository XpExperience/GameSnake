const { spawnFood, collision } = require('../script.js'); // Ajuste o caminho conforme necessário

describe('Jogo da Cobra', () => {
    let snake;

    beforeEach(() => {
        // Configura a cobra antes de cada teste
        snake = [{ x: 20, y: 20 }, { x: 20, y: 40 }];
    });

    test('spawnFood deve gerar comida dentro dos limites do canvas', () => {
        const food = spawnFood();
        expect(food.x).toBeGreaterThanOrEqual(0);
        expect(food.x).toBeLessThan(400);
        expect(food.y).toBeGreaterThanOrEqual(0);
        expect(food.y).toBeLessThan(400);
    });

    test('collision deve retornar true quando a cobra colide com ela mesma', () => {
        expect(collision(snake)).toBe(true);
    });

    test('collision deve retornar false quando a cobra não colide com ela mesma', () => {
        snake[0] = { x: 20, y: 20 }; // cabeça
        snake[1] = { x: 20, y: 0 };  // corpo
        expect(collision(snake)).toBe(false);
    });
});