const io = require('socket.io')(process.env.PORT || 3000, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

let jugadoresConectados = 0;
let saqueInicial = Math.random() < 0.5 ? 'AZUL' : 'ROJO'; // El servidor decide

io.on('connection', (socket) => {
    jugadoresConectados++;
    console.log('Jugador conectado. Total:', jugadoresConectados);

    // Cuando alguien se conecta, le enviamos quién debe sacar
    socket.emit('configuracion_inicial', {
        equipoQueSaca: saqueInicial
    });

    socket.on('disparo', (datos) => {
        socket.broadcast.emit('oponente_mueve', datos);
    });

    socket.on('disconnect', () => {
        jugadoresConectados--;
    });
});
