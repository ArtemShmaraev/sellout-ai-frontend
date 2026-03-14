import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import s from './NavbarC.module.css'
import like from '@/static/icons/heart.svg'
import person from '@/static/icons/person-circle.svg'
import cart from '@/static/icons/bag.svg'
import truck from '@/static/icons/truck.svg'
import Megamenu from "../UI/Megamenu/Megamenu";
import Sidebar from "../Sidebar/Sidebar";
import SidebarNew from "../SidebarNew/Sidebar";
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

import cartNotSelected from "@/static/icons/CertMobileNavBarNotSelected.svg";
import accountNotSelected from "@/static/icons/AccountMobileNavBarNotSelected.svg";
import favouriteNotSelected from "@/static/icons/FavouriteMobileNavBarNotSelected.svg";
import homeNotSelected from "@/static/icons/HomeMobileNavBarNotSelected.svg";
import searchNotSelected from "@/static/icons/SearchMobileNavBarNotSelected.svg";

import cartSelected from "@/static/icons/CertMobileNavBarSelected.svg";
import accountSelected from "@/static/icons/AccountMobileNavBarSelected.svg";
import favouriteSelected from "@/static/icons/FavouriteMobileNavBarSelected.svg";
import homeSelected from "@/static/icons/HomeMobileNavBarSelected.svg";
import searchSelected from "@/static/icons/SearchMobileNavBarSelected.svg";
import ModalSocialNets from "@/components/shared/ModalSocialNets/ModalSocialNets";
import ModalRef from "@/components/shared/ModalRef/ModalRef";
import ModalGifts from "@/components/shared/ModalGifts/ModalGifts";

// import {selectedGender, setSelectedGender} from "@/layout/MainLayout";


const NavbarC = () => {
    const {userStore, desktopStore} = useContext(Context)
    const router = useRouter()
    const {pathname} = router;
    const header = headerJson
    const [selectedGender, setSelectedGender] = useState("any")
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
        if (desktopStore.isDesktop) {
            const currentScrollPos = window.pageYOffset;
            const scrolledMoreThan100Pixels = (currentScrollPos - prevScrollPos > 120) || (currentScrollPos - prevScrollPos <= 0);
            let visible = prevScrollPos > currentScrollPos;

            if (currentScrollPos <= 0) {
                visible = true;
            }

            if (scrolledMoreThan100Pixels || currentScrollPos <= 0) {
                setPrevScrollPos(currentScrollPos);
                desktopStore.setNavbarVisible(visible);
            }
        } else {
            const currentScrollPos = window.pageYOffset;
            const scrolledEnough = (prevScrollPos - currentScrollPos > 20) || (currentScrollPos - prevScrollPos > 10);
            let visible = prevScrollPos > currentScrollPos;

            if (currentScrollPos <= 0) {
                visible = true;
            }

            if (scrolledEnough || currentScrollPos <= 0) {
                desktopStore.setNavbarVisible(visible);
            }

            setPrevScrollPos(currentScrollPos);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        if (Cookies.get('selected_gender')) {
            setSelectedGender(Cookies.get('selected_gender'))
        }

        return () => window.removeEventListener('scroll', checkScroll);
    }, [prevScrollPos]);

    const isCatalog = pathname.startsWith('/products');
    const isCart = pathname.startsWith('/cart');
    const isHome = pathname === '/' || pathname.startsWith('/men') || pathname.startsWith('/women');
    const isWishlist = pathname.startsWith('/wishlist');
    const isAccount = pathname.startsWith('/account');

    const handleGenderSelection = async (gender) => {
        // Сохраняем выбранный гендер в куках
        Cookies.set('selected_gender', gender, {expires: 2772});
        setSelectedGender(gender)

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

    const handleNavigation = (path) => {
        router.push(path);
    };

    const handleNavigationCatalog = (path) => {
        let selected_gender = "M";
        selected_gender = Cookies.get('selected_gender');
        if (selected_gender) {
            if (selected_gender === "M") {
                router.push('/mobileMenuMen')
            } else {
                router.push('/mobileMenuWomen')
            }
        } else {
            router.push('/mobileMenuMen')
        }
        router.push(path);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [socialsOpen, setSocialsOpen] = useState(false);
    const toggleSocials = () => {
        setSocialsOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleSocialsClose = () => {
        setSocialsOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    const [refModalOpen, setRefModalOpen] = useState(false);

    const toggleRef = () => {
        setRefModalOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleRefModalOpen = () => {
        setRefModalOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    const [giftsModalOpen, setGiftsModalOpen] = useState(false);

    const toggleGifts = () => {
        setGiftsModalOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleGiftsModalClose = () => {
        setGiftsModalOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    return (
        <>
            <header className={
                desktopStore.isDesktop
                    ? cn(s.header, {[s.visible]: desktopStore.navbarVisible})
                    : cn(s.headerMob, {[s.visibleMob]: desktopStore.navbarVisible})
            } id={'navbar'}>
                {desktopStore.isDesktop &&
                    <>
                        <SalesLine toggleSocials={toggleSocials} toggleRef={toggleRef} toggleGifts={toggleGifts}/>
                        <div className={'custom_cont'}>
                            <div className={s.row1}>
                                <div className={s.block}>

                                    <div className={'desktop_d'}>
                                        <Link href="/women"
                                              className={selectedGender === 'F' ? s.selectedGender : s.genderButton}
                                              onClick={() => {
                                                  handleGenderSelection('F');

                                              }}>Женское</Link>

                                        <Link href="/men"
                                              className={selectedGender === 'M' ? s.selectedGender : s.genderButton}
                                              onClick={() => {
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

                                    <Link
                                        href={selectedGender === 'M' ? '/men' : selectedGender === 'F' ? '/women' : '/'}>
                                        <Image className={s.logo} alt='' src={logo} loading={"eager"}/>

                                    </Link>
                                </div>

                                <div className={s.block} style={{justifyContent: 'flex-end'}}>
                                    <div className={s.block} style={{justifyContent: 'flex-end'}}>
                                        {desktopStore.isDesktop ? (
                                            <>
                                                <Link href="/wishlist">
                                                    <Image width={25} src={like} alt="Wishlist" className={s.icons}
                                                           loading="eager"/>
                                                </Link>
                                                {userStore.isLogged ? (
                                                    <Link href="/account" className={s.auth_block}>
                                                        <Image width={25} src={person} alt="Account" className={s.icons}
                                                               loading="eager"/>
                                                        <div className={s.name}>{userStore.firstName}</div>
                                                    </Link>
                                                ) : (
                                                    <AuthModal>
                                                        <Image width={25} src={person} alt="Login" className={s.icons}
                                                               loading="eager"/>
                                                        <div className={s.name}>Войдите</div>
                                                    </AuthModal>
                                                )}
                                                <CartIcon/>
                                            </>
                                        ) : (
                                            <div className="mobile_d align-items-center">
                                                <Link href="/wishlist">
                                                    <Image width={25} src={like} alt="Wishlist" className={s.icons}
                                                           loading="eager"/>
                                                </Link>
                                                {/*{userStore.isLogged ? (*/}
                                                {/*    <Link href="/account" className={s.auth_block}>*/}
                                                {/*        <Image width={26} src={person} alt="Account" className={s.icons_profile} loading="eager" />*/}

                                                {/*    </Link>*/}
                                                {/*) : (*/}
                                                {/*    <AuthModal>*/}
                                                {/*        <Image width={26} src={person} alt="Login" className={s.icons_profile} loading="eager" />*/}

                                                {/*    </AuthModal>*/}
                                                {/*)}*/}
                                                <CartIcon/>

                                            </div>
                                        )}
                                    </div>


                                </div>
                            </div>
                            <div className={s.row2}>
                                <div className={s.block1}>
                                    <Link href={selectedGender !== "M" && selectedGender !== "F" ? {pathname: '/'} :
                                        {
                                            pathname: '/products',
                                            query: {new: 'true'}
                                        }}
                                          className={s.links}>Новинки</Link>
                                    <Link href={selectedGender !== "M" && selectedGender !== "F" ? {pathname: '/'} : {
                                        pathname: '/products',
                                        query: {recommendations: 'true'}
                                    }}
                                          className={s.links}>Рекомендации</Link>
                                    <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Бренды'}
                                              link={selectedGender !== "M" && selectedGender !== "F" ? {pathname: '/'} : {
                                                  pathname: '/brands',
                                              }} photos={photos} type={'brands'} selected_gender={selectedGender}/>
                                    <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Обувь'}
                                              link={selectedGender !== "M" && selectedGender !== "F" ? {pathname: '/'} : {
                                                  pathname: selectedGender === "M" ? '/catalog/shoes_desktop_men' : '/catalog/shoes_desktop_women'
                                              }} photos={photos} type={'shoes'} selected_gender={selectedGender}/>
                                    <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Одежда'}
                                              link={selectedGender !== "M" && selectedGender !== "F" ? {pathname: '/'} : {
                                                  pathname: selectedGender === "M" ? '/catalog/clothes_desktop_men' : '/catalog/clothes_desktop_women'
                                              }} photos={photos} type={'clothes'} selected_gender={selectedGender}/>
                                    <Megamenu visible={desktopStore.navbarVisible} className={s.links} label={'Сумки'}
                                              link={selectedGender !== "M" && selectedGender !== "F" ? {pathname: '/'} : {
                                                  pathname: selectedGender === "M" ? '/catalog/bags_desktop_men' : '/catalog/bags_desktop_women'
                                              }} type={'bags'} photos={photos} selected_gender={selectedGender}/>
                                    <Megamenu visible={desktopStore.navbarVisible} className={s.links}
                                              label={'Аксессуары'}
                                              link={selectedGender !== "M" && selectedGender !== "F" ? {pathname: '/'} : {
                                                  pathname: selectedGender === "M" ? '/catalog/accessories_desktop_men' : '/catalog/accessories_desktop_women'
                                              }} type={'accessories'} photos={photos} selected_gender={selectedGender}/>
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
                                    <Link href={selectedGender !== "M" && selectedGender !== "F" ? {pathname: '/'} : {
                                        pathname: '/products'
                                    }}
                                          className={s.links}

                                    >
                                        Все товары
                                    </Link>
                                    <Link href={selectedGender !== "M" && selectedGender !== "F" ? {pathname: '/'} : {
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
                    </>
                }

                {!desktopStore.isDesktop &&
                    <>
                        <SalesLine toggleSocials={toggleSocials} toggleRef={toggleRef} toggleGifts={toggleGifts}/>
                        <div className={s.bottom_nav}>
                            <div
                                className={s.nav_item}
                                onClick={() => {
                                    desktopStore.setMobileSideBar(!desktopStore.mobileSideBar)
                                }}
                            >
                                <div className={s.icon_wrapper}>
                                    <Image
                                        width={29}
                                        height={28}
                                        src={desktopStore.mobileSideBar ? searchSelected : searchNotSelected}
                                        alt="Search Icon"
                                        loading={"eager"}
                                    />
                                </div>
                            </div>
                            {/*<div*/}
                            {/*    className={s.nav_item}>*/}
                            {/*    <Sidebar photos={photos}/>*/}
                            {/*</div>*/}


                            <div
                                className={s.nav_item}
                                onClick={() => {
                                    handleNavigation('/cart')
                                    desktopStore.setMobileSideBar(false)
                                }}
                            >
                                <div className={s.icon_wrapper}>
                                    <Image
                                        width={28}
                                        height={26}
                                        src={isCart && !desktopStore.mobileSideBar ? cartSelected : cartNotSelected}
                                        alt="Cart Icon"
                                        loading={"eager"}
                                    />
                                </div>
                            </div>

                            <div
                                className={s.nav_item}
                                onClick={() => {
                                    handleNavigation(selectedGender === 'M' ? '/men' : selectedGender === 'F' ? '/women' : '/')
                                    desktopStore.setMobileSideBar(false)
                                }}
                            >
                                <div className={s.icon_wrapper}>
                                    <Image
                                        width={32}
                                        height={38}
                                        src={isHome && !desktopStore.mobileSideBar ? homeSelected : homeNotSelected}
                                        alt="Catalog Icon"
                                        loading={"eager"}
                                    />
                                </div>
                            </div>
                            <div
                                className={s.nav_item}
                                onClick={() => {
                                    handleNavigation('/wishlist')
                                    desktopStore.setMobileSideBar(false)
                                }}
                            >
                                <div className={s.icon_wrapper}>
                                    <Image
                                        width={27}
                                        height={25}
                                        src={isWishlist && !desktopStore.mobileSideBar ? favouriteSelected : favouriteNotSelected}
                                        alt="Favorites Icon"
                                        loading={"eager"}
                                    />
                                </div>
                            </div>

                            {userStore.isLogged ? (
                                <div
                                    className={s.nav_item}
                                    onClick={() => {
                                        handleNavigation('/account')
                                        desktopStore.setMobileSideBar(false)
                                    }}
                                >
                                    <div className={s.icon_wrapper}>
                                        <Image
                                            width={26}
                                            height={26}
                                            src={isAccount && !desktopStore.mobileSideBar ? accountSelected : accountNotSelected}
                                            alt="Profile Icon"
                                            loading={"eager"}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={s.nav_item}
                                >
                                    <AuthModal style={{display: 'flex', width: 'auto'}}>
                                        <Image
                                            width={26}
                                            height={26}
                                            src={isAccount && !desktopStore.mobileSideBar ? accountSelected : accountNotSelected}
                                            alt="Profile Icon"
                                        />
                                    </AuthModal>
                                </div>
                            )}
                        </div>
                    </>
                }
            </header>
            {desktopStore.mobileSideBar &&
                <SidebarNew
                    initialSection={desktopStore.currentSection}
                    initialOpenedSections={desktopStore.openedSections}
                    initialScrollPositions={desktopStore.scrollPositions}
                />
            }
            <ModalSocialNets show={socialsOpen} onClose={handleSocialsClose}/>
            <ModalRef show={refModalOpen} onClose={handleRefModalOpen}/>
            <ModalGifts show={giftsModalOpen} onClose={handleGiftsModalClose}/>
        </>


    );
};

export default observer(NavbarC);