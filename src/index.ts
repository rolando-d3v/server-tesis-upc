// import path from 'path';               // ⬅️ nuevo
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import dotenv from 'dotenv';
// import { env_entorno } from "./env";
// import http from 'http';
// import { Server } from 'socket.io';


// import eventsRoutes from "./api/events/events.route";
// import tipo_eventoRoutes from "./api/tipo_evento/tipo_evento.route";
// import evento_fijoRoutes from "./api/evento_fijo/evento_fijo.route";

// import { setupMediasoup } from './webrtc/mediasoupSetup';

// dotenv.config();

const app = express();
// const server = http.createServer(app);

// WebSocket
// const io = new Server(server, {
//     cors: {
//         origin: '*', // ajusta esto si quieres restringirlo
//         methods: ["GET", "POST"],
//         credentials: true,
//     }
// });

// Eventos WebSocket
// io.on('connection', (socket) => {
//     console.log('🟢 Cliente conectado:', socket.id);
//     socket.on('ping-test', (msg) => {
//         console.log('📨 Ping recibido:', msg);
//         socket.emit('pong-test', { answer: 'pong', original: msg });
//     });

//     socket.on('disconnect', () => {
//         console.log('🔴 Cliente desconectado:', socket.id);
//     });
// });

// Exporta io para usar en otros módulos
// export { io };

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ⬅️ sirve archivos estáticos subidos
// app.use('/', express.static(path.join(__dirname, '/data')));
// app.use(express.static("data"));

// Rutas
// app.use('/comunicado', comunicadoRoutes);
// app.use('/reunion', reunionRoutes);
// app.use('/publicacion', publicacionRoutes);
// app.use('/tipoPublicacion', tipoPublicacionRoutes);

// app.use('/events', eventsRoutes);
// app.use('/tipo_evento', tipo_eventoRoutes);


const pepe = (req: Request, res: Response)  =>  {
    res.send('Hello World!');
}

app.use('/evento',pepe );

// Levantar servidor
const port = 4004;
// const port = env_entorno.PORT || 4004;
app.listen(port, () => {
// server.listen(port, () => {
    console.log(`🔥  🚀  Servidor Corriendo en el puerto ➡️ ${port}  ✔️`);
});
 
// …después de crear io
// setupMediasoup(io);     
// setupAlertasSocket(io);
