import Image from 'next/image';
import style from './style.module.scss';
import Link from 'next/link';

interface MusicInterface {
    name: string;
    artist: string;
    coverPath: string;
}

function MusicComponent({ name, artist, coverPath }: MusicInterface) {
    return (
        <>
            <Link href={`/music?n=${name}`} style={{ textDecoration: 'none' }}>
                <Image className={style.image} src={coverPath} alt="music cover" width={200} height={200} />
                <h3 className={style.title}>{name}</h3>
                <span className={style.artist}>{artist}</span>
            </Link>
        </>
    );
}

function ArtistComponent({ name, image }: { name: string, image: string }) {
    return (
        <>
            <Link href={`/artist?n=${name}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                <Image className={style.artistImage} src={image} alt="music cover" width={200} height={200} />
                <h3 className={style.name}>{name}</h3>
            </Link>
        </>
    )
}

MusicComponent.Artist = ArtistComponent;

export default MusicComponent;