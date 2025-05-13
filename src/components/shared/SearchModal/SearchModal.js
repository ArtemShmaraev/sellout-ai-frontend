import React, {useContext, useState} from 'react';
import s from './SearchModal.module.css'
import search from '@/static/icons/search.svg'
import close from '@/static/icons/x-lg.svg'
import SearchInput from "../UI/SearchInput/SearchInput";
import Image from "next/image";
import {useRouter} from "next/router";
import {suggestSearch} from "@/http/productsApi";
import {Context} from "@/context/AppWrapper";
import Link from "next/link";

const SearchModal = () => {
    const {filterStore} = useContext(Context)
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('')
    const q = () => {
        const query = {}
        query.q = value
        const pathname = '/products'
        router.push({pathname, query})
        filterStore.setQ(value)
        setIsOpen(false)
    }
    const [suggs, setSuggs] = useState([])
    const fetchSuggs = (str) => {
        setValue(str)
        suggestSearch(str).then(res => setSuggs(res))
    }
    const clearInput = () => {
        setValue('')
    }
    const clickOnSugg = () => {
        setIsOpen(false)
    }
    const toggleModal = () => {
        if (!isOpen) {
            document.body.classList.add('body-scroll-clip')
        } else {
            document.body.classList.remove('body-scroll-clip')
        }
        setIsOpen(!isOpen)
    }
    return (
        <>
            <button className={s.toggle_btn}
                    onClick={toggleModal}
            >
                <Image width={25} src={search} alt=""/>
            </button>
            {isOpen &&
                <div className={s.search_modal}>
                    <div className={s.close}
                    >
                        <Image src={close} alt="" onClick={toggleModal}/>
                    </div>
                    <SearchInput w100={true}
                                 value={value}
                                 onChange={e => {
                                     fetchSuggs(e.target.value)
                                 }}
                                 onSubmit={q}
                                 clearFunc={clearInput}
                                 autoFocus={true}
                    />
                    <div className={s.sug_block_mob}>
                        {
                            suggs.map(el =>
                                <Link className={s.sugg}
                                   href={'/products?' + el.url}
                                      onClick={clickOnSugg}
                                >
                                    <div className={s.result}>
                                        {el.name}
                                    </div>
                                    <div className={s.type}>
                                        {el.type}
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default SearchModal;