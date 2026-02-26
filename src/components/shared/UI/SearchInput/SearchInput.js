import React, {useEffect, useRef} from 'react';
import s from './SearchInput.module.css'
import icon from '@/static/icons/search.svg'
import cross from '@/static/icons/x-lg-copy.svg'
import Image from "next/image";

const SearchInput = ({w100, value, onChange, onSubmit, clearFunc, autoFocus}) => {
    const ref = useRef(null)
    useEffect(() => {
        if (autoFocus) {
            ref.current.focus()
        }
    }, []);
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
                    placeholder="Поиск среди 2'000'000+ товаров"
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