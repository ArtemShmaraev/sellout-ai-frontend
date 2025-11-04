import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
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
import {fetchMainPage, fetchNavbarPhoto} from "@/http/mainPageApi";
import Link from "next/link";
import SalesLine from "@/components/shared/NavbarC/SalesLine/SalesLine";
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import cn from 'classnames';
import Cookies from "js-cookie";


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
    // const [isDesktop, setIsDesktop] = useState(true)

    // const checkIsDesktop = () => {
    //     const width = window.innerWidth
    //     if (width <= 1200) {
    //         setIsDesktop(false)
    //     } else {
    //         setIsDesktop(true)
    //     }
    // }
    // useLayoutEffect(() => {
    //     window.addEventListener("resize", checkIsDesktop);
    //     // Call handler right away so state gets updated with initial window size
    //     checkIsDesktop();
    //     // Remove event listener on cleanup
    //     return () => window.removeEventListener("resize", checkIsDesktop);
    // })
    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }

    const [visible, setVisible] = useState(true)
    const [prevScrollPos, setPrevScrollPos] = useState(0)

    const checkScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const scrolledMoreThan100Pixels = (currentScrollPos - prevScrollPos > 120) || (currentScrollPos - prevScrollPos <= 0);
        let visible = prevScrollPos > currentScrollPos;

        if (currentScrollPos <= 0) {
            visible = true;
        }

        if (scrolledMoreThan100Pixels) {
            setPrevScrollPos(currentScrollPos);
            desktopStore.setNavbarVisible(visible);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [prevScrollPos]);

    const selectedGender = Cookies.get('selected_gender')

    const handleGenderSelection = async (gender) => {
        // Сохраняем выбранный гендер в куках
        Cookies.set('selected_gender', gender, {expires: 2772});

        // window.location.reload();

        // // Отправляем запрос на сервер с выбранным гендером
        // const page = Cookies.get('index_page');
        // const token = Cookies.get('access_token');
        // const newData = await fetchMainPage(token, false, !page, page || 1, gender);
        //
        // // Обновляем состояние компонента новыми данными
        // setContent(newData);
        //
        // // Закрываем модальное окно
        // setShowGenderModal(false);
    };
    return (

        <header className={cn(s.header, { [s.visible]: desktopStore.navbarVisible })} id={'navbar'}>
            <SalesLine/>
            <div className={'custom_cont'}>
                <div className={s.row1}>
                    <div className={s.block}>
                        <div className={'desktop_d'}>
                            <Link href="/women" className={selectedGender === 'F' ? s.selectedGender : s.genderButton} onClick={() => {
                                handleGenderSelection('F');

                            }}>Женское</Link>

                            <Link href="/men" className={selectedGender === 'M' ? s.selectedGender : s.genderButton} onClick={() => {
                                handleGenderSelection('M');

                            }}>Мужское</Link>

                            <Link href="/about" className={s.links}>О нас</Link>
                            {/*<Link href="https://t.me/selloutsu" className={s.links}>Блог</Link>*/}
                            {/*<span className={s.links}*/}
                            {/*      onClick={toggleContact}*/}
                            {/*>Связаться с нами</span>*/}
                        </div>
                        <div className={'mobile_d align-items-center'}>
                            <Sidebar photos={photos}/>
                            <SearchModal/>
                        </div>
                    </div>
                    <div className={s.logo_block} style={{justifyContent: 'center'}}>

                        <Link href={selectedGender === 'M' ? '/men' : selectedGender === 'F' ? '/women' : '/'}>

                            <Image className={s.logo} alt='' src={logo}/>

                        </Link>
                    </div>
                    <div className={s.block} style={{justifyContent: 'flex-end'}}>
                        <Link href={'/wishlist'}>
                            <Image width={25} src={like} alt="" className={s.icons}/>
                        </Link>
                        {desktopStore.isDesktop &&
                        userStore.isLogged
                            ?
                            <Link href={'/account'} className={s.auth_block}>
                                <Image width={25} src={person} alt="" className={s.icons}/>
                                <div className={s.name}>{userStore.firstName}</div>
                            </Link>
                            :
                            desktopStore.isDesktop &&
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
                            query: {new: 'true'}
                        }}
                              className={s.links}>Новинки</Link>
                        <Link href={{
                            pathname: '/products',
                            query: {recommendations: 'true'}
                        }}
                              className={s.links}>Рекомендации</Link>
                        <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Бренды'} link={{
                            pathname: '/brands',
                        }} photos={photos} type={'brands'}/>
                        <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Обувь'} link={{
                            pathname: '/products',
                            query: {category: 'shoes_category'}
                        }} photos={photos} type={'shoes'}/>
                        <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Одежда'} link={{
                            pathname: '/products',
                            query: {category: 'clothes'}
                        }} photos={photos} type={'clothes'}/>
                        <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Сумки'} link={{
                            pathname: '/products',
                            query: {category: 'bags'}
                        }} type={'bags'} photos={photos}/>
                        <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Аксессуары'} link={{
                            pathname: '/products',
                            query: {category: 'accessories'}
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
                            pathname: '/products'
                        }}
                              className={s.links}

                        >
                            Все товары
                        </Link>
                        <Link href={{
                            pathname: '/products',
                            query: {is_sale: 'is_sale'}
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