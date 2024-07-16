import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const serealPort = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 });
const parser = serealPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('New connection:', socket.id);

        parser.on('data', (data) => {
            console.log('Received data:', data);
            socket.emit('serial-data', data);
        });

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