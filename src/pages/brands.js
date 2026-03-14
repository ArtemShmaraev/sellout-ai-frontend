import MainLayout from "@/layout/MainLayout";
import {fetchBrands, fetchFilter, searchBrands} from "@/http/productsApi";
import s from '@/styles/BrandsPage.module.css'
import like from '@/static/icons/heart.svg'
import Image from "next/image";
import SearchInput from "@/components/shared/UI/SearchInput/SearchInput";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import {observer} from "mobx-react-lite";
import Brand from "@/components/pages/brands/Brand";
import {parse} from "cookie";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    let brandsArr
    if (token) {
        brandsArr = await fetchBrands(token)
    } else {
        brandsArr = await fetchBrands()
    }
    return {props: {brandsArr}}
}
const Brands = ({brandsArr}) => {
    const [a, setA] = useState([])
    const {userStore, desktopStore} = useContext(Context)
    const [brands, setBrands] = useState(brandsArr)
    const alphabet = () => {
        const letters = ['0-9'];

        // Заполняем массив буквами A-Z
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            letters.push(letter);
        }
        return letters

    }
    const renderBrands = () => {
        let arr = []
        let currLetter = ''
        for (let i = 0; i < brands.length; i++) {
            if (currLetter.toUpperCase() !== brands[i].name[0].toUpperCase() && !/^\d$/.test(brands[i].name[0])) {
                currLetter = brands[i].name[0]
                arr.push(
                    <h4 key={brands[i].id}
                        id={brands[i].name[0]}
                        className={s.big_letter}
                    >
                        {brands[i].name[0].toUpperCase()}
                    </h4>
                )
            }
            if (currLetter !== '0-9' && /^\d$/.test(brands[i].name[0])) {
                currLetter = '0-9'
                arr.push(
                    <h4 key={brands[i].id}
                        id={'0-9'}
                        className={s.big_letter}
                    >
                        0-9
                    </h4>
                )
            }
            arr.push(
                <Brand name={brands[i].name}
                       brandId={brands[i].id}
                       query={brands[i].query_name}
                       inWL={brands[i].in_wishlist}
                />
            )
        }
        return arr
    }
    const scroll = (id) => {
        const el = document.getElementById(id)
        const scrollPosition = el.offsetTop
        const num = desktopStore.isDesktop ? 200 : 135
        window.scrollTo({
            top: scrollPosition - num,
            behavior: 'smooth',
        });
    }
    const [query, setQuery] = useState("");
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setSearchValue(query)
            search(query).then(res => setBrands(res))
        }, 200);
        return () => clearTimeout(timeOutId);
    }, [query]);
    const search = async (value) => {
        let token = Cookies.get('access_token')
        if (!token) {
            token = ''
        }
        let res
        res = await searchBrands(value, token)
        return res
    }
    useEffect(() => {
        let arr = []
        let currLetter = ''
        for (let i = 0; i < brands.length; i++) {
            if (currLetter !== brands[i].name[0].toUpperCase()) {
                currLetter = brands[i].name[0].toUpperCase()
                arr.push(currLetter)
            }
            if (currLetter !== '0-9' && /^\d$/.test(brands[i].name[0])) {
                arr.push('0-9')
            }
        }
        setA(arr)
    }, [brands])
    return (
        <MainLayout>
            <Head>
                <title>Бренды</title>
            </Head>
            <div className={s.cont + ' custom_cont'}>
                <div className={s.alphabet_block}
                     style={desktopStore.navbarVisible ? {} : {top: 0}}
                >
                    <div className={s.alphabet}>
                        {desktopStore.isDesktop
                            ?
                            alphabet().map(el =>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        scroll(el)
                                    }}
                                    className={s.letter}
                                    disabled={!a.includes(el)}
                                    key={el}
                                >{el}</button>
                            )
                            :
                            <div className={s.scrollable_block}>
                                <div className={s.scrollable_container}>
                                    {
                                        alphabet().map((el, ind) =>
                                            <button onClick={(e) => {
                                                e.preventDefault()
                                                scroll(el)
                                            }}
                                                    className={s.letter}
                                                    disabled={!a.includes(el)}
                                                    style={ind > 0 && ind < alphabet().length - 1
                                                        ? {margin: '0 12px'}
                                                        :
                                                        ind === 0 ? {marginRight: '12px'} : {marginLeft: '12px'}}
                                            >{el}</button>
                                        )
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={s.main_block}>
                    <div>
                        <div className={s.search_block}
                             style={desktopStore.navbarVisible ? {} : {top: 50}}
                        >
                            <SearchInput w100={true}
                                         value={query}
                                         onChange={e => setQuery(e.target.value)}
                                         placeholder="Поиск среди 1000 брендов"
                            />
                            {
                                userStore.isLogged
                                    ?
                                    <></>
                                    // <div className={s.text}>
                                    //     Нажми на <Image src={like} alt='' className={s.like}/>
                                    //     и добавьте бренд в <Link href="/account/favorite-brands"
                                    //                                  className={s.link}>избранное</Link>
                                    // </div>
                                    :
                                    <div className={s.text}>
                                        Войдите или зарегистрируйтесь, чтобы добавлять бренды в избранное
                                        <div className='d-flex justify-content-center w-100'>
                                            <AuthModal>
                                                <div className={s.auth_btn}>
                                                    Войти
                                                </div>
                                            </AuthModal>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className={s.brands_block}>
                        {renderBrands()}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default observer(Brands);