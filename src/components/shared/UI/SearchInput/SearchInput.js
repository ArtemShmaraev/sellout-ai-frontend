import React from 'react';
import s from './SearchInput.module.css'
import icon from '@/static/icons/search.svg'
import cross from '@/static/icons/x-lg-copy.svg'
import Image from "next/image";

const SearchInput = ({w100, value, onChange, onSubmit, ref, clearFunc = false}) => {
    return (
        <div className={s.input} style={w100 && {width: '100%'}}>
            <form onSubmit={onSubmit}>
                <input
                    ref={ref}
                    type="text"
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}
                    value={value}
                    onChange={onChange}
                    placeholder='Поиск'
                    className={s.search}
                    style={
                    (w100 && clearFunc)
                        ? {width: '100%' ,padding: '5px 25px 5px 28px'}
                        :
                        w100 ? {width: '100%'} : {}
                }
                />
                <Image
                    className={s.icon}
                    src={icon}
                    onClick={onSubmit}
                    alt="search"/>
                {
                    clearFunc &&
                    <Image
                        className={s.cross}
                        src={cross}
                        onClick={clearFunc}
                        alt="search"/>
                }
            </form>
        </div>
    );
};

export default SearchInput;