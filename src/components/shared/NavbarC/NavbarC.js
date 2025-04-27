import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
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
import picture from "@/static/img/shoe2.png";
import headerJson from './header.json'
import CartIcon from "@/components/shared/CartIcon/CartIcon";
import {fetchNavbarPhoto} from "@/http/mainPageApi";

const NavbarC = () => {
    const {userStore, desktopStore} = useContext(Context)
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
    const goToMainPage = () => {
        router.push('/')
    }
    const goToWishlist = () => {
        router.push('/wishlist')
    }
    const goToFastShip = () => {
        const query = {}
        query.is_fast_ship = 'is_fast_ship'
        if (userStore.isLogged) {
            query.gender = userStore.gender[0].toUpperCase
        }
        router.push(
            {
                pathname: '/products',
                query: query
            }
        )
    }
    const goToSale = () => {
        const query = {}
        query.is_sale = 'is_sale'
        if (userStore.isLogged) {
            query.gender = userStore.gender[0].toUpperCase
        }
        router.push(
            {
                pathname: '/products',
                query: query
            }
        )
    }
    const goToAccount = () => {
        router.push('/account')
    }
    const goToCart = () => {
        router.push('/cart')
    }
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
                        onClick={(e) => {
                            e.preventDefault()
                            router.push(`/products?${genderQuery}${query}=${rowObj.query_name}&${constantQuery}`)
                        }}
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
    const queryGender = userStore.gender ? '?gender=' + userStore.gender[0].toUpperCase() + '&' : ''
    return (
        <header className={s.header}>
            <div className={'custom_cont'}>
                <div className={s.row1}>
                    <div className={s.block1}>
                        <div className={'desktop_d'}>
                            <p href="" className={s.links}>О нас</p>
                            <p href="" className={s.links}>Блог</p>
                            <p href="" className={s.links}>Связаться с нами</p>
                        </div>
                        <div className={'mobile_d'}>
                            <Sidebar/>
                            <SearchModal/>
                        </div>
                    </div>
                    <div className={s.block}>
                        <Image className={s.logo} alt='' src={logo} height={isDesktop ? 40 : 25} onClick={goToMainPage}/>
                    </div>
                    <div className={s.block}>
                        <Image width={25} src={like} alt="" className={s.icons} onClick={goToWishlist}/>
                        {isDesktop &&
                        userStore.isLogged
                            ?
                            <div onClick={goToAccount} className={s.auth_block}>
                                <Image width={25} src={person} alt="" className={s.icons}/>
                                <div className={s.name}>{userStore.firstName}</div>
                            </div>
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
                        <p href="" className={s.links}>Новинки</p>
                        <p href="" className={s.links}>Рекомендации</p>
                        <Megamenu className={s.links} label={'Бренды'} link={'/brands'}>
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
                                            />
                                        </div>
                                        <div className={s.link_block}>
                                            <a className={s.img_link}
                                               onClick={(e) => {
                                                   e.preventDefault()
                                                   router.push('/brands')
                                               }}
                                            >
                                                Все бренды
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Megamenu>
                        <Megamenu className={s.links} label={'Обувь'} link={`/products?${queryGender}category=shoes_category`}>
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
                                            />
                                        </div>
                                        <div className={s.link_block}>
                                            <a className={s.img_link}
                                               onClick={(e) => {
                                                   e.preventDefault()
                                                   router.push(`/products?${queryGender}category=accessories`)
                                               }}
                                            >
                                                Вся обувь
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Megamenu>
                        <Megamenu className={s.links} label={'Одежда'} link={`/products?${queryGender}category=clothes`}>
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
                                            />
                                        </div>
                                        <div className={s.link_block}>
                                            <a className={s.img_link}
                                               href={`/products?${queryGender}category=clothes`}
                                               onClick={(e) => {
                                                   e.preventDefault()
                                                   router.push(`/products?${queryGender}category=clothes`)
                                               }}
                                            >
                                                Вся одежда
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Megamenu>
                        <Megamenu className={s.links} label={'Аксессуары'} link={`/products?${queryGender}category=accessories`}>
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
                                            />
                                        </div>
                                        <div className={s.link_block}>
                                            <a className={s.img_link}
                                               href={`/products?${queryGender}category=accessories`}
                                               onClick={(e) => {
                                                   e.preventDefault()
                                                   router.push(`/products?${queryGender}category=accessories`)
                                               }}
                                            >
                                                Все аксессуары
                                            </a>
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
                        <a href={`/products${queryGender}`} className={s.links}
                           onClick={e => {
                               e.preventDefault()
                               router.push(`/products${queryGender}`)
                           }}
                        >
                            Все товары
                        </a>
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