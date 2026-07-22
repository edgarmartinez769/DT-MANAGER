const { createCanvas } = require("canvas");


async function createLineupImage(match) {


    const canvas = createCanvas(1000, 700);

    const ctx = canvas.getContext("2d");



    // Fondo de cancha

    ctx.fillStyle = "#1f8f3a";

    ctx.fillRect(0, 0, 1000, 700);



    // Líneas de cancha

    ctx.strokeStyle = "white";

    ctx.lineWidth = 5;


    ctx.strokeRect(
        50,
        50,
        900,
        600
    );



    // Línea central

    ctx.beginPath();

    ctx.moveTo(500, 50);

    ctx.lineTo(500, 650);

    ctx.stroke();



    // Círculo central

    ctx.beginPath();

    ctx.arc(
        500,
        350,
        80,
        0,
        Math.PI * 2
    );

    ctx.stroke();



    // Formación

    ctx.fillStyle = "white";

    ctx.font = "bold 40px Arial";

    ctx.textAlign = "center";


    ctx.fillText(
        `⚽ ${match.formation}`,
        500,
        40
    );



    // Jugadores

    let y = 130;


    match.positions.forEach((position) => {


        const player =
            match.players[position] || "Libre";



        ctx.font = "bold 28px Arial";


        ctx.fillText(
            position,
            500,
            y
        );



        ctx.font = "22px Arial";


        ctx.fillText(
            player,
            500,
            y + 35
        );



        y += 80;


    });



    return canvas.toBuffer();

}



module.exports = createLineupImage;
