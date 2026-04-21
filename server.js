const io = require('socket.io')(process.env.PORT || 3000, {
    cors: {
        origin: "*", // Esto permite que tu GitHub Pages se conecte sin bloqueos
        methods: ["GET", "POST"]
    }
});

console.log("Servidor iniciado correctamente...");

io.on('connection', (socket) => {
    console.log('Un jugador se ha conectado. ID:', socket.id);

    // Escuchamos el evento 'disparo' que configuramos en el main.js
    socket.on('disparo', (datos) => {
        // Reenviamos los datos (fuerza, dirección, etc) a los demás
        socket.broadcast.emit('oponente_mueve', datos);
    });

    socket.on('disconnect', () => {
        console.log('Un jugador se desconectó.');
    });
});