'use client';

import Image from 'next/image';
import Killometer from '../../public/km.png';
import Coin from '../../public/coin.png';
import style from '../../styles/music.module.scss';
import { MdMusicNote } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';
import { Lyrics } from '@/types/lyrics';
import { BsFillPlayFill } from "react-icons/bs";

/**
 * MusicPlayer 컴포넌트
 * @returns {JSX.Element} 음악 플레이어 UI를 렌더링하는 컴포넌트
 */
function MusicPlayer(): JSX.Element {
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [play, setPlay] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lyricsRef = useRef<(HTMLHeadingElement | null)[]>([]);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        const updateCurrentTime = () => setCurrentTime(audioElement.currentTime);
        audioElement.addEventListener('timeupdate', updateCurrentTime);

        return () => audioElement.removeEventListener('timeupdate', updateCurrentTime);
    }, []);

    useEffect(() => {
        scrollToCurrentLyrics();
    }, [currentTime]);

    useEffect(() => {
        audioRef.current?.play().then(() => {
            if(audioRef.current) {
                audioRef.current.volume = 0.5;
            }
        }).catch(error => console.error('Failed to play the audio:', error));
    }, []);

    const lyrics: Lyrics[] = [
        { time: 6, text: "As a child, you would wait and watch from far away" },
        { time: 11.8, text: "But you always knew that you'd be the one" },
        { time: 15, text: "That work while they all play" },
        { time: 18, text: "In youth, you'd lay awake at night and scheme" },
        { time: 24.4, text: "Of all the things that you would change" },
        { time: 27.7, text: "But it was just a dream" },
        { time: 30.8, text: "Here we are don't, turn away now (don't turn away)" },
        { time: 37, text: "We are the warriors that built this town" },
        { time: 43, text: "Here we are don't, turn away now (don't turn away)" },
        { time: 49.4, text: "We are the warriors that built this town" },
        { time: 55, text: "From dust" },
        { time: 56.5, text: 'Will come' },
        { time: 58.5, text: 'When you have to rise' },
        { time: 61.2, text: 'Above the best and prove yourself' },
        { time: 64.2, text: 'Your spirit never dies' },
        { time: 67.5, text: 'Farewell, I\'ve gone to take my throne above' },
        { time: 73.1, text: 'But don\'t weep for me' },
        { time: 75, text: 'Cause this will be the labor of my love' },
        { time: 80, text: "Here we are don't, turn away now (don't turn away)" },
        { time: 86, text: "We are the warriors that built this town" },
        { time: 92.5, text: "Here we are don't, turn away now (don't turn away)" },
        { time: 98, text: "We are the warriors that built this town" },
        { time: 104.5, text: "From dust" },
        { time: 108, text: '🎵' },
        { time: 116, text: '🎵' },
        { time: 129, text: "Here we are don't, turn away now (don't turn away)" },
        { time: 135, text: "We are the warriors that built this town" },
        { time: 142, text: "Here we are don't, turn away now (don't turn away)" },
        { time: 147.5, text: "We are the warriors that built this town" },
        { time: 153.5, text: "From dust" },
        { time: 155, text: '🎵' },
    ];

    /**
     * 현재 가사로 스크롤 이동
     */
    const scrollToCurrentLyrics = () => {
        const currentLyricsIndex = lyrics.findIndex((line) => 
            currentTime >= line.time && currentTime < (lyrics[lyrics.indexOf(line) + 1]?.time || Infinity)
        );
        const currentLyrics = lyricsRef.current[currentLyricsIndex];
        if (currentLyrics) {
            currentLyrics.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <main>
            <audio ref={audioRef} src='music.mp3' autoPlay></audio>
            <header className={style.header}>
                <h1 className={style.title}>ENO - ECO 노래방</h1>
                <div className={style.nameContainer}>
                    <MdMusicNote size={18} />
                    <span>Imagine Dragon · Warriors</span>
                </div>
                <div className={style.dataContainer}>
                    <div>
                        <Image className={style.image} src={Killometer} alt="kilometer" />
                        <span>3.2km</span>
                    </div>
                    <div>
                        <Image className={style.image} src={Coin} alt="coin" />
                        <span>3개</span>
                    </div>
                </div>
            </header>
            <section className={style.lyricsContainer}>
                <main>
                    {lyrics.map((line, index) => (
                        <h1
                            key={index}
                            ref={(el: any) => (lyricsRef.current[index] = el)}
                            className={style.lyrics}
                            data-now={currentTime >= line.time}
                        >
                            {line.text}
                        </h1>
                    ))}
                </main>
            </section>
            {!play && (
                <div className={style.imsi}>
                    <button onClick={() => {
                        setPlay(true);
                        audioRef.current?.play();
                    }}>
                        <BsFillPlayFill size={30} />
                    </button>
                </div>
            )}
        </main>
    );
}

export default MusicPlayer;