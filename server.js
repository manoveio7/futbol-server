const io = require('socket.io')(process.env.PORT || 3000, {
    cors: {
        origin: "*", // Esto permite que CUALQUIER página se conecte
        methods: ["GET", "POST"]
    }
});

console.log("Servidor funcionando...");

io.on('connection', (socket) => {
    console.log('Jugador conectado:', socket.id);

    socket.on('disparo', (datos) => {
        socket.broadcast.emit('oponente_mueve', datos);
    });
});
