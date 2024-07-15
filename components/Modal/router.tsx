'use client'

import { useSearchParams } from "next/navigation";
import ModalEndSong from "./endSong";

function ModalRouter() {
    const param = useSearchParams().get('m');

    switch (param) {
        case 'mend':
            return <ModalEndSong />
    }
}

export default ModalRouter;