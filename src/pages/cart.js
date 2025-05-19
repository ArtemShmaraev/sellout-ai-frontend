import React, {useContext, useState} from 'react';
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
import Head from "next/head";
import Link from "next/link";


export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    let productUnits
    let cartArr
    if (cookies.cart) {
        cartArr = cookies['cart'].trim().split(' ').map(el => Number(el))
    }
    if (cookies['cart']) {
        const obj = {
            product_unit_list: cartArr
        }
        const res = await fetchProductUnits(JSON.stringify(obj), token)
        productUnits = {product_units: res}
    } else {
        productUnits = {product_units: []}
    }
    let defaultPrice
    let finalPrice
    let sale
    if (token) {
        const {user_id} = jwtDecode(token)
        const cart = await fetchCart(user_id, context.req.headers.cookie)
        defaultPrice = cart.total_amount
        finalPrice = cart.final_amount
        sale = cart.total_sale
        productUnits = cart
    } else {
        const res = await fetchCartPrice(cartArr)
        defaultPrice = res.total_amount
        finalPrice = defaultPrice
        sale = 0
    }
    return { props: {productUnits, defaultPrice, finalPrice, sale} }
}
const Cart = ({productUnits, defaultPrice, finalPrice, sale}) => {
    const router = useRouter()
    const {userStore, cartStore} = useContext(Context)
    const [promo, setPromo] = useState('')
    const [bonuses, setBonuses] = useState('')
    const [defAmount, setDefAmount] = useState(defaultPrice)
    const [finAmount, setFinAmount] = useState(finalPrice)
    const [saleAmount, setSaleAmount] = useState(sale)
    const [promoRes, setPromoRes] = useState(null)
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
            setSaleAmount(res.total_sale)
        }
        setPromoRes(res)
    }
    const [checkoutErr, setCheckoutErr] = useState('')
    const goToCheckout = () => {
        if (cartStore.isShipChosen) {
            setCheckoutErr('')
            router.push('/order')
        } else {
            setCheckoutErr('Пожалуйста, выберите доставку для всех товаров')
        }
    }
    return (
        <MainLayout>
            <Head>
                <title>Корзина</title>
            </Head>
            <div className={s.cont + ' custom_cont'}>
                <div className={s.title_block}>
                    <h3>Корзина</h3>
                    <Link href={'/products'}
                       className={s.link}
                    >Продолжить покупки</Link>
                </div>
                <div>
                    <div>
                        {!(productUnits.product_units.length) && 'Твоя корзина пуста.'}
                        {!userStore.isLogged &&
                            <div className={s.login_block}>
                                <AuthModal>
                                    <div className={s.text_underline}>Войдите или зарегистрируйтесь,&nbsp;</div>
                                </AuthModal>
                                чтобы Ваша корзина сохранялась, а также получать специальные предложения и бонусы.
                            </div>
                        }
                    </div>
                    {!(productUnits.product_units.length) &&
                        <Link
                            href={'/products'}
                            className={s.shop_button}
                        >За покупками</Link>
                    }
                </div>
                {
                    productUnits.product_units.length > 0 &&
                    <div className={s.main_block}>
                        <div className={s.items_block}>
                            {
                                productUnits.product_units.map((el, ind) =>
                                    <CartItem model={el.product.model}
                                              colorway={el.product.colorway}
                                              brand={el.product.is_collab ? el.product.collab.name : el.product.brands[0].name}
                                              price={el.final_price}
                                              productId={el.product.id}
                                              unitId={el.id}
                                              sizeId={el.view_size_platform}
                                              cardId={ind}
                                              imgSrc={el.product.bucket_link[0].url}
                                              slug={el.product.slug}
                                              inWL={el.product.in_wishlist}
                                              key={el.id}
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
                            {
                                userStore.isLogged &&
                                <PromoInput placeholder={'Списать бонусы'}
                                            onChange={(e) => setBonuses(e.target.value)}
                                            value={bonuses}
                                />
                            }
                            {
                                Number(saleAmount) > 0 && <p>Суммарная скидка: {saleAmount} ₽</p>
                            }
                            <hr/>
                            <p className={s.big_text}>Промежуточный итог: {finAmount} ₽</p>
                            {
                                userStore.isLogged
                                    ?
                                    <button className={s.order_btn}
                                            onClick={goToCheckout}
                                    >Перейти к оформлению заказа</button>
                                    :
                                    <AuthModal order={true} style={{width: '100%'}}>
                                        <div className={s.order_btn}
                                        >Перейти к оформлению заказа</div>
                                    </AuthModal>
                            }
                            {
                                checkoutErr &&
                                <p className={s.red_text}>
                                    {checkoutErr}
                                </p>
                            }
                        </div>
                    </div>
                }
            </div>
        </MainLayout>
    );
};

export default observer(Cart);