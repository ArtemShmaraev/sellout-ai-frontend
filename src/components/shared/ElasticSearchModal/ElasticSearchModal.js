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
import most_pop from "@/components/pages/oneProduct/TreeLines/most_pop.json";
import {desktopStore} from "@/store/DesktopStore";

const ElasticSearchModal = () => {
    const {filterStore, userStore} = useContext(Context)
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
        setIsOpen(true)
        desktopStore.setNavbarVisible(false)
    }

    const closeModal = () => {
        setIsOpen(false)
        desktopStore.setNavbarVisible(true)
    }

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
        closeModal()
    }
    const [suggs, setSuggs] = useState([])

    const sugBlockRef = useRef(null);

    // Функция для скролла наверх окна поиска
    const scrollToTop = () => {
        if (sugBlockRef.current) {
            sugBlockRef.current.scrollTo({
                top: 0,
                behavior: 'smooth', // Для плавного скролла
            });
        }
    };

    const fetchSuggs = (str) => {
        setValue(str)
        scrollToTop()
        // if (str) {
        //     suggestSearch(str).then(res => setSuggs(res))
        // } else {
        //     setSuggs([])
        // }
    }
    const selectedGender = Cookies.get('selected_gender')

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

                const searchObjectsPopM = shuffle([
                    {
                        "name": "Supreme",
                        "type": "Популярное",
                        "url": "line=supreme"
                    },
                    {
                        "name": "Stüssy",
                        "type": "Популярное",
                        "url": "line=stüssy"
                    },
                    {
                        "name": "Fear of God",
                        "type": "Популярное",
                        "url": "line=fear_of_god"
                    },
                    {
                        "name": "Cactus Jack by Travis Scott",
                        "type": "Популярное",
                        "url": "line=cactus_jack_by_travis_scott"
                    },
                    {
                        "name": "Off-White",
                        "type": "Популярное",
                        "url": "line=off-white"
                    },
                    {
                        "name": "Maison Margiela",
                        "type": "Популярное",
                        "url": "line=masion_margiela"
                    },
                    {
                        "name": "The North Face",
                        "type": "Популярное",
                        "url": "line=the_north_face"
                    },
                    {
                        "name": "Polo Ralph Lauren",
                        "type": "Популярное",
                        "url": "line=polo_ralph_lauren"
                    },
                    {
                        "name": "Cav Empt",
                        "type": "Популярное",
                        "url": "line=cav_empt"
                    },
                    {
                        "name": "Stone Island",
                        "type": "Популярное",
                        "url": "line=stone_island"
                    },
                    {
                        "name": "Air Jordan 1",
                        "type": "Популярное",
                        "url": "line=air_jordan_1"
                    },
                    {
                        "name": "Air Jordan 3",
                        "type": "Популярное",
                        "url": "line=air_jordan_3"
                    },
                    {
                        "name": "Air Jordan 4",
                        "type": "Популярное",
                        "url": "line=air_jordan_4"
                    },
                    {
                        "name": "Nike Dunk",
                        "type": "Популярное",
                        "url": "line=nike_dunk"
                    },
                    {
                        "name": "Nike Air Force 1",
                        "type": "Популярное",
                        "url": "line=nike_air_force_1"
                    },
                    {
                        "name": "Nike Air Max 1",
                        "type": "Популярное",
                        "url": "line=nike_air_max_1"
                    },
                    {
                        "name": "Nike Air Max 90",
                        "type": "Популярное",
                        "url": "line=nike_air_max_90"
                    },
                    {
                        "name": "Nike Blazer",
                        "type": "Популярное",
                        "url": "line=nike_blazer"
                    },
                    {
                        "name": "Nike Zoom",
                        "type": "Популярное",
                        "url": "line=nike_zoom"
                    },
                    {
                        "name": "Nike Cortez",
                        "type": "Популярное",
                        "url": "line=nike_cortez"
                    },
                    {
                        "name": "adidas Yeezy 350",
                        "type": "Популярное",
                        "url": "line=adidas_yeezy_350"
                    },
                    {
                        "name": "adidas Yeezy 500",
                        "type": "Популярное",
                        "url": "line=adidas_yeezy_500"
                    },
                    {
                        "name": "adidas Yeezy 700",
                        "type": "Популярное",
                        "url": "line=adidas_yeezy_700"
                    },
                    {
                        "name": "Кроссовки Vans",
                        "type": "Популярное",
                        "url": "line=vans&category=sneakers"
                    },
                    {
                        "name": "Кроссовки Asics",
                        "type": "Популярное",
                        "url": "line=asics&category=sneakers"
                    },
                    {
                        "name": "Кроссовки New Balance",
                        "type": "Популярное",
                        "url": "line=new_balance&category=sneakers"
                    },
                    {
                        "name": "Кроссовки On",
                        "type": "Популярное",
                        "url": "line=on&category=sneakers"
                    },
                    {
                        "name": "Кроссовки Li-Ning",
                        "type": "Популярное",
                        "url": "line=li-ning&category=sneakers"
                    },
                    {
                        "name": "Футболки",
                        "type": "Популярное",
                        "url": "category=tshirts"
                    },
                    {
                        "name": "Худи и толстовки",
                        "type": "Популярное",
                        "url": "category=hoodie_sweatshirts"
                    },
                    {
                        "name": "Треники",
                        "type": "Популярное",
                        "url": "category=sweatpants"
                    },
                    {
                        "name": "Шорты",
                        "type": "Популярное",
                        "url": "category=shorts"
                    },
                    {
                        "name": "Свитеры",
                        "type": "Популярное",
                        "url": "category=knitwear"
                    },
                    {
                        "name": "Ботинки",
                        "type": "Популярное",
                        "url": "category=boots"
                    },
                    {
                        "name": "Зимние кроссовки",
                        "type": "Популярное",
                        "url": "category=winter_sneakers"
                    },
                    {
                        "name": "Верхняя одежда",
                        "type": "Популярное",
                        "url": "category=outerwear"
                    },
                    {
                        "name": "Сумки",
                        "type": "Популярное",
                        "url": "category=bags"
                    },
                    {
                        "name": "Баскетбольные кроссовки",
                        "type": "Популярное",
                        "url": "category=basketball_sneakers"
                    },
                    {
                        "name": "Шапки",
                        "type": "Популярное",
                        "url": "category=hats"
                    },
                    {
                        "name": "Шарфы",
                        "type": "Популярное",
                        "url": "category=scarfs"
                    },
                    {
                        "name": "Кепки",
                        "type": "Популярное",
                        "url": "category=caps"
                    },
                    {
                        "name": "Часы",
                        "type": "Популярное",
                        "url": "category=watches"
                    },
                    {
                        "name": "Браслеты",
                        "type": "Популярное",
                        "url": "category=bracelets"
                    },
                    {
                        "name": "Цепочки",
                        "type": "Популярное",
                        "url": "category=necklaces"
                    },
                    {
                        "name": "Nike x Off-White",
                        "type": "Популярное",
                        "url": "collab=nike_x_off-white"
                    },
                    {
                        "name": "Nike x Travis Scott",
                        "type": "Популярное",
                        "url": "collab=nike_x_travis_scott"
                    },
                    {
                        "name": "Nike x Union",
                        "type": "Популярное",
                        "url": "collab=nike_x_union"
                    },
                    {
                        "name": "Nike x Supreme",
                        "type": "Популярное",
                        "url": "collab=nike_x_supreme"
                    },
                    {
                        "name": "Nike x Sacai",
                        "type": "Популярное",
                        "url": "collab=nike_x_sacai"
                    },
                    {
                        "name": "Nike x Clot",
                        "type": "Популярное",
                        "url": "collab=nike_x_clot"
                    },
                    {
                        "name": "Nike x Stüssy",
                        "type": "Популярное",
                        "url": "collab=nike_x_stüssy"
                    },
                    {
                        "name": "Nike x A Ma Maniére",
                        "type": "Популярное",
                        "url": "collab=nike_x_a_ma_maniére"
                    }
                ])
                const searchObjectsPopF = shuffle([
                    {
                        "name": "MIU MIU",
                        "type": "Популярное",
                        "url": "line=miu_miu"
                    },
                    {
                        "name": "Jacquemus",
                        "type": "Популярное",
                        "url": "line=jacquemus"
                    },
                    {
                        "name": "Skims",
                        "type": "Популярное",
                        "url": "line=skims"
                    },
                    {
                        "name": "Saint Laurent",
                        "type": "Популярное",
                        "url": "line=saint_laurent"
                    },
                    {
                        "name": "Loewe",
                        "type": "Популярное",
                        "url": "line=loewe"
                    },
                    {
                        "name": "Marc Jacobs",
                        "type": "Популярное",
                        "url": "line=marc_jacobs"
                    },
                    {
                        "name": "Diesel",
                        "type": "Популярное",
                        "url": "line=diesel"
                    },
                    {
                        "name": "Prada",
                        "type": "Популярное",
                        "url": "line=prada"
                    },
                    {
                        "name": "Bottega Veneta",
                        "type": "Популярное",
                        "url": "line=bottega_veneta"
                    },
                    {
                        "name": "Acne Studios",
                        "type": "Популярное",
                        "url": "line=acne_studios"
                    },
                    {
                        "name": "Dior",
                        "type": "Популярное",
                        "url": "line=dior"
                    },
                    {
                        "name": "Jil Sander",
                        "type": "Популярное",
                        "url": "line=jil_sander"
                    },
                    {
                        "name": "Balenciaga",
                        "type": "Популярное",
                        "url": "line=balenciaga"
                    },
                    {
                        "name": "Stüssy",
                        "type": "Популярное",
                        "url": "line=stüssy"
                    },
                    {
                        "name": "Fear of God",
                        "type": "Популярное",
                        "url": "line=fear_of_god"
                    },
                    {
                        "name": "Maison Margiela",
                        "type": "Популярное",
                        "url": "line=masion_margiela"
                    },
                    {
                        "name": "Polo Ralph Lauren",
                        "type": "Популярное",
                        "url": "line=polo_ralph_lauren"
                    },
                    {
                        "name": "adidas Samba",
                        "type": "Популярное",
                        "url": "line=adidas_samba"
                    },
                    {
                        "name": "adidas Gazelle",
                        "type": "Популярное",
                        "url": "line=adidas_gazelle"
                    },
                    {
                        "name": "adidas Campus",
                        "type": "Популярное",
                        "url": "line=adidas_campus"
                    },
                    {
                        "name": "adidas Spezial",
                        "type": "Популярное",
                        "url": "line=adidas_spezial"
                    },
                    {
                        "name": "adidas Forum",
                        "type": "Популярное",
                        "url": "line=adidas_campus"
                    },
                    {
                        "name": "adidas SL",
                        "type": "Популярное",
                        "url": "line=adidas_sl"
                    },
                    {
                        "name": "Air Jordan 1 Low",
                        "type": "Популярное",
                        "url": "line=air_jordan_1_low"
                    },
                    {
                        "name": "Air Jordan 1 Mid",
                        "type": "Популярное",
                        "url": "line=air_jordan_1_mid"
                    },
                    {
                        "name": "Air Jordan 4",
                        "type": "Популярное",
                        "url": "line=air_jordan_4"
                    },
                    {
                        "name": "Air Jordan 1 High",
                        "type": "Популярное",
                        "url": "line=air_jordan_1_high"
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
                        "name": "Nike Air Force 1",
                        "type": "Популярное",
                        "url": "line=nike_air_force_1"
                    },
                    {
                        "name": "Nike Air Max 1",
                        "type": "Популярное",
                        "url": "line=nike_air_max_1"
                    },
                    {
                        "name": "Nike Air Max 90",
                        "type": "Популярное",
                        "url": "line=nike_air_max_90"
                    },
                    {
                        "name": "Nike Blazer",
                        "type": "Популярное",
                        "url": "line=nike_blazer"
                    },
                    {
                        "name": "Nike Zoom",
                        "type": "Популярное",
                        "url": "line=nike_zoom"
                    },
                    {
                        "name": "Nike Cortez",
                        "type": "Популярное",
                        "url": "line=nike_cortez"
                    },
                    {
                        "name": "adidas Yeezy 350",
                        "type": "Популярное",
                        "url": "line=adidas_yeezy_350"
                    },
                    {
                        "name": "New Balance 9060",
                        "type": "Популярное",
                        "url": "line=new_balance_9060"
                    },
                    {
                        "name": "New Balance 1906R",
                        "type": "Популярное",
                        "url": "line=new_balance_1906R"
                    },
                    {
                        "name": "New Balance 2002R",
                        "type": "Популярное",
                        "url": "line=new_balance_2002r"
                    },
                    {
                        "name": "Nike x Travis Scott",
                        "type": "Популярное",
                        "url": "collab=nike_x_travis_scott"
                    },
                    {
                        "name": "Кроссовки Asics",
                        "type": "Популярное",
                        "url": "line=asics&category=sneakers"
                    },
                    {
                        "name": "Кроссовки Onitsuka Tiger",
                        "type": "Популярное",
                        "url": "line=onitsuka_tiger&category=sneakers"
                    },
                    {
                        "name": "Кроссовки On",
                        "type": "Популярное",
                        "url": "line=on&category=sneakers"
                    },
                    {
                        "name": "Сумки",
                        "type": "Популярное",
                        "url": "category=bags"
                    },
                    {
                        "name": "Сумки тоут",
                        "type": "Популярное",
                        "url": "category=tote_bags"
                    },
                    {
                        "name": "Футболки",
                        "type": "Популярное",
                        "url": "category=tshirts"
                    },
                    {
                        "name": "Худи и толстовки",
                        "type": "Популярное",
                        "url": "category=hoodie_sweatshirts"
                    },
                    {
                        "name": "Треники",
                        "type": "Популярное",
                        "url": "category=sweatpants"
                    },
                    {
                        "name": "Шорты",
                        "type": "Популярное",
                        "url": "category=shorts"
                    },
                    {
                        "name": "Топы",
                        "type": "Популярное",
                        "url": "category=tops"
                    },
                    {
                        "name": "Юбки",
                        "type": "Популярное",
                        "url": "category=skirts"
                    },
                    {
                        "name": "Свитеры",
                        "type": "Популярное",
                        "url": "category=knitwear"
                    },
                    {
                        "name": "Ботинки",
                        "type": "Популярное",
                        "url": "category=boots"
                    },
                    {
                        "name": "Зимние кроссовки",
                        "type": "Популярное",
                        "url": "category=winter_sneakers"
                    },
                    {
                        "name": "Верхняя одежда",
                        "type": "Популярное",
                        "url": "category=outerwear"
                    },
                    {
                        "name": "Шапки",
                        "type": "Популярное",
                        "url": "category=hats"
                    },
                    {
                        "name": "Шарфы",
                        "type": "Популярное",
                        "url": "category=scarfs"
                    },
                    {
                        "name": "Кепки",
                        "type": "Популярное",
                        "url": "category=caps"
                    },
                    {
                        "name": "Часы",
                        "type": "Популярное",
                        "url": "category=watches"
                    },
                    {
                        "name": "Браслеты",
                        "type": "Популярное",
                        "url": "category=bracelets"
                    },
                    {
                        "name": "Цепочки",
                        "type": "Популярное",
                        "url": "category=necklaces"
                    },
                    {
                        "name": "Кольца",
                        "type": "Популярное",
                        "url": "category=rings"
                    },
                    {
                        "name": "Лоферы",
                        "type": "Популярное",
                        "url": "category=loafers"
                    },
                    {
                        "name": "Туфли",
                        "type": "Популярное",
                        "url": "category=shoes"
                    },
                    {
                        "name": "Шлёпки и тапки",
                        "type": "Популярное",
                        "url": "category=slippers"
                    }
                ])
                const searchObjectsPopU = shuffle([
                    {
                        "name": "Air Jordan 3",
                        "type": "Популярное",
                        "url": "line=air_jordan_3"
                    },
                    {
                        "name": "Cav Empt",
                        "type": "Популярное",
                        "url": "line=cav_empt"
                    },
                    {
                        "name": "Stone Island",
                        "type": "Популярное",
                        "url": "line=stone_island"
                    },
                    {
                        "name": "Cactus Jack by Travis Scott",
                        "type": "Популярное",
                        "url": "line=cactus_jack_by_travis_scott"
                    },
                    {
                        "name": "Off-White",
                        "type": "Популярное",
                        "url": "line=off-white"
                    },
                    {
                        "name": "Stüssy",
                        "type": "Популярное",
                        "url": "line=stüssy"
                    },
                    {
                        "name": "Supreme",
                        "type": "Популярное",
                        "url": "line=supreme"
                    },
                    {
                        "name": "adidas Yeezy 500",
                        "type": "Популярное",
                        "url": "line=adidas_yeezy_500"
                    },
                    {
                        "name": "adidas Yeezy 700",
                        "type": "Популярное",
                        "url": "line=adidas_yeezy_700"
                    },
                    {
                        "name": "Кроссовки Vans",
                        "type": "Популярное",
                        "url": "line=vans&category=sneakers"
                    },
                    {
                        "name": "Кроссовки New Balance",
                        "type": "Популярное",
                        "url": "line=new_balance&category=sneakers"
                    },
                    {
                        "name": "Кроссовки Li-Ning",
                        "type": "Популярное",
                        "url": "line=li-ning&category=sneakers"
                    },
                    {
                        "name": "Баскетбольные кроссовки",
                        "type": "Популярное",
                        "url": "category=basketball_sneakers"
                    },
                    {
                        "name": "MIU MIU",
                        "type": "Популярное",
                        "url": "line=miu_miu"
                    },
                    {
                        "name": "Nike x Off-White",
                        "type": "Популярное",
                        "url": "collab=nike_x_off-white"
                    },
                    {
                        "name": "Nike x Union",
                        "type": "Популярное",
                        "url": "collab=nike_x_union"
                    },
                    {
                        "name": "Nike x Supreme",
                        "type": "Популярное",
                        "url": "collab=nike_x_supreme"
                    },
                    {
                        "name": "Nike x Sacai",
                        "type": "Популярное",
                        "url": "collab=nike_x_sacai"
                    },
                    {
                        "name": "Nike x Clot",
                        "type": "Популярное",
                        "url": "collab=nike_x_clot"
                    },
                    {
                        "name": "Nike x Stüssy",
                        "type": "Популярное",
                        "url": "collab=nike_x_stüssy"
                    },
                    {
                        "name": "Nike x A Ma Maniére",
                        "type": "Популярное",
                        "url": "collab=nike_x_a_ma_maniére"
                    },
                    {
                        "name": "Jacquemus",
                        "type": "Популярное",
                        "url": "line=jacquemus"
                    },
                    {
                        "name": "Skims",
                        "type": "Популярное",
                        "url": "line=skims"
                    },
                    {
                        "name": "Saint Laurent",
                        "type": "Популярное",
                        "url": "line=saint_laurent"
                    },
                    {
                        "name": "Loewe",
                        "type": "Популярное",
                        "url": "line=loewe"
                    },
                    {
                        "name": "Marc Jacobs",
                        "type": "Популярное",
                        "url": "line=marc_jacobs"
                    },
                    {
                        "name": "Diesel",
                        "type": "Популярное",
                        "url": "line=diesel"
                    },
                    {
                        "name": "Prada",
                        "type": "Популярное",
                        "url": "line=prada"
                    },
                    {
                        "name": "Bottega Veneta",
                        "type": "Популярное",
                        "url": "line=bottega_veneta"
                    },
                    {
                        "name": "Acne Studios",
                        "type": "Популярное",
                        "url": "line=acne_studios"
                    },
                    {
                        "name": "Dior",
                        "type": "Популярное",
                        "url": "line=dior"
                    },
                    {
                        "name": "Jil Sander",
                        "type": "Популярное",
                        "url": "line=jil_sander"
                    },
                    {
                        "name": "Balenciaga",
                        "type": "Популярное",
                        "url": "line=balenciaga"
                    },
                    {
                        "name": "Stüssy",
                        "type": "Популярное",
                        "url": "line=stüssy"
                    },
                    {
                        "name": "Fear of God",
                        "type": "Популярное",
                        "url": "line=fear_of_god"
                    },
                    {
                        "name": "Maison Margiela",
                        "type": "Популярное",
                        "url": "line=masion_margiela"
                    },
                    {
                        "name": "Polo Ralph Lauren",
                        "type": "Популярное",
                        "url": "line=polo_ralph_lauren"
                    },
                    {
                        "name": "adidas Samba",
                        "type": "Популярное",
                        "url": "line=adidas_samba"
                    },
                    {
                        "name": "adidas Gazelle",
                        "type": "Популярное",
                        "url": "line=adidas_gazelle"
                    },
                    {
                        "name": "adidas Campus",
                        "type": "Популярное",
                        "url": "line=adidas_campus"
                    },
                    {
                        "name": "adidas Spezial",
                        "type": "Популярное",
                        "url": "line=adidas_spezial"
                    },
                    {
                        "name": "adidas Forum",
                        "type": "Популярное",
                        "url": "line=adidas_campus"
                    },
                    {
                        "name": "adidas SL",
                        "type": "Популярное",
                        "url": "line=adidas_sl"
                    },
                    {
                        "name": "Air Jordan 1 Low",
                        "type": "Популярное",
                        "url": "line=air_jordan_1_low"
                    },
                    {
                        "name": "Air Jordan 1 Mid",
                        "type": "Популярное",
                        "url": "line=air_jordan_1_mid"
                    },
                    {
                        "name": "Air Jordan 4",
                        "type": "Популярное",
                        "url": "line=air_jordan_4"
                    },
                    {
                        "name": "Air Jordan 1 High",
                        "type": "Популярное",
                        "url": "line=air_jordan_1_high"
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
                        "name": "Nike Air Force 1",
                        "type": "Популярное",
                        "url": "line=nike_air_force_1"
                    },
                    {
                        "name": "Nike Air Max 1",
                        "type": "Популярное",
                        "url": "line=nike_air_max_1"
                    },
                    {
                        "name": "Nike Air Max 90",
                        "type": "Популярное",
                        "url": "line=nike_air_max_90"
                    },
                    {
                        "name": "Nike Blazer",
                        "type": "Популярное",
                        "url": "line=nike_blazer"
                    },
                    {
                        "name": "Nike Zoom",
                        "type": "Популярное",
                        "url": "line=nike_zoom"
                    },
                    {
                        "name": "Nike Cortez",
                        "type": "Популярное",
                        "url": "line=nike_cortez"
                    },
                    {
                        "name": "adidas Yeezy 350",
                        "type": "Популярное",
                        "url": "line=adidas_yeezy_350"
                    },
                    {
                        "name": "New Balance 9060",
                        "type": "Популярное",
                        "url": "line=new_balance_9060"
                    },
                    {
                        "name": "New Balance 1906R",
                        "type": "Популярное",
                        "url": "line=new_balance_1906R"
                    },
                    {
                        "name": "New Balance 2002R",
                        "type": "Популярное",
                        "url": "line=new_balance_2002r"
                    },
                    {
                        "name": "Nike x Travis Scott",
                        "type": "Популярное",
                        "url": "collab=nike_x_travis_scott"
                    },
                    {
                        "name": "Кроссовки Asics",
                        "type": "Популярное",
                        "url": "line=asics&category=sneakers"
                    },
                    {
                        "name": "Кроссовки Onitsuka Tiger",
                        "type": "Популярное",
                        "url": "line=onitsuka_tiger&category=sneakers"
                    },
                    {
                        "name": "Кроссовки On",
                        "type": "Популярное",
                        "url": "line=on&category=sneakers"
                    },
                    {
                        "name": "Сумки",
                        "type": "Популярное",
                        "url": "category=bags"
                    },
                    {
                        "name": "Сумки тоут",
                        "type": "Популярное",
                        "url": "category=tote_bags"
                    },
                    {
                        "name": "Футболки",
                        "type": "Популярное",
                        "url": "category=tshirts"
                    },
                    {
                        "name": "Худи и толстовки",
                        "type": "Популярное",
                        "url": "category=hoodie_sweatshirts"
                    },
                    {
                        "name": "Треники",
                        "type": "Популярное",
                        "url": "category=sweatpants"
                    },
                    {
                        "name": "Шорты",
                        "type": "Популярное",
                        "url": "category=shorts"
                    },
                    {
                        "name": "Топы",
                        "type": "Популярное",
                        "url": "category=tops"
                    },
                    {
                        "name": "Юбки",
                        "type": "Популярное",
                        "url": "category=skirts"
                    },
                    {
                        "name": "Свитеры",
                        "type": "Популярное",
                        "url": "category=knitwear"
                    },
                    {
                        "name": "Ботинки",
                        "type": "Популярное",
                        "url": "category=boots"
                    },
                    {
                        "name": "Зимние кроссовки",
                        "type": "Популярное",
                        "url": "category=winter_sneakers"
                    },
                    {
                        "name": "Верхняя одежда",
                        "type": "Популярное",
                        "url": "category=outerwear"
                    },
                    {
                        "name": "Шапки",
                        "type": "Популярное",
                        "url": "category=hats"
                    },
                    {
                        "name": "Шарфы",
                        "type": "Популярное",
                        "url": "category=scarfs"
                    },
                    {
                        "name": "Кепки",
                        "type": "Популярное",
                        "url": "category=caps"
                    },
                    {
                        "name": "Часы",
                        "type": "Популярное",
                        "url": "category=watches"
                    },
                    {
                        "name": "Браслеты",
                        "type": "Популярное",
                        "url": "category=bracelets"
                    },
                    {
                        "name": "Цепочки",
                        "type": "Популярное",
                        "url": "category=necklaces"
                    },
                    {
                        "name": "Кольца",
                        "type": "Популярное",
                        "url": "category=rings"
                    },
                    {
                        "name": "Лоферы",
                        "type": "Популярное",
                        "url": "category=loafers"
                    },
                    {
                        "name": "Туфли",
                        "type": "Популярное",
                        "url": "category=shoes"
                    },
                    {
                        "name": "Шлёпки и тапки",
                        "type": "Популярное",
                        "url": "category=slippers"
                    }
                ])
                const combinedList = searchObjects.concat(selectedGender === "M" ? searchObjectsPopM : selectedGender === "F" ? searchObjectsPopF : searchObjectsPopU); // Объединение двух списков

                // const trimmedList = combinedList.slice(0, 9);
                setSuggs(combinedList)
            }
        }, 250)
        return () => clearTimeout(timeout)

    }, [value]);
    const clearInput = () => {
        setValue('')
        scrollToTop()
    }
    const clickOnSugg = () => {
        closeModal()
    }
    useEffect(() => {
        function close(e) {
            if (e.key === 'Escape') {
                closeModal()
            }
        }

        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])

    const brandsDisplay = (product) => {
        if (product.collab) {
            return product.collab.name
        } else {
            return product.brands[0].name
        }
    }
    let searchText = `2'000'000+\xa0\xa0товаров`
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    // console.log(suggs)
    return (
        <>
            <button
                onClick={openModal}
                className={s.toggle_btn}
            >
                <div className={s.btn_text}>
                    <Image src={search} alt=''/>
                    {searchText}
                </div>
            </button>
            {isOpen &&
                <div className={s.modal} onClick={closeModal}>
                    <div className={s.search_block} onClick={(e) => e.stopPropagation()}>
                        <div className={s.searchContentBlock}>
                            <div className={s.close_block}>
                                <Image src={close}
                                       alt=''
                                       onClick={closeModal}
                                       className={s.icon}
                                />
                            </div>
                            <div className={`d-flex justify-content-center ${s.main_block}`}>
                                <div className={s.contentBlock}>
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
                                    <div className={s.sug_block} ref={sugBlockRef}>
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
                                                                minWidth: "97px",
                                                                justifyContent: "center",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                marginRight: '20px'
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
                                                                        minWidth: "97px",
                                                                        justifyContent: "center",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        marginRight: '20px'
                                                                    }}>
                                                                        <img src={most_pop[el.name.toLowerCase()].photo}
                                                                             alt={el.name}/>
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
                                                            <div className={s.brand}>
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
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ElasticSearchModal;