import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import s from './AccountLayout.module.css'
import {Context} from "@/context/AppWrapper";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import person from '@/static/icons/person.svg'
import geo from '@/static/icons/geo-alt.svg'
import Image from "next/image";
import {observer} from "mobx-react-lite";
import AccountNavbar from "@/components/pages/account/AccountNavbar/AccountNavbar";

const AccountLayout = ({children}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const logout = (e) => {
        e.preventDefault()
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        userStore.setIsLogged(false)
        router.push('/')
    }
    const makeBold = (currPage) => {
        const {pathname} = router
        const arr = pathname.split('/')
        if (arr[arr.length-1] === currPage) {
            return s.bold
        }
    }

    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        }
    }, [])
    return (
        <Container className={s.cont}>
            <div className={s.header}>
                <h3 style={{marginBottom: '0px'}}>{`${userStore.firstName} ${userStore.lastName}`}</h3>
                <a href="/" className={s.link} onClick={(e) => logout(e)}>Выйти</a>
            </div>
            <hr style={{marginTop: '5px'}} className={s.hr}/>
            <div className={s.main_block}>
                {isDesktop
                    ?
                    <div className={s.nav_block}>
                        <a href="/account" className={s.nav_link}
                           onClick={(e) => {
                               e.preventDefault()
                               router.push('/account')
                           }}
                        >
                            <div className={makeBold('account')}>Личные данные</div>
                            <Image src={person} alt='' className={s.icon} width={20}/>
                        </a>
                        <a href="/account/addresses" className={s.nav_link}
                           onClick={(e) => {
                               e.preventDefault()
                               router.push('/account/addresses')
                           }}
                        >
                            <div className={makeBold('addresses')}>Адреса</div>
                            <Image src={geo} alt='' className={s.icon} width={20}/>
                        </a>
                        <a href="" className={s.nav_link}
                           onClick={(e) => {
                               e.preventDefault()
                               router.push('/account/orders')
                           }}>
                            <div className={makeBold('orders')}>Заказы</div>
                            <Image src={person} alt='' className={s.icon} width={20}/>
                        </a>
                        <a href="" className={s.nav_link}
                           onClick={(e) => {
                               e.preventDefault()
                               router.push('/account/addresses')
                           }}>
                            <div>Личные данные</div>
                            <Image src={person} alt='' className={s.icon} width={20}/>
                        </a>
                    </div>
                    :
                    <>
                        <AccountNavbar/>
                        <hr className={s.hr}/>
                    </>
                }
                <div className={s.children_block}>
                    {children}
                </div>
            </div>
        </Container>
    );
};

export default observer(AccountLayout);