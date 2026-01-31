import React, {useContext, useEffect, useState} from 'react';
import s from './SearchModal.module.css'
import search from '@/static/icons/search.svg'
import close from '@/static/icons/x-lg.svg'
import SearchInput from "../UI/SearchInput/SearchInput";
import Image from "next/image";
import {useRouter} from "next/router";
import {addFilterSearch, suggestSearch} from "@/http/productsApi";
import {Context} from "@/context/AppWrapper";
import Link from "next/link";
import Cookies from "js-cookie";

const SearchModal = () => {
    const {filterStore, userStore} = useContext(Context)
    // console.log(userStore)
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('')
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
        document.body.classList.remove('body-scroll-clip')
    }
    const [suggs, setSuggs] = useState([])
    const fetchSuggs = (str) => {
        setValue(str)
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

                function shuffle(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                    return array;
                }

                const searchObjectsPop = shuffle([
                    {
                        "name": "adidas Samba",
                        "type": "Популярное",
                        "url": "line=adidas_samba"
                    },
                    {
                        "name": "Vans Knu",
                        "type": "Популярное",
                        "url": "line=vans_knu"
                    },
                    {
                        "name": "Nike Dunk",
                        "type": "Популярное",
                        "url": "line=nike_dunk"
                    },
                    {
                        "name": "New Balance 9060",
                        "type": "Популярное",
                        "url": "line=new_balance_9060"
                    },
                    {
                        "name": "Nike x Travis Scott",
                        "type": "Популярное",
                        "url": "collab=nike_x_travis_scott"
                    },
                    {
                        "name": "Jordan",
                        "type": "Популярное",
                        "url": "line=jordan"
                    },
                    {
                        "name": "Кроссовки Nike",
                        "type": "Популярное",
                        "url": "category=sneakers&line=nike"
                    }
                ])
                const combinedList = searchObjects.concat(searchObjectsPop); // Объединение двух списков

                const trimmedList = combinedList.slice(0, 9);
                setSuggs(trimmedList)
            }
        }, 250)
        return () => clearTimeout(timeout)

    }, [value]);
    const clearInput = () => {
        setValue('')
    }
    const clickOnSugg = () => {
        setIsOpen(false)
        document.body.classList.remove('body-scroll-clip')
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