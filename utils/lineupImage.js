const { createCanvas, loadImage } = require('canvas');
const path = require('path');

async function createLineupImage(match) {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    // Cargar cancha de fondo
    const bgPath = path.join(__dirname, '../assets/pitch.png');
    try {
        const background = await loadImage(bgPath);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    } catch (e) {
        // Si no hay fondo, dibujar cancha básica
        ctx.fillStyle = '#2e7d32';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Configuración de texto
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Sans-serif';

    // Coordenadas o distribución por índice de posición
    const totalPositions = match.positions.length;

    match.positions.forEach((posName, index) => {
        const player = match.players[index] || "Libre";

        // Distribución horizontal según número de jugadores
        const x = (canvas.width / (totalPositions + 1)) * (index + 1);
        const y = canvas.height / 2; 

        // Dibujar jugador y posición
        ctx.fillStyle = '#ffcc00';
        ctx.fillText(posName, x, y - 10);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(player, x, y + 15);
    });

    return canvas.toBuffer();
}

module.exports = createLineupImage;
