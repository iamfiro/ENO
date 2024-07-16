'use client'

import { useKaraokeData } from "@/context/karaoke";
import socket from "@/lib/socket";

function Admin() {
    const { coin } = useKaraokeData();
    const handleUp = () => {
        console.log('ssad')
        socket.emit('coin-increase-arduino', true);
    }

    const handleDown = () => {
        console.log('sad')
        socket.emit('coin-decrease-arduino', true);
    }
    return (
        <>
        <main>
            <button onClick={() => handleUp()}>코인 추가</button>
            <button onClick={() => handleDown()}>코인 삭제</button>
        </main>
        </>
    );
}

export default Admin;