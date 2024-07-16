import Image from 'next/image';
import Coin from '../../public/coin.png';
import style from './style.module.scss';
import { useKaraokeData } from '@/context/karaoke';

function Remote() {
    const { coin } = useKaraokeData();
    return (
        <>
        <footer className={style.container} style={{ backgroundColor: coin === 0 ? '#a53100' : '#00A577' }}>
            <Image src={Coin} alt="coin" width={40} height={40} />
            <span>노래방 코인 {coin}개</span>
        </footer>
        </>
    );
}

export default Remote;