'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import socket from '../lib/socket';
import { Socket } from 'socket.io-client';
import { useKaraokeData } from './karaoke';

const SocketContext = createContext<{ socket: Socket; connected: boolean; } | null>(null);

export const SocketProvider = ({ children }: { children : ReactNode }) => {
    const [connected, setConnected] = useState(false);
    const { increaseCoin, decreaseCoin } = useKaraokeData();

    useEffect(() => {
        socket.on('connect', () => {
            setConnected(true);
            console.log('연결됨 ㅎㅎ')
        });

        socket.on('coin-increase-client', (data) => {
            console.log(data)
            increaseCoin();
        });

        socket.on('coin-decrease-client', (data) => {
            console.log(data)
            decreaseCoin();
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