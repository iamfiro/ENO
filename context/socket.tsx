'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import socket from '../lib/socket';
import { Socket } from 'socket.io-client';

const SocketContext = createContext<{ socket: Socket; connected: boolean; } | null>(null);

export const SocketProvider = ({ children }: { children : ReactNode }) => {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            setConnected(true);
            console.log('연결댐 수고링~')
        });

        socket.on('disconnect', () => {
            setConnected(false);
            console.log('연결끊김 ㅠㅠ')
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, connected }}>
            {children}
        </SocketContext.Provider>
    );
};