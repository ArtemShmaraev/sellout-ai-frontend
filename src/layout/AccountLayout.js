import React, {useContext, useEffect, useState} from 'react';
import s from './AccountLayout.module.css'
import {Context} from "@/context/AppWrapper";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import person from '@/static/icons/person.svg'
import geo from '@/static/icons/geo-alt.svg'
import Image from "next/image";
import {observer} from "mobx-react-lite";
import AccountNavbar from "@/components/pages/account/AccountNavbar/AccountNavbar";
import Link from "next/link";
import orders from '@/static/icons/box-seam.svg'
import loyal from '@/static/icons/loyalty.svg'
import referral from '@/static/icons/referral.svg'
import heart from '@/static/icons/heart.svg'

const AccountLayout = ({children}) => {
    const {userStore, cartStore} = useContext(Context)
    const router = useRouter()
    const selectedGender = Cookies.get('selected_gender')

    const logout = (e) => {
        e.preventDefault()
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        Cookies.set('cart', '', {expires: 2772})
        Cookies.set('last_seen', '', {expires: 2772})
        Cookies.set('promo', '', {expires: 2772})
        userStore.setIsLogged(false)
        userStore.setGender('')
        cartStore.setCartCnt(0)
        router.push(selectedGender === 'M' ? '/men' : selectedGender === 'F' ? '/women' : '/')
    }
    const makeBold = (currPage) => {
        const {pathname} = router
        const arr = pathname.split('/')
        if (arr[arr.length-1] === currPage) {
            return s.bold
        }
    }

    const {desktopStore} = useContext(Context)
    return (
        <div className={s.cont + ' custom_cont'}>
            <div className={s.header}>
                <h3 style={{marginBottom: '0px'}}>{`${userStore.firstName} ${userStore.lastName}`}</h3>
                <a href="/" className={s.link} onClick={(e) => logout(e)}>Выйти</a>
            </div>
            <hr style={{marginTop: '5px'}} className={s.hr}/>
            <div className={s.main_block}>
                {desktopStore.isDesktop
                    ?
                    <div className={s.nav_block}>
                        <Link href="/account" className={s.nav_link}
                        >
                            <div className={makeBold('account')}>Личные данные</div>
                            <Image src={person} alt='' className={s.icon} width={20}/>
                        </Link>
                        <Link href="/account/addresses" className={s.nav_link}
                        >
                            <div className={makeBold('addresses')}>Адреса</div>
                            <Image src={geo} alt='' className={s.icon} width={20}/>
                        </Link>
                        <Link href="/account/orders" className={s.nav_link}
                        >
                            <div className={makeBold('orders')}>Заказы</div>
                            <Image src={orders} alt='' className={s.icon} width={20}/>
                        </Link>
                        <Link href="/account/favorite-brands" className={s.nav_link}
                        >
                            <div className={makeBold('favorite-brands')}>Любимые бренды</div>
                            <Image src={heart} alt='' className={s.icon} width={20}/>
                        </Link>
                        <Link href="/account/loyalty" className={s.nav_link}
                        >
                            <div className={makeBold('loyalty')}>Программа лояльности</div>
                            <Image src={loyal} alt='' className={s.icon} width={22}/>
                        </Link>
                        <Link href="/account/referral" className={s.nav_link}
                        >
                            <div className={makeBold('referral')}>Реферальная программа</div>
                            <Image src={referral} alt='' className={s.icon} width={25}/>
                        </Link>
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
        </div>
    );
};

export default observer(AccountLayout);