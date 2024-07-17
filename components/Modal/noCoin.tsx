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
                <span className={style.description}>옆에 있는 자전거를 돌려 코인을 채굴하세요!</span>
            </div>
        </div>
    );
}

export default ModalNoCoin;