import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import s from './AccountLayout.module.css'
import {Context} from "@/context/AppWrapper";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import person from '@/static/icons/person.svg'
import geo from '@/static/icons/geo-alt.svg'
import Image from "next/image";

const AccountLayout = ({children}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const logout = (e) => {
        e.preventDefault()
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        router.push('/')
    }
    const makeBold = (currPage) => {
        const {pathname} = router
        const arr = pathname.split('/')
        if (arr[arr.length-1] === currPage) {
            return s.bold
        }
    }
    return (
        <Container className={s.cont}>
            <div className={s.header}>
                <h3>{`${userStore.firstName} ${userStore.lastName}`}</h3>
                <a href="/" className={s.link} onClick={(e) => logout(e)}>Выйти</a>
            </div>
            <hr/>
            <div className={s.main_block}>
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
                           router.push('/account/addresses')
                       }}>
                        <div>Личные данные</div>
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
                <div className={s.children_block}>
                    {children}
                </div>
            </div>
        </Container>
    );
};

export default AccountLayout;