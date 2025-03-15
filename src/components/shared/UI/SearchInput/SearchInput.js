import React from 'react';
import s from './SearchInput.module.css'
import icon from '@/static/icons/search.svg'
import Image from "next/image";

const SearchInput = () => {
    return (
        <div className={s.input}>
            <input
                type="text"
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
                placeholder='Поиск'
                className={s.search}
            />
            <Image
                className={s.icon}
                src={icon}
                alt="search"/>
        </div>
    );
};

export default SearchInput;