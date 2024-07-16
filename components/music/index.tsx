import Image from 'next/image';
import style from './style.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import ModalNoCoin from '../Modal/noCoin';
import { useKaraokeData } from '@/context/karaoke';
import { useRouter } from 'next/navigation';

interface MusicInterface {
    name: string;
    artist: string;
    coverPath: string;
}

function MusicComponent({ name, artist, coverPath }: MusicInterface) {
    const [modalVisible, setModalVisible] = useState(false);
    const { coin } = useKaraokeData();
    const router = useRouter();

    const handleClick = () => {
        if(coin === 0) {
            setModalVisible(true);
        } else {
            router.push(`/music?n=${name}`);
        }
    }

    return (
        <>
            <button onClick={() => handleClick()} style={{ textDecoration: 'none', border: 'none', backgroundColor: 'transparent' }}>
                <Image className={style.image} src={coverPath} alt="music cover" width={200} height={200} />
                <h3 className={style.title}>{name}</h3>
                <span className={style.artist}>{artist}</span>
            </button>
            <ModalNoCoin isVisible={modalVisible} setVisible={setModalVisible} />
        </>
    );
}

export default MusicComponent;