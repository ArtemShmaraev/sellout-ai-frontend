import React, {useContext, useEffect, useState} from 'react';
import s from './NavbarNoGender.module.css'
import like from '@/static/icons/heart.svg'
import person from '@/static/icons/person-circle.svg'
import cart from '@/static/icons/bag.svg'
import truck from '@/static/icons/truck.svg'
import Megamenu from "../UI/Megamenu/Megamenu";
import Sidebar from "../Sidebar/Sidebar";
import SearchModal from "../SearchModal/SearchModal";
import AuthModal from "..//AuthModal/AuthModal";
import Image from "next/image";
import logo from '@/static/img/sellout_logo.svg';
import logo2 from '/src/static/img/sellout_logo 2colors.svg';
import logo3 from '/src/static/img/sellout_logo 2colors2.svg';
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
import {log} from "next/dist/server/typescript/utils";


const NavbarNoGender = () => {
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

    const queryGender = userStore.gender ? {gender: userStore.gender[0].toUpperCase()} : {}
    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }

    // const [visible, setVisible] = useState(true);
    // const [prevScrollPos, setPrevScrollPos] = useState(0);
    //
    // const checkScroll = () => {
    //     const currentScrollPos = window.pageYOffset;
    //     const scrolledMoreThan100Pixels = (currentScrollPos - prevScrollPos > 200) || (currentScrollPos - prevScrollPos <= 0);
    //     let visible = prevScrollPos > currentScrollPos;
    //
    //     if (currentScrollPos <= 0) {
    //         visible = true;
    //     }
    //
    //     if (scrolledMoreThan100Pixels) {
    //         setPrevScrollPos(currentScrollPos);
    //         desktopStore.setNavbarVisible(visible);
    //     }
    // };
    //
    // useEffect(() => {
    //     window.addEventListener('scroll', checkScroll);
    //     return () => window.removeEventListener('scroll', checkScroll);
    // }, [prevScrollPos]);
    return (
        <header className={s.navbar}>
            <div className={`${s.container} custom_cont`}>
                <div>
                    <div className={s.links}>
                        <Link href="/about" className={s.leftLinks}>
                            Мужское
                        </Link>
                        <Link href="/about" className={s.leftLinks}>
                            Женское
                        </Link>
                    </div>
                </div>
                <div className={`${s.logo}`}>
                    <Link href="/">
                        <Image src={logo3} alt="Logo" width={350} height={50}/>
                    </Link>
                </div>
                <div>
                    <div className={s.links}>
                        <Link href="/about" className={s.rightLinks}>
                            О нас
                        </Link>
                        <span className={s.rightLinks} onClick={toggleContact}>Связаться с нами</span>
                    </div>
                </div>
                <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
            </div>
        </header>);
};

export default observer(NavbarNoGender);