import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import s from './AccountLayout.module.css'
import {Context} from "@/context/AppWrapper";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

const AccountLayout = ({children}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const logout = () => {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        router.push('/')
    }
    return (
        <Container className={s.cont}>
            <div className={s.header}>
                <h3>{`${userStore.firstName} ${userStore.lastName}`}</h3>
                <a href="/" className={s.link} onClick={logout}>Выйти</a>
            </div>
            <hr/>
            <div className={s.main_block}>
                <div className={s.nav_block}>
                    <a href="" className={s.nav_link}>Личные данные</a>
                    <a href="" className={s.nav_link}>Адреса</a>
                    <a href="" className={s.nav_link}>Заказы</a>
                    <a href="" className={s.nav_link}>Статус</a>
                </div>
                <div className={s.children_block}>
                    {children}
                </div>
            </div>
        </Container>
    );
};

export default AccountLayout;