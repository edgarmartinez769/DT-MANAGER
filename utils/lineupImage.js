const { createCanvas } = require('canvas');

async function createLineupImage(match) {
    const canvas = createCanvas(1000, 600);
    const ctx = canvas.getContext('2d');

    // Canvas base (Cancha de fútbol)
    ctx.fillStyle = '#1e702d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Borde de la cancha
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Línea central y círculo
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 30);
    ctx.lineTo(canvas.width / 2, canvas.height - 30);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
    ctx.stroke();

    // Dibujar posiciones y jugadores por índice
    const totalPos = match.positions.length;

    match.positions.forEach((posName, index) => {
        const playerName = match.players[index] || "Libre";

        // Coordenadas calculadas dinámicamente
        const x = (canvas.width / (totalPos + 1)) * (index + 1);
        const y = canvas.height / 2;

        // Ficha del jugador
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(x, y - 15, 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Posición
        ctx.textAlign = 'center';
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(posName, x, y - 10);

        // Nombre del jugador
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(playerName, x, y + 35);
    });

    return canvas.toBuffer();
}

module.exports = createLineupImage;
