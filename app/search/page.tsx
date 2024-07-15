'use client'

import MusicComponent from '@/components/music';
import Search from '@/components/Search';
import { MusicList } from '@/constants/music';
import style from '@/styles/searchPage.module.scss';
import { Music } from '@/types/music';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function SearchPage() {
    const searchParam = useSearchParams().get('q') || '';
    const [musicResults, setMusicResults] = useState<Music[] | never[]>([]);

    useEffect(() => {
        if (searchParam) {
            const results = MusicList.filter(music => 
                music.name.kr.toLowerCase().includes(searchParam.toLowerCase()) || 
                music.name.en.toLowerCase().includes(searchParam.toLowerCase()) ||
                music.artist.toLowerCase().includes(searchParam.toLowerCase())
            );
            setMusicResults(results);
        }
    }, [searchParam]);
  
    return (
        <>
        <main className={style.container}>
            <Search defaultText={searchParam} />
            <h2>음악 검색 결과</h2>
            <section>
                {
                    musicResults.map((music, index) => (
                        <MusicComponent key={index} name={music.name.kr} artist={music.artist} coverPath={music.coverPath} />
                    ))
                }
            </section>
        </main>
        </>
    );
}

export default SearchPage;