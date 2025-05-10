import React, {useContext, useEffect, useState} from 'react';
import s from './NavbarC.module.css'
import like from '@/static/icons/heart.svg'
import person from '@/static/icons/person-circle.svg'
import cart from '@/static/icons/bag.svg'
import truck from '@/static/icons/truck.svg'
import Megamenu from "../UI/Megamenu/Megamenu";
import Sidebar from "../Sidebar/Sidebar";
import SearchModal from "../SearchModal/SearchModal";
import AuthModal from "..//AuthModal/AuthModal";
import Image from "next/image";
import logo from '@/static/img/sellout_logo.svg'
import {useRouter} from "next/router";
import ElasticSearchModal from "@/components/shared/ElasticSearchModal/ElasticSearchModal";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import headerJson from './header.json'
import CartIcon from "@/components/shared/CartIcon/CartIcon";
import {fetchNavbarPhoto} from "@/http/mainPageApi";
import Link from "next/link";

const NavbarC = () => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const header = headerJson
    const [photos, setPhotos] = useState({
        brand: "",
        shoes: "",
        clothes: "",
        accessories: ""
    })
    useEffect(() => {
        fetchNavbarPhoto().then(res => setPhotos(res))
    }, [])
    const [isDesktop, setIsDesktop] = useState(null)
    const checkIsDesktop = () => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        } else {
            setIsDesktop(true)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", checkIsDesktop);
        // Call handler right away so state gets updated with initial window size
        checkIsDesktop();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", checkIsDesktop);
    })
    
    const renderMegamenu = (numInCol, colNum, basicObj, query, title, constantQuery = '') => {
        const cols = []
        let gender = 'any'
        let genderQuery = ''
        if (userStore.gender) {
            gender = userStore.gender
            genderQuery = `gender=${gender[0].toUpperCase()}&`
        }
        let obj = basicObj[gender]
        const keys = Object.keys(obj)
        for (let i = 0; i < colNum; i++) {
            let rows = []
            for (let j = 0; j < numInCol; j++) {
                const dataInd = i * numInCol + j
                const rowObj = obj[keys[dataInd]]
                rows.push(
                    <a
                        href={`/products?${genderQuery}${query}=${rowObj.query_name}${constantQuery}`}
                        className={s.megamenu_links}
                    >
                        {rowObj.name}</a>
                )
            }
            cols.push(
                <div style={{minWidth: `${100/colNum}%`}}>
                    {rows}
                </div>
            )
        }
        const result = (
            <div style={{minWidth: `${20*colNum}%`}} key={title}>
                <h4 className={s.h_text}>{title}</h4>
                <div className={s.cols_block}>
                    {cols}
                </div>
            </div>
        )
        return result
    }
    const queryGender = userStore.gender ? {gender: userStore.gender[0].toUpperCase()}  : {}
    return (
        <header className={s.header} id={'navbar'}>
            <div className={'custom_cont'}>
                <div className={s.row1}>
                    <div className={s.block1}>
                        <div className={'desktop_d'}>
                            <Link href="" className={s.links}>О нас</Link>
                            <Link href="" className={s.links}>Блог</Link>
                            <Link href="" className={s.links}>Связаться с нами</Link>
                        </div>
                        <div className={'mobile_d align-items-center'}>
                            <Sidebar photos={photos}/>
                            <SearchModal/>
                        </div>
                    </div>
                    <div className={s.block}>
                        <Link href={'/'}>
                            <Image className={s.logo} alt='' src={logo} height={isDesktop ? 40 : 25}/>
                        </Link>
                    </div>
                    <div className={s.block}>
                        <Link href={'/wishlist'}>
                            <Image width={25} src={like} alt="" className={s.icons}/>
                        </Link>
                        {isDesktop &&
                        userStore.isLogged
                            ?
                            <Link href={'/account'} className={s.auth_block}>
                                <Image width={25} src={person} alt="" className={s.icons}/>
                                <div className={s.name}>{userStore.firstName}</div>
                            </Link>
                            :
                            isDesktop &&
                            <AuthModal>
                                <Image width={25} src={person} alt="" className={s.icons}/>
                                <div className={s.name}>Войдите</div>
                            </AuthModal>
                        }
                        <CartIcon/>
                    </div>
                </div>
                <div className={s.row2}>
                    <div className={s.block1}>
                        <Link href={{
                            pathname: '/products',
                            query: {new: 'true', ...queryGender}
                        }}
                           className={s.links}>Новинки</Link>
                        <Link href={{
                            pathname: '/products',
                            query: {recommendations: 'true', ...queryGender}
                        }}
                           className={s.links}>Рекомендации</Link>
                        <Megamenu className={s.links} label={'Бренды'} link={{
                            pathname: '/brands',
                        }}>
                            <div className={s.megamenu_row}>
                                {
                                    renderMegamenu(15, 3,
                                        header['Популярные бренды'], 'line',
                                        'Популярные бренды'
                                    )
                                }
                                {
                                    renderMegamenu(15, 1,
                                        header['Коллаборации'], 'collab',
                                        'Коллаборации'
                                    )
                                }
                                <div className={s.img_col}>
                                    <div className={'w-100'}>
                                        <div className={s.img_cont}>
                                            <Image src={photos.brand}
                                                   alt=''
                                                   fill={true}
                                                   className={s.img}
                                                   loading={'eager'}
                                            />
                                        </div>
                                        <div className={s.link_block}>
                                            <Link className={s.img_link}
                                               href={{
                                                   pathname: '/brands',
                                               }}
                                            >
                                                Все бренды
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Megamenu>
                        <Megamenu className={s.links} label={'Обувь'} link={{
                            pathname: '/products',
                            query: {category: 'shoes_category', ...queryGender}
                        }}>
                            <div className={s.megamenu_row}>
                                {
                                    renderMegamenu(15, 2,
                                        header['Популярные линейки обуви'], 'line',
                                        'Популярные линейки'
                                    )
                                }
                                {
                                    renderMegamenu(13, 1,
                                        header['Популярные категории обуви'], 'category',
                                        'Категории'
                                    )
                                }
                                {
                                    renderMegamenu(15, 1,
                                        header['Популярные бренды обуви'], 'collab',
                                        'Популярные бренды', '&category=shoes_category'
                                    )
                                }
                                <div className={s.img_col}>
                                    <div className={'w-100'}>
                                        <div className={s.img_cont}>
                                            <Image src={photos.shoes}
                                                   alt=''
                                                   fill={true}
                                                   className={s.img}
                                                   loading={'eager'}
                                            />
                                        </div>
                                        <div className={s.link_block}>
                                            <Link className={s.img_link}
                                               href={{
                                                   pathname: '/products',
                                                   query: {category: 'shoes_category', ...queryGender}
                                               }}
                                            >
                                                Вся обувь
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Megamenu>
                        <Megamenu className={s.links} label={'Одежда'} link={{
                            pathname: '/products',
                            query: {category: 'clothes', ...queryGender}
                        }}>
                            <div className={s.megamenu_row}>
                                {
                                    renderMegamenu(15, 2,
                                        header['Популярные категории одежды'], 'category',
                                        'Категории'
                                    )
                                }
                                {
                                    renderMegamenu(15, 2,
                                        header['Популярные бренды одежды'], 'line',
                                        'Популярные бренды', '&category=clothes'
                                    )
                                }
                                <div className={s.img_col}>
                                    <div className={'w-100'}>
                                        <div className={s.img_cont}>
                                            <Image src={photos.clothes}
                                                   alt=''
                                                   fill={true}
                                                   className={s.img}
                                                   loading={'eager'}
                                            />
                                        </div>
                                        <div className={s.link_block}>
                                            <Link className={s.img_link}
                                               href={{
                                                   pathname: '/products',
                                                   query: {category: 'clothes', ...queryGender}
                                               }}
                                            >
                                                Вся одежда
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Megamenu>
                        <Megamenu className={s.links} label={'Аксессуары'} link={{
                            pathname: '/products',
                            query: {category: 'accessories', ...queryGender}
                        }}>
                            <div className={s.megamenu_row}>
                                {
                                    renderMegamenu(15, 2,
                                        header['Популярные бренды аксессуаров'], 'line',
                                        'Популярные бренды', '&category=accessories'
                                    )
                                }
                                <div className={s.img_col}>
                                    <div className={'w-100'}>
                                        <div className={s.img_cont}>
                                            <Image src={photos.accessories}
                                                   alt=''
                                                   fill={true}
                                                   className={s.img}
                                                   loading={'eager'}
                                            />
                                        </div>
                                        <div className={s.link_block}>
                                            <Link className={s.img_link}
                                               href={{
                                                   pathname: '/products',
                                                   query: {category: 'accessories', ...queryGender}
                                               }}
                                            >
                                                Все аксессуары
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Megamenu>
                        {/*<a href="/products?is_fast_ship=is_fast_ship" className={s.links}*/}
                        {/*   onClick={e => {*/}
                        {/*       e.preventDefault()*/}
                        {/*       goToFastShip()*/}
                        {/*   }}*/}
                        {/*>*/}
                        {/*    Мгновенная доставка*/}
                        {/*    <Image src={truck} alt="" className={s.truck}/>*/}
                        {/*</a>*/}
                        {/*<a href={`/products?${queryGender}is_sale=is_sale`} className={s.sale_link}*/}
                        {/*   onClick={e => {*/}
                        {/*       e.preventDefault()*/}
                        {/*       goToSale()*/}
                        {/*   }}*/}
                        {/*>Скидки</a>*/}
                        <Link href={{
                            pathname: '/products',
                            query: {...queryGender}
                        }}
                              className={s.links}

                        >
                            Все товары
                        </Link>
                    </div>
                    <div>
                        <ElasticSearchModal/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default observer(NavbarC);