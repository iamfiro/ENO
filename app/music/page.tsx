'use client';

import Image from 'next/image';
import Killometer from '../../public/km.png';
import Coin from '../../public/coin.png';
import style from '../../styles/music.module.scss';
import { MdMusicNote } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';
import { BsFillPlayFill } from "react-icons/bs";
import {useRouter, useSearchParams} from "next/navigation";
import {lyrics} from "@/constants/lyrics";

/**
 * MusicPlayer 컴포넌트
 * @returns {JSX.Element} 음악 플레이어 UI를 렌더링하는 컴포넌트
 */
function MusicPlayer(): JSX.Element {
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [play, setPlay] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lyricsRef = useRef<(HTMLHeadingElement | null)[]>([]);
    const router = useRouter();
    const searchParam = useSearchParams().get('name');
    const lyric = lyrics[searchParam || ''];
    if(!lyric) {
        router.push("/");
    } else {
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

        /**
         * 현재 가사로 스크롤 이동
         */
        const scrollToCurrentLyrics = () => {
        const currentLyricsIndex = lyric.findIndex((line) =>
            currentTime >= line.time && currentTime < (lyric[lyric.indexOf(line) + 1]?.time || Infinity)
        );
        const currentLyrics = lyricsRef.current[currentLyricsIndex];
        if (currentLyrics) {
            currentLyrics.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    }

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
                    {lyric.map((line, index) => (
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