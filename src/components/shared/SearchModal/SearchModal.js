import React, {useState} from 'react';
import s from './SearchModal.module.css'
import search from '@/static/icons/search.svg'
import close from '@/static/icons/x-lg.svg'
import SearchInput from "../UI/SearchInput/SearchInput";
import Image from "next/image";
import {useRouter} from "next/router";
import {suggestSearch} from "@/http/productsApi";

const SearchModal = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('')
    const q = () => {
        const query = {}
        query.q = value
        const pathname = '/products'
        router.push({pathname, query})
        setIsOpen(false)
    }
    const [suggs, setSuggs] = useState([])
    const fetchSuggs = (str) => {
        setValue(str)
        suggestSearch(str).then(res => setSuggs(res))
    }
    const clickOnSugg = (url) => {
        router.push('/products?' + url)
        setIsOpen(false)
    }
    return (
        <>
            <button className={s.toggle_btn}
                    onClick={() => setIsOpen(!isOpen)}
            >
                <Image width={20} src={search} alt=""/>
            </button>
            {isOpen &&
                <div className={s.search_modal}>
                    <div className={s.close}
                         onClick={() => setIsOpen(false)}
                    >
                        <Image src={close} alt=""/>
                    </div>
                    <SearchInput w100={true}
                                 value={value}
                                 onChange={e => {
                                     fetchSuggs(e.target.value)
                                 }}
                                 onSubmit={q}
                    />
                    <div className={s.sug_block}>
                        {
                            suggs.map(el =>
                                <a className={s.sugg}
                                   href={'/products?' + el.url}
                                   onClick={(e) => {
                                       e.preventDefault()
                                       clickOnSugg(el.url)
                                   }}
                                >
                                    <div className={s.result}>
                                        {el.name}
                                    </div>
                                    <div className={s.type}>
                                        {el.type}
                                    </div>
                                </a>
                            )
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default SearchModal;