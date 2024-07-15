import Modal from "./common";
import style from './modal.module.scss';
import { MdOutlineMicExternalOn } from "react-icons/md";

function ModalEndSong() {
    return (
        <Modal.Backdrop>
            <div className={style.modal}>
                <Modal.Top color="#FF0000" icon={<MdOutlineMicExternalOn />}>노래 종료</Modal.Top>
                asd
            </div>
        </Modal.Backdrop>
    );
}

export default ModalEndSong;