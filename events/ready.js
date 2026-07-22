module.exports = {
    name: "ready",

    once: true,

    execute(client) {
        console.log(`DT Manager conectado como ${client.user.tag} ⚽`);
    },
};
