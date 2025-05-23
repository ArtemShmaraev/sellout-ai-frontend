import React, {useContext, useState} from 'react';
import s from '@/styles/Order.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "@/context/AppWrapper";
import Stage1 from "@/components/pages/order/Stage1/Stage1";
import MainLayout from "@/layout/MainLayout";
import PromoInput from "@/components/pages/cart/PromoInput/PromoInput";
import Stage2 from "@/components/pages/order/Stage2/Stage2";
import {parse} from "cookie";
import jwtDecode from "jwt-decode";
import {fetchAddresses, fetchUserInfo} from "@/http/userApi";
import Cookies from "js-cookie";
import {fetchCart, promoAuth, promoUnauth} from "@/http/cartApi";
import {useRouter} from "next/router";
import Head from "next/head";
import AuthModal from "@/components/shared/AuthModal/AuthModal";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const {user_id} = jwtDecode(token)
    const addresses = await fetchAddresses(context.req.headers.cookie, user_id)
    const cart = await fetchCart(user_id, context.req.headers.cookie)
    const defaultPrice = cart.total_amount
    const finalPrice = cart.final_amount
    const sale = cart.total_sale
    const userData = await fetchUserInfo(context.req.headers.cookie, user_id)
    console.log(userData)
    return { props: {addresses, defaultPrice, finalPrice, sale, userData} }
}
const Order = ({addresses, defaultPrice, finalPrice, sale, userData}) => {
    const router = useRouter()
    const {orderStore, userStore} = useContext(Context)
    const [promo, setPromo] = useState('')
    const [bonuses, setBonuses] = useState('')
    const [defAmount, setDefAmount] = useState(defaultPrice)
    const [finAmount, setFinAmount] = useState(finalPrice)
    const [saleAmount, setSaleAmount] = useState(sale)
    const [promoRes, setPromoRes] = useState(null)
    const renderStage = () => {
        const stage = orderStore.stage
        if (stage === 1) {
            return <Stage1 addresses={addresses} userData={userData}/>
        }
        if (stage === 2) {
            return <Stage2/>
        }
    }
    const next = () => {
        orderStore.nextStage()
    }
    const sendPromo = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        let res
        if (userStore.isLogged) {
            res = await promoAuth(promo, userStore.id, token)
            router.push('/order', undefined, {scroll: false})
        } else {
            const cartArr = Cookies.get('cart').trim().split(' ').map(el => Number(el))
            res = await promoUnauth(promo, cartArr)
        }
        if (res.status) {
            setFinAmount(res.final_amount)
            setSaleAmount(res.total_sale)
        }
        setPromoRes(res)
    }
    return (
        <MainLayout>
            <Head>
                <title>Оформление заказа</title>
            </Head>
            <div className={s.cont + ' custom_cont'}>
                <div className={s.section}>
                    <div className={s.main_block}>
                        {renderStage()}
                    </div>
                    <div className={s.promos_block}>
                        <h4>Ваш заказ:</h4>
                        <p>Cтоимость: {defAmount} ₽</p>
                        <PromoInput placeholder={'Введите промокод'}
                                    onChange={(e) => setPromo(e.target.value)}
                                    value={promo}
                                    onClick={(e) => sendPromo(e)}
                        />
                        {
                            promoRes &&
                            <p className={promoRes.status ? s.green_text : s.red_text}>
                                {promoRes.message}
                            </p>
                        }
                        <PromoInput placeholder={'Списать бонусы'}
                                    onChange={(e) => setBonuses(e.target.value)}
                                    value={bonuses}
                        />
                        {
                            Number(saleAmount) > 0 && <p>Суммарная скидка: {saleAmount} ₽</p>
                        }
                        {
                            orderStore.deliveryPrice &&
                            (
                                orderStore.deliveryPrice.block && orderStore.method === 2
                                ?
                                    <p>Сумма доставки: {orderStore.deliveryPrice.sum_all} ₽</p>
                                    :
                                    <p>Сумма доставки: {orderStore.deliveryPrice.sum_part} ₽</p>
                            )
                        }
                        <hr/>
                        <p className={s.big_text}>Промежуточный итог: {finAmount} ₽</p>
                        <button className={s.order_btn}>Перейти к оформлению заказа</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default observer(Order);