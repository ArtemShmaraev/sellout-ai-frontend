import React, {useState} from 'react';
import s from './SearchModal.module.css'
import search from '@/static/icons/search.svg'
import close from '@/static/icons/x-lg.svg'
import SearchInput from "../UI/SearchInput/SearchInput";
import Image from "next/image";

const SearchModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button className={s.toggle_btn}
                    onClick={() => setIsOpen(!isOpen)}
            >
                <Image src={search} alt=""/>
            </button>
            {isOpen &&
                <div className={s.search_modal}>
                    <div className={s.close}
                         onClick={() => setIsOpen(false)}
                    >
                        <Image src={close} alt=""/>
                    </div>
                    <SearchInput/>
                </div>
            }
        </>
    );
};

export default SearchModal;