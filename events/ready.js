module.exports = {
    name: "clientReady",

    once: true,

    execute(client) {
        console.log(`Tactify conectado como ${client.user.tag} ⚽`);
    },
};
