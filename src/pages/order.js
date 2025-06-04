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
import {fetchCart, promoAuth, promoUnauth, useBonuses} from "@/http/cartApi";
import {useRouter} from "next/router";
import Head from "next/head";
import {checkoutOrder} from "@/http/orderApi";

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
    return { props: {addresses, defaultPrice, finalPrice, sale, userData} }
}
const Order = ({addresses, defaultPrice, finalPrice, sale, userData}) => {
    const router = useRouter()
    const {orderStore, userStore, cartStore} = useContext(Context)
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
    const changeBonuses = (value) => {
        const maxBonuses = userData.bonuses.total_amount
        if (Number(value) <= Number(maxBonuses)) {
            setBonuses(value)
        }
    }
    const sendPromo = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        let res
        if (userStore.isLogged) {
            res = await promoAuth(promo, userStore.id, token)
            console.log(res)
            setFinAmount(res.final_amount)
            setSaleAmount(res.total_sale)
            router.push('/order', undefined, {scroll: false})
        } else {
            const cartArr = Cookies.get('cart').trim().split(' ')
            res = await promoUnauth(promo, cartArr)
        }
        if (res.status) {
            setFinAmount(res.final_amount)
            setSaleAmount(res.total_sale)
        }
        setPromoRes(res)
    }
    const spendBonuses = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        const res = await useBonuses(bonuses, token)
        setFinAmount(res.final_amount)
        setSaleAmount(res.total_sale)
    }
    const calculateFinalPrice = () => {
        if (orderStore.deliveryPrice &&
            orderStore.deliveryPrice.block &&
            orderStore.method === 2) {
            return Number(finAmount) + Number(orderStore.deliveryPrice.sum_part)
        } else if (orderStore.deliveryPrice) {
            return Number(finAmount) + Number(orderStore.deliveryPrice.sum_all)
        } else {
            return finAmount
        }
    }

    const [fillAll, setFillAll] = useState(false)
    const checkout = async () => {
        const orderObj = {
            email: orderStore.email,
            phone: orderStore.phone,
            surname: orderStore.surname,
            name: orderStore.name,
            patronymic: orderStore.patronymic,
            comment: orderStore.comment
        }


        const validate = () => {
            if (!orderObj.name || !orderObj.surname || !orderObj.patronymic || !orderObj.email || !orderObj.surname) {
                setFillAll(true)
                return null
            }
            if (!orderStore.shipType) {
                setFillAll(true)
                return null
            }
            if (orderStore.shipType === 3 && !orderObj.address_id) {
                setFillAll(true)
                return null
            }
            //До двери
            if (orderStore.shipType === 1 && !orderObj.address_id) {
                setFillAll(true)
                return null
            }
            //Boxberry
            if (orderStore.shipType === 2 && !orderObj.target) {
                setFillAll(true)
                return null
            }
            if (orderStore.deliveryPrice && orderStore.deliveryPrice.block && !orderStore.method) {
                setFillAll(true)
                return null
            }
            setFillAll(false)
            return true
        }


        if (orderStore.shipType === 3) {
            orderObj.delivery_type = 0
            orderObj.address_id = orderStore.selectedAddressId
        }
        //До двери
        if (orderStore.shipType === 1) {
            orderObj.delivery_type = 2
            orderObj.address_id = orderStore.selectedAddressId
        }
        //Boxberry
        if (orderStore.shipType === 2) {
            orderObj.delivery_type = 1
            orderObj.target = orderStore.target
            orderObj.pvz_address = orderStore.pvzAddress
        }
        orderObj.consolidation = true
        if (orderStore.deliveryPrice && orderStore.deliveryPrice.block) {
            orderObj.consolidation = orderStore.method !== 2;
        }
        if (!validate()) {
            return null
        }

        const token = Cookies.get('access_token')
        const id = userStore.id
        const order = await checkoutOrder(orderObj, id, token)
        Cookies.set('cart', '', {expires: 2772})
        cartStore.setCartCnt(0)
        router.push(`order/complete?id=${order.id}`)
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
                        {
                            userStore.isLogged &&
                            <PromoInput placeholder={`Списать бонусы (Доступно: ${userData.bonuses.total_amount})`}
                                        onChange={(e) => changeBonuses(e.target.value)}
                                        value={bonuses}
                                        onClick={e => spendBonuses(e)}
                            />
                        }
                        {
                            Number(saleAmount) > 0 && <p>Суммарная скидка: {saleAmount} ₽</p>
                        }
                        {
                            orderStore.deliveryPrice &&
                            (
                                orderStore.deliveryPrice.block
                                ?
                                    orderStore.method === 1
                                    ?
                                    <p>Сумма доставки: {orderStore.deliveryPrice.sum_all} ₽</p>
                                    :
                                    <p>Сумма доставки: {orderStore.deliveryPrice.sum_part} ₽</p>
                                :
                                    <p>Сумма доставки: {orderStore.deliveryPrice.sum_all} ₽</p>
                            )
                        }
                        <hr/>
                        <p className={s.big_text}>Промежуточный итог: {calculateFinalPrice()} ₽</p>
                        <button className={s.order_btn} onClick={checkout}>Перейти к оплате</button>
                        {fillAll &&
                            <p className={'red_text'}>Заполните все поля</p>
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default observer(Order);