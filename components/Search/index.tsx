import { useState } from 'react';
import style from './style.module.scss';
import { IoSearch } from "react-icons/io5";
import { useRouter } from 'next/navigation';

interface SearchProps {
    defaultText?: string;
}

function Search({ defaultText }: SearchProps) {
    const [inputText, setInputText] = useState("");
    const router = useRouter();

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            router.push(`/search?q=${inputText}`);
        }
    }

    return (
        <>
        <div className={style.container}>
            <IoSearch size={22} />
            <input defaultValue={defaultText} type="text" className={style.search} placeholder="검색어를 입력하세요" onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => handleEnter(e as any)} />
        </div>
        </>
    );
}

export default Search;