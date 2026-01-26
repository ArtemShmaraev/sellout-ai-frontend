import React, {useContext, useEffect, useRef, useState} from 'react';
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
import Cookies from "js-cookie";

const ElasticSearchModal = () => {
    const {filterStore, userStore} = useContext(Context)
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('')
    const inputRef = useRef(null)
    const q = async () => {

        const query = {}
        query.q = value

        const last_search = Cookies.get('last_search');
        let searches = [];
        if (last_search) {
            searches = last_search.split("(|)"); // Получить все сохраненные поиски
        }

        searches.unshift(value); // Добавить новый поиск в начало списка
        searches = [...new Set(searches)].slice(0, 7); // Удалить дубликаты и оставить только последние 7 поисков

        const updated_search = searches.join("(|)"); // Объединить список в строку
        Cookies.set('last_search', updated_search, { expires: 2772 }); // Установить новое значение куки


        const filters = await addFilterSearch(value)
        for (const key in filters) {
            if (filters[key]) {
                query[key] = filters[key]
            }
        }
        const selected_gender = Cookies.get('selected_gender')
        if (selected_gender) {
            query.gender = selected_gender.toUpperCase();
        }
        const pathname = '/products'
        router.push({pathname, query})
        filterStore.setQ(value)
        setIsOpen(false)
    }
    const [suggs, setSuggs] = useState([])
    const fetchSuggs = (str) => {
        setValue(str)
        // if (str) {
        //     suggestSearch(str).then(res => setSuggs(res))
        // } else {
        //     setSuggs([])
        // }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (value) {
                if (userStore.accessToken) {
                    suggestSearch(value, userStore.accessToken).then(res => setSuggs(res))
                } else {
                    suggestSearch(value).then(res => setSuggs(res))
                }
            } else {
                let searches = [];
                const last_search = Cookies.get('last_search');
                if (last_search) {
                    searches = last_search.split("(|)").slice(-7); // Получить последние 7 поисков
                    searches = Array.from(new Set(searches)); // Удалить дубликаты
                }
                const uniqueSearches = [...new Set(searches)]; // Удаление дубликатов
                const searchObjects = uniqueSearches.map(name => ({
                    name: name,
                    type: "История",
                    url: `q=${name}`
                }));
                setSuggs(searchObjects)
            }
        }, 250)
        return () => clearTimeout(timeout)

    }, [value]);
    const clearInput = () => {
        setValue('')
    }
    const clickOnSugg = () => {
        setIsOpen(false)
    }
    useEffect(()  => {
        function close(e) {
            if (e.key === 'Escape') {
                console.log(e.key)
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])
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