const WebSocket = require('ws');

const wss = new WebSocket.Server(
    { port: 8080 }, () => {
        console.log("ws startuje na porcie " + 8080)
    });
// const clientSocket = new WebSocket('ws://localhost:2154');

//reakcja na podłączenie klienta i odesłanie komunikatu

wss.on('connection', (ws, req) => {

    //adres ip klienta

    const clientip = req.connection.remoteAddress;

    //reakcja na komunikat od klienta

    ws.on('message', function message(data, isBinary) {
        const message = isBinary ? data : data.toString();
        console.log(message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })
      });

});