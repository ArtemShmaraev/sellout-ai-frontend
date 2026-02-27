import React, {useEffect, useRef, useState} from 'react';
import s from './SearchInput.module.css'
import icon from '@/static/icons/search.svg'
import cross from '@/static/icons/x-lg-copy.svg'
import Image from "next/image";
import Cookies from "js-cookie";

const SearchInput = ({w100, value, onChange, onSubmit, clearFunc, autoFocus, placeholder="Поиск среди 2'000'000+ товаров"}) => {
    const ref = useRef(null)
    const [selectedGender, setSelectedGender] = useState("any")
    useEffect(() => {
        if (autoFocus) {
            ref.current.focus()
        }
        if (Cookies.get('selected_gender')) {
            setSelectedGender(Cookies.get('selected_gender'))
        }
    }, []);
    if (placeholder === "Поиск среди 2'000'000+ товаров") {
        placeholder = selectedGender === "M" ? "Мужское: поиск среди 2'000'000+ товаров" : selectedGender === "F" ? "Женское: поиск среди 2'000'000+ товаров" : placeholder
    }
    return (
        <div className={s.input} style={w100 && {width: '100%'}}>
            <form onSubmit={(e) => {
                if (onSubmit) {
                    e.preventDefault()
                    onSubmit()
                } else {
                    e.preventDefault()
                }
            }}>
                <input
                    ref={ref}
                    type="text"
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={s.search}
                    style={
                    (w100 && clearFunc)
                        ? {width: '100%' ,padding: '5px 25px 5px 32px'}
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