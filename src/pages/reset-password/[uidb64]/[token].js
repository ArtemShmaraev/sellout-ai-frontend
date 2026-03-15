import React, {useContext, useState} from 'react';
import {useRouter} from "next/router";
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/Token.module.css'
import PasswordInput from "@/components/shared/UI/PasswordInput/PasswordInput";
import {changePass} from "@/http/userApi";
import Cookies from "js-cookie";
import {updateCartFromCookies} from "@/http/cartApi";
import {Context} from "@/context/AppWrapper";

const Token = () => {
    const {cartStore, userStore} = useContext(Context)
    const router = useRouter()
    const [newPass1, setNewPass1] = useState('')
    const [newPass2, setNewPass2] = useState('')
    const [diff, setDiff] = useState(false)
    const [wrong, setWrong] = useState(false)

    const sendData = async (e) => {
        e.preventDefault()
        if (newPass1 !== newPass2) {
            setDiff(true)
            return null
        }
        setDiff(false)
        const {query} = router
        try {
            const res = await changePass(query.uidb64, query.token, newPass1)
            setWrong(false)
            const cookieCart = Cookies.get('cart')
            let cartFromBack
            if (cookieCart) {
                cartFromBack = await updateCartFromCookies(cookieCart, res.user_id, res.access)
            } else {
                cartFromBack = await updateCartFromCookies('', res.user_id, res.access)
            }
            cartStore.setCartCnt(cartFromBack.length)
            let newStr = ''
            cartFromBack.forEach(el => newStr += el + ' ')
            Cookies.set('cart', newStr, {expires: 2772})
            Cookies.set('access_token', res.access, {expires: 2772})
            Cookies.set('refresh_token', res.refresh, {expires: 2772})
            userStore.setIsLogged(true)
            userStore.setId(res.user_id)
            userStore.setUsername(res.username)
            userStore.setFirstName(res.first_name)
            userStore.setLastName(res.last_name)
            userStore.setAccessToken(res.access)
            userStore.setGender(res.gender)
            router.push('/')
        } catch (e) {
            setWrong(true)
        }
    }
    return (
        <MainLayout>
            <div className={`custom_cont ${s.cont}`}>
                <form onSubmit={(e) => sendData(e)} className={s.input_block}>
                    <h4 className={'text-center'}>Восстановление пароля</h4>
                    <label className={s.label}>Новый пароль:</label>
                    <PasswordInput
                        value={newPass1}
                        onChange={(e) => setNewPass1(e.target.value)}
                    />
                    <label className={s.label}>Подтвердите пароль:</label>
                    <PasswordInput
                        value={newPass2}
                        onChange={(e) => setNewPass2(e.target.value)}
                    />
                    <div className={'d-flex justify-content-center'}>
                        <button className={s.btn}
                                type={'submit'}
                        >Сохранить</button>
                    </div>
                    {
                        diff && <p className={'red_text text-center mt-2'}>Пароли не совпадают</p>
                    }
                    {
                        wrong && <p className={'red_text text-center mt-2'}>Что-то пошло не так</p>
                    }
                </form>
            </div>
        </MainLayout>
    );
};

export default Token;