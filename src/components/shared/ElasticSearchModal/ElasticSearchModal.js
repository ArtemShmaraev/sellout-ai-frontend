import React, {useContext, useRef, useState} from 'react';
import s from './ElasticSearchModal.module.css'
import search from '@/static/icons/search.svg'
import close from '@/static/icons/x-lg.svg'
import Image from "next/image";
import {Container} from "react-bootstrap";
import SearchInput from "@/components/shared/UI/SearchInput/SearchInput";
import {useRouter} from "next/router";
import {addFilterSearch, suggestSearch} from "@/http/productsApi";
import {Context} from "@/context/AppWrapper";
import Link from "next/link";

const ElasticSearchModal = () => {
    const {filterStore} = useContext(Context)
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('')
    const inputRef = useRef(null)
    const q = async () => {
        const query = {}
        query.q = value
        const filters = await addFilterSearch(value)
        for (const key in filters) {
            if (filters[key]) {
                query[key] = filters[key]
            }
        }
        const pathname = '/products'
        router.push({pathname, query})
        filterStore.setQ(value)
        setIsOpen(false)
    }
    const [suggs, setSuggs] = useState([])
    const fetchSuggs = (str) => {
        setValue(str)
        if (str) {
            suggestSearch(str).then(res => setSuggs(res))
        } else {
            setSuggs([])
        }
    }
    const clearInput = () => {
        setValue('')
    }
    const clickOnSugg = () => {
        setIsOpen(false)
    }
    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={s.toggle_btn}
            >
                <div className={s.btn_text}>
                    Поиск
                    <Image src={search} alt=''/>
                </div>
            </button>
            {isOpen &&
                <div className={s.modal} onClick={() => setIsOpen(false)}>
                    <div className={s.search_block} onClick={(e) => e.stopPropagation()}>
                        <Container>
                            <div className={s.close_block}>
                                <Image src={close}
                                       alt=''
                                       onClick={() => setIsOpen(false)}
                                       className={s.icon}
                                />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className={s.main_block}>
                                    <SearchInput w100={true}
                                                 value={value}
                                                 onChange={e => {
                                                     fetchSuggs(e.target.value)
                                                 }}
                                                 onSubmit={q}
                                                 ref={inputRef}
                                                 clearFunc={clearInput}
                                                 autoFocus={true}
                                    />
                                    <div className={s.sug_block}>
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
                            </div>
                        </Container>
                    </div>
                </div>
            }
        </>
    );
};

export default ElasticSearchModal;