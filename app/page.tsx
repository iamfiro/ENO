'use client'

import style from '../styles/page.module.scss'
import Image from 'next/image'

export default function Home() {
    return (
        <main className={style.container}>
            <h1>ENO가 추천하는 노래</h1>
            <section className={style.musicContainer}>
                <article className={style.music}>
                    <Image src={'/cover/warriors.jpeg'} width={200} height={200}  alt="kilometer" />
                    <span>Warriors</span>
                </article>
            </section>
        </main>
    );
}
