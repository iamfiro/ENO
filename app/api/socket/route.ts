import { NextApiRequest, NextApiResponse } from 'next';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';
import { NextResponse } from 'next/server';

export const config = {
    api: {
        bodyParser: false,
    },
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponse & { socket: { server?: ServerIO & { io?: ServerIO } } }) => {
  if (res.socket && !res.socket.server?.io) {
    console.log('Socket is initializing');
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer);
    if (res.socket.server) {
        res.socket.server.io = io;
    }

    io.on('connection', (socket) => {
      console.log('New connection:', socket.id);

      socket.on('message', (msg: string) => {
        console.log('Message received:', msg);
        io.emit('message', msg);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected:', socket.id);
      });
    });
  } else {
    console.log('Socket is already running');
  }
  return NextResponse.json({ message: 'Socket initialized' });
};

export default SocketHandler;
