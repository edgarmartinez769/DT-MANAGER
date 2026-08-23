const { createCanvas } = require('canvas');

async function createLineupImage(match) {
    const width = 800;
    const height = 500;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // 1. Dibujar cancha verde básico
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, 0, width, height);

    // Líneas de la cancha (borde y centro)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, width - 40, height - 40);
    
    ctx.beginPath();
    ctx.moveTo(width / 2, 20);
    ctx.lineTo(width / 2, height - 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 60, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Posicionar a los jugadores
    const total = match.positions.length;
    
    match.positions.forEach((posName, index) => {
        const player = match.players[index] || "Vacío";

        // Calcular coordenadas distribuidas de forma equitativa
        const x = (width / (total + 1)) * (index + 1);
        const y = height / 2;

        // Círculo del jugador
        ctx.fillStyle = '#1e90ff';
        ctx.beginPath();
        ctx.arc(x, y - 20, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Texto de Posición
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Sans-Serif';
        ctx.fillText(posName, x, y - 14);

        // Nombre del jugador
        ctx.fillStyle = '#ffff00';
        ctx.font = 'bold 18px Sans-Serif';
        ctx.fillText(player, x, y + 25);
    });

    return canvas.toBuffer();
}

module.exports = createLineupImage;
