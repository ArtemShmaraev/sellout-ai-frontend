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
import SalesLine from "@/components/shared/NavbarC/SalesLine/SalesLine";
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import cn from 'classnames';


const NavbarC = () => {
    const {userStore, desktopStore} = useContext(Context)
    const router = useRouter()
    const header = headerJson
    const [photos, setPhotos] = useState({
        brand: "",
        shoes: "",
        clothes: "",
        accessories: "",
        bags: ""
    })
    useEffect(() => {
        fetchNavbarPhoto().then(res => setPhotos(res))
    }, [])
    const [isDesktop, setIsDesktop] = useState(true)
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
    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }

    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const checkScroll = () => {
        const currentScrollPos = window.pageYOffset;
        let visible = prevScrollPos > currentScrollPos;

        if (currentScrollPos <= 0) {
            visible = true
        }
        setPrevScrollPos(currentScrollPos);
        desktopStore.setNavbarVisible(visible)
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [prevScrollPos]);
    return (
        <header className={cn(s.header, { [s.visible]: desktopStore.navbarVisible })} id={'navbar'}>
            <SalesLine/>
            <div className={'custom_cont'}>
                <div className={s.row1}>
                    <div className={s.block}>
                        <div className={'desktop_d'}>
                            <Link href="/about" className={s.links}>О нас</Link>
                            <Link href="https://t.me/selloutsu" className={s.links}>Блог</Link>
                            <span className={s.links}
                                  onClick={toggleContact}
                            >Связаться с нами</span>
                        </div>
                        <div className={'mobile_d align-items-center'}>
                            <Sidebar photos={photos}/>
                            <SearchModal/>
                        </div>
                    </div>
                    <div className={s.logo_block} style={{justifyContent: 'center'}}>
                        <Link href={'/'}>
                            <Image className={s.logo} alt='' src={logo}/>
                            {/*<h1 className={s.fraer}>Фраер ебучий долбаеб любитель черных хуев</h1>*/}
                        </Link>
                    </div>
                    <div className={s.block} style={{justifyContent: 'flex-end'}}>
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
                        <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Бренды'} link={{
                            pathname: '/brands',
                        }} photos={photos} type={'brands'}/>
                        <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Обувь'} link={{
                            pathname: '/products',
                            query: {category: 'shoes_category', ...queryGender}
                        }} photos={photos} type={'shoes'}/>
                        <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Одежда'} link={{
                            pathname: '/products',
                            query: {category: 'clothes', ...queryGender}
                        }} photos={photos} type={'clothes'}/>
                        <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Сумки'} link={{
                            pathname: '/products',
                            query: {category: 'bags', ...queryGender}
                        }} type={'bags'} photos={photos}/>
                        <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Аксессуары'} link={{
                            pathname: '/products',
                            query: {category: 'accessories', ...queryGender}
                        }} type={'accessories'} photos={photos}/>
                        {/*<Link href="/products?is_fast_ship=is_fast_ship" className={s.links}*/}
                        {/*   onClick={e => {*/}
                        {/*       e.preventDefault()*/}
                        {/*       goToFastShip()*/}
                        {/*   }}*/}
                        {/*>*/}
                        {/*    Мгновенная доставка*/}
                        {/*    <Image src={truck} alt="" className={s.truck}/>*/}
                        {/*</Link>*/}
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
                        <Link href={{
                            pathname: '/products',
                            query: {...queryGender, is_sale: 'is_sale'}
                        }}
                              className={s.sale_link}

                        >
                            Скидки
                        </Link>
                    </div>
                    <div>
                        <ElasticSearchModal/>
                        <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default observer(NavbarC);