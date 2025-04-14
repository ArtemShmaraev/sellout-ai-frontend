import React from 'react';
import s from './SearchInput.module.css'
import icon from '@/static/icons/search.svg'
import Image from "next/image";

const SearchInput = ({w100, value, onChange}) => {
    return (
        <div className={s.input} style={w100 && {width: '100%'}}>
            <input
                type="text"
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
                value={value}
                onChange={onChange}
                placeholder='Поиск'
                className={s.search}
                style={w100 && {width: '100%'}}
            />
            <Image
                className={s.icon}
                src={icon}
                alt="search"/>
        </div>
    );
};

export default SearchInput;