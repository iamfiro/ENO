import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('New connection:', socket.id);

        socket.on('coin-increase-arduino', (data) => {
            socket.broadcast.emit('coin-increase-client', { value: data });
        });

        socket.on('coin-decrease-client', (data) => {
            socket.broadcast.emit('coin-decrease-arduino', { value: data });
        });

        socket.on('music-name-client', (data) => {
            socket.broadcast.emit('music-name-arduino', { value: data });
        });
    });

    httpServer.once('error', (err) => {
        console.error(err);
        process.exit(1);
    });

    httpServer.listen(port, () => {
        console.log(`> Ready on ${hostname}:${port}`);
    });
});