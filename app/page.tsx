'use client'

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
    var AudioContext;
    var audioContext;
    useEffect(() => {
        window.onload = function() {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
                AudioContext = window.AudioContext || window.AudioContext;
                audioContext = new AudioContext();
            }).catch(e => {
                console.error(`Audio permissions denied: ${e}`);
            });
    }
    }, [])

    return (
        <main>

        </main>
    );
}
