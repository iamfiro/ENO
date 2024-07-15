'use client'

import Search from '@/components/Search'
import style from '../styles/page.module.scss'
import Image from 'next/image'
import { MusicList } from '@/constants/music';
import MusicComponent from '@/components/music';

export default function Home() {
    return (
        <main className={style.container}>
            <Search />
            <h1>ENO가 추천하는 노래</h1>
            <section className={style.musicContainer}>
                {
                    MusicList.map((music, index) => (
                        <MusicComponent key={index} name={music.name.kr} artist={music.artist} coverPath={music.coverPath} />
                    ))
                }
            </section>
        </main>
    );
}
