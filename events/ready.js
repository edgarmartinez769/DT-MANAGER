module.exports = {
    name: "clientReady",

    once: true,

    execute(client) {
        console.log(`DT Manager conectado como ${client.user.tag} ⚽`);
    },
};
