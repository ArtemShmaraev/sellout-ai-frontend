import React, {useContext, useEffect, useState} from 'react';
import s from '@/styles/Cart.module.css'
import MainLayout from "@/layout/MainLayout";
import CartItem from "@/components/pages/cart/CartItem/CartItem";
import {useRouter} from "next/router";
import {parse} from "cookie";
import {fetchCart, fetchCartPrice, fetchProductUnits, promoAuth, promoUnauth} from "@/http/cartApi";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import PromoInput from "@/components/pages/cart/PromoInput/PromoInput";
import jwtDecode from "jwt-decode";
import {observer} from "mobx-react-lite";
import Cookies from "js-cookie";


export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    let productUnits
    const cartArr = cookies['cart'].trim().split(' ').map(el => Number(el))
    if (cookies['cart']) {
        const obj = {
            product_unit_list: cartArr
        }
        productUnits = await fetchProductUnits(JSON.stringify(obj), token)
    } else {
        productUnits = []
    }
    let defaultPrice
    let finalPrice
    if (token) {
        const {user_id} = jwtDecode(token)
        const cart = await fetchCart(user_id, context.req.headers.cookie)
        defaultPrice = cart.total_amount
        finalPrice = cart.final_amount
        productUnits = cart
    } else {
        const res = await fetchCartPrice(cartArr)
        defaultPrice = res.total_amount
        finalPrice = defaultPrice
    }
    return { props: {productUnits, defaultPrice, finalPrice} }
}
const Cart = ({productUnits, defaultPrice, finalPrice, token}) => {
    const router = useRouter()
    const {userStore} = useContext(Context)
    const [promo, setPromo] = useState('')
    const [bonuses, setBonuses] = useState('')
    const [defAmount, setDefAmount] = useState(defaultPrice)
    const [finAmount, setFinAmount] = useState(finalPrice)
    const [promoRes, setPromoRes] = useState(null)
    const goToProductsPage = () => {
        router.push('/products')
    }
    const sendPromo = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        let res
        if (userStore.isLogged) {
            res = await promoAuth(promo, userStore.id, token)
            router.push('/cart', undefined, {scroll: false})
        } else {
            const cartArr = Cookies.get('cart').trim().split(' ').map(el => Number(el))
            res = await promoUnauth(promo, cartArr)
        }
        if (res.status) {
            setFinAmount(res.final_amount)
        }
        setPromoRes(res)
    }
    const goToCheckout = () => {
        router.push('/order')
    }
    return (
        <MainLayout>
            <div className={s.cont + ' custom_cont'}>
                <div className={s.title_block}>
                    <h3>Корзина</h3>
                    <a onClick={goToProductsPage}
                       className={s.link}
                    >Продолжить покупки</a>
                </div>
                <div>
                    <div>
                        {!(userStore.isLogged ? productUnits.product_units.length : productUnits.length) && 'Твоя корзина пуста.'}
                        {!userStore.isLogged &&
                            <div className={s.login_block}>
                                <AuthModal>
                                    <div className={s.text_underline}>Войдите или зарегистрируйтесь,&nbsp;</div>
                                </AuthModal>
                                чтобы Ваша корзина сохранялась, а также получать специальные предложения и бонусы.
                            </div>
                        }
                    </div>
                    {!(userStore.isLogged ? productUnits.product_units.length : productUnits.length) &&
                        <button
                            onClick={goToProductsPage}
                            className={s.shop_button}
                        >За покупками</button>
                    }
                </div>
                {
                    (userStore.isLogged ? productUnits.product_units.length : productUnits.length) > 0 &&
                    <div className={s.main_block}>
                        <div className={s.items_block}>
                            { userStore.isLogged
                                ?
                                productUnits.product_units.map((el, ind) =>
                                    <CartItem model={el.product.model}
                                              colorway={el.product.colorway}
                                              brand={el.product.is_collab ? el.product.collab.name : el.product.brands[0].name}
                                              price={el.final_price}
                                              productId={el.product.id}
                                              unitId={el.id}
                                              sizeId={el.good_size_platform}
                                              cardId={ind}
                                              imgSrc={el.product.bucket_link[0].url}
                                              slug={el.product.slug}
                                              inWL={el.product.in_wishlist}
                                              key={el.id}
                                    />
                                )
                                :
                                productUnits.map((el, ind) =>
                                    <CartItem model={el.product.model}
                                              colorway={el.product.colorway}
                                              brand={el.product.is_collab ? el.product.collab.name : el.product.brands[0].name}
                                              price={el.final_price}
                                              productId={el.product.id}
                                              unitId={el.id}
                                              sizeId={el.good_size_platform}
                                              cardId={ind}
                                              imgSrc={el.product.bucket_link[0].url}
                                              slug={el.product.slug}
                                    />
                                )
                            }
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
                            <p>Суммарная скидка: 100 ₽</p>
                            <hr/>
                            <p className={s.big_text}>Промежуточный итог: {finAmount} ₽</p>
                            <button className={s.order_btn}
                                    onClick={goToCheckout}
                            >Перейти к оформлению заказа</button>
                        </div>
                    </div>
                }
            </div>
        </MainLayout>
    );
};

export default observer(Cart);