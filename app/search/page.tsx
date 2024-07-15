'use client'

import MusicComponent from '@/components/music';
import Search from '@/components/Search';
import { ArtistList } from '@/constants/artist';
import { MusicList } from '@/constants/music';
import style from '@/styles/searchPage.module.scss';
import { ArtistType, Music } from '@/types/music';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function SearchPage() {
    const searchParam = useSearchParams().get('q') || '';
    const [musicResults, setMusicResults] = useState<Music[] | never[]>([]);
    const [artistResults, setArtistResults] = useState<ArtistType[] | never[]>([]);

    useEffect(() => {
        if (searchParam) {
            const results = MusicList.filter(music => 
                music.name.kr.toLowerCase().includes(searchParam.toLowerCase()) || 
                music.name.en.toLowerCase().includes(searchParam.toLowerCase()) ||
                music.artist.toLowerCase().includes(searchParam.toLowerCase())
            );
            setMusicResults(results);

            const artistResults = ArtistList.filter(artist => artist.name.toLowerCase().includes(searchParam.toLowerCase()));
            setArtistResults(artistResults);
        }
    }, [searchParam]);

    console.log(artistResults);
  
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
            <h2 style={{ marginTop: '40px' }}>아티스트 검색 결과</h2>
            <section>
                {
                    artistResults.map((artist, index) => (
                        <MusicComponent.Artist key={index} name={artist.name} image={artist.image} />
                    ))
                }
            </section>
        </main>
        </>
    );
}

export default SearchPage;