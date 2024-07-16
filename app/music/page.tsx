'use client';

import Image from 'next/image';
import Killometer from '../../public/km.png';
import Coin from '../../public/coin.png';
import style from '../../styles/music.module.scss';
import { MdMusicNote } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {lyrics} from "@/constants/lyrics";
import { MusicList } from '@/constants/music';
import { useKaraokeData } from '@/context/karaoke';

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
    const searchParam = useSearchParams().get('n');
    const lyric = lyrics[searchParam || ''];
    const musicData = MusicList.find(music => music.name.en === searchParam);
    const { km, coin } = useKaraokeData();

    if(!lyric) {
        router.push("/");
        return <></>
    } else {
        useEffect(() => {
            const audioElement = audioRef.current;
            if (!audioElement) return;

            const updateCurrentTime = () => setCurrentTime(audioElement.currentTime);
            audioElement.addEventListener('timeupdate', updateCurrentTime);
            audioElement.addEventListener('ended', handleEnded)

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

        const handleEnded = () => {
            router.push('?m=mend');
        }

        return (
            <main>
                <audio ref={audioRef} src={musicData?.filePath}></audio>
                <header className={style.header}>
                    <h1 className={style.title}>ENO - ECO 노래방</h1>
                    <div className={style.nameContainer}>
                        <MdMusicNote size={18} />
                        <span>{musicData?.artist} · {musicData?.name.en}</span>
                    </div>
                    <div className={style.dataContainer}>
                        <div>
                            <Image className={style.image} src={Killometer} alt="kilometer" />
                            <span>{km}km</span>
                        </div>
                        <div>
                            <Image className={style.image} src={Coin} alt="coin" />
                            <span>{coin}개</span>
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
                        <h2>{musicData?.name.kr}</h2>
                        <span>{musicData?.artist}</span>
                        <Image src={musicData?.coverPath || ''} alt="music cover" width={200} height={200} />
                        <div className={style.hole}></div>
                        <button onClick={() => {
                            setPlay(true);
                            audioRef.current?.play();
                        }}>
                            <span>가사 표시하기</span>
                        </button>
                    </div>
                )}
            </main>
        );
    }
}

export default MusicPlayer;