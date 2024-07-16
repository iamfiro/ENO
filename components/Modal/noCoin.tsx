import style from './style.module.scss';
import Image from 'next/image';
import Coin from '../../public/coin.png';

interface ModalNoCoinProps {
    isVisible: boolean;
    setVisible: (isVisible: boolean) => void;
}

function ModalNoCoin({ isVisible, setVisible }: ModalNoCoinProps) {
    return (
        <div className={style.backdrop} style={{ display: isVisible ? 'flex' : 'none' }} onClick={() => setVisible(false)}>
            <div className={style.modal}>
                <Image src={Coin} alt="coin" width={40} height={40} style={{ marginBottom: '10px' }} />
                <h1 className={style.title}>노래방 코인이 없습니다</h1>
                <span className={style.description}>ENO는 뭐시기뭐시기</span>
            </div>
        </div>
    );
}

export default ModalNoCoin;