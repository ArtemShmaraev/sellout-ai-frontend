import React, {useContext, useEffect, useRef, useState} from 'react';
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
import most_pop from "@/components/pages/oneProduct/TreeLines/most_pop.json";
import styles from "@/styles/MobileMenuMen.module.css";
import searchLogo from "@/static/icons/searchMob.svg";

const SearchModal = ({setIsOpenInSideBar, sideBarRef, handleCloseSideBar}) => {
    const {filterStore, userStore} = useContext(Context)
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
        searches = [...new Set(searches)].slice(0, 5); // Удалить дубликаты и оставить только последние 7 поисков

        const updated_search = searches.join("(|)"); // Объединить список в строку
        Cookies.set('last_search', updated_search, {expires: 2772}); // Установить новое значение куки

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
        handleCloseSideBar()
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
                    searches = last_search.split("(|)").slice(-5); // Получить последние 7 поисков
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

                // const trimmedList = combinedList.slice(0, 9);
                setSuggs(combinedList)
            }
        }, 250)
        return () => clearTimeout(timeout)

    }, [value]);
    const clearInput = () => {
        setValue('')
    }
    const clickOnSugg = () => {
        setIsOpen(false)
        handleCloseSideBar()
    }
    const toggleModal = () => {
        if (!isOpen) {
            document.body.classList.add('body-scroll-clip')
        } else {
            document.body.classList.remove('body-scroll-clip')
        }
        setIsOpen(!isOpen)
    }

    const brandsDisplay = (product) => {
        if (product.collab) {
            return product.collab.name
        } else {
            return product.brands[0].name
        }
    }

    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef(null); // Реф для управления фокусом на инпуте

    const handleInputClick = () => {
        setIsActive(true); // Активируем поле при нажатии
        setIsOpen(true)
        setIsOpenInSideBar(true)
        sideBarRef.current.scrollTo(0, 0)
    };

    const handleSearchClose = () => {
        setIsActive(false);
        setValue(''); // Очищаем текст и возвращаемся в исходное состояние
        setIsOpen(false)
        setIsOpenInSideBar(false)
        sideBarRef.current.scrollTo(0, 0)
    };

    const handleBlur = () => {
        // Если пользователь перестал фокусироваться на input, возвращаем состояние в неактивное
        // if (!value) {
        //     setIsActive(false);
        //     // if (!isOpen) {
        //     //     document.body.classList.add('body-scroll-clip')
        //     // } else {
        //     //     document.body.classList.remove('body-scroll-clip')
        //     // }
        //     setIsOpen(false)
        //     setIsOpenInSideBar(false)
        // }
    };

    const handleClear = () => {
        setValue(''); // Очищаем поле поиска
        if (inputRef.current) {
            inputRef.current.focus(); // Возвращаем фокус на инпут, чтобы клавиатура не закрывалась
        }
    };

    return (
        <>
            <div className={styles.searchBlock}>
                <div className={isActive ? `${styles.searchBar} ${styles.active}` : styles.searchBar}>
                    <form className={styles.inputContainer}
                          onSubmit={(e) => {
                              e.preventDefault(); // Отключаем стандартное поведение перезагрузки страницы
                              q(); // Вызываем вашу функцию
                          }}>
                        <Image
                            src={searchLogo} // Путь к изображению лупы
                            alt="Search Icon"
                            width={20}
                            height={20}
                            className={styles.searchIcon}
                            loading={"eager"}
                        />
                        <input
                            type="text"
                            placeholder="Поиск среди 2'000'000+ товаров"
                            value={value}
                            onClick={handleInputClick}
                            onBlur={handleBlur}
                            onChange={(e) => fetchSuggs(e.target.value)}
                            className={styles.searchInput}
                            ref={inputRef} // Привязываем реф к инпуту
                        />
                        {isActive && value && (
                            <div className={styles.clearButton} onClick={handleClear}>
                                ✕
                            </div>
                        )}
                    </form>
                </div>
                {isActive && (
                    <div className={styles.closeButton2} onClick={handleSearchClose}>
                        Закрыть
                    </div>
                )}
            </div>

            {isOpen &&
                <div className={s.search_modal}>
                    {/*<div className={s.close}*/}
                    {/*>*/}
                    {/*    <Image src={close} alt="" onClick={toggleModal}/>*/}
                    {/*</div>*/}
                    {/*<SearchInput w100={true}*/}
                    {/*             value={value}*/}
                    {/*             onChange={e => {*/}
                    {/*                 fetchSuggs(e.target.value)*/}
                    {/*             }}*/}
                    {/*             onSubmit={q}*/}
                    {/*             clearFunc={clearInput}*/}
                    {/*             autoFocus={true}*/}
                    {/*/>*/}
                    <div className={s.sug_block_mob}>
                        {
                            suggs.map((el, index) => (
                                el.type === "product" ? (
                                    <Link
                                        key={index} // Добавление ключа
                                        className={s.sugg_product}
                                        href={'/products/' + el.slug}
                                        onClick={clickOnSugg}
                                    >
                                        <div className={s.sugg_product_div}>

                                            <div style={{
                                                minWidth: "98px",
                                                justifyContent: "center",
                                                display: "flex",
                                                alignItems: "center",
                                                marginRight: '10px',
                                                marginLeft: '10px'
                                            }}>
                                                <img src={el.bucket_link[0].url} alt={el.model}/>
                                            </div>
                                            <div className="details">
                                                <div style={{display: "flex", alignItems: 'center'}}>
                                                                <span
                                                                    className={s.brand}>{brandsDisplay(el)} {el.model}
                                                                </span>
                                                    {(el.price.start_price > el.price.final_price) && el.price.final_price > 0 &&
                                                        <span className={s.sale}>
                                                                        -{Math.ceil(100 - (el.price.final_price / el.price.start_price) * 100)}%
                                                                    </span>}
                                                </div>
                                                <div className={s.color}>
                                                    {el.colorway}
                                                </div>
                                                {el.price.final_price < el.price.start_price
                                                    ?
                                                    (<div className={s.price_sale}>

                                                        от {addSpacesToNumber(el.price.final_price)} ₽
                                                    </div>)
                                                    :
                                                    (<div className={s.price_default}>
                                                        от {addSpacesToNumber(el.price.final_price)} ₽
                                                    </div>)
                                                }

                                            </div>

                                        </div>
                                        <div className={s.type}>
                                            Товар
                                        </div>
                                    </Link>
                                ) : (
                                    most_pop[el.name.toLowerCase()] ? (
                                        <Link
                                            key={index} // Добавление ключа
                                            className={s.sugg_product}
                                            href={'/products?' + el.url}
                                            onClick={clickOnSugg}
                                        >
                                            <div className={s.sugg_product_div}>

                                                {most_pop[el.name.toLowerCase()] && most_pop[el.name.toLowerCase()].photo && (
                                                    <div style={{
                                                        minWidth: "98px",
                                                        justifyContent: "center",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginRight: '10px',
                                                        marginLeft: '10px'
                                                    }}>
                                                        <img src={most_pop[el.name.toLowerCase()].photo} alt={el.name}/>
                                                    </div>

                                                )}
                                                <div className="details">
                                                    <div className={s.brand}>
                                                        {el.name}
                                                    </div>
                                                    {most_pop[el.name.toLowerCase()] && most_pop[el.name.toLowerCase()].photo && (
                                                        <div className={s.color}>
                                                            {most_pop[el.name.toLowerCase()].count}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={s.type}>
                                                {el.type}
                                            </div>
                                        </Link>
                                    ) : (
                                        <Link
                                            key={index} // Добавление ключа
                                            className={s.sugg}
                                            href={'/products?' + el.url}
                                            onClick={clickOnSugg}
                                        >
                                            <div className={s.brand2}>
                                                {el.name}
                                            </div>
                                            <div className={s.type}>
                                                {el.type}
                                            </div>
                                        </Link>
                                    )
                                )
                            ))
                        }

                        {value &&
                            <div className={s.more} onClick={q}>
                                Посмотреть все {value}
                            </div>
                        }

                    </div>
                </div>
            }
        </>
    );
};

export default SearchModal;